package com.example.oms.service;
import com.example.oms.dto.OrderDtos.*; import com.example.oms.entity.*; import com.example.oms.repository.*; import jakarta.persistence.EntityNotFoundException; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service; import org.springframework.transaction.annotation.Transactional; import java.math.*; import java.time.LocalDate; import java.util.*;
@Service @RequiredArgsConstructor
public class OrderService {
  private final OrderRepository orders; private final CustomerRepository customers; private final ProductRepository products; private final InvoiceRepository invoices; private final NotificationRepository notifications; private final WhatsappLogRepository whatsappLogs;
  @Transactional public Order create(CreateOrderRequest req) {
    Customer customer = customers.findById(req.customerId()).orElseThrow(() -> new EntityNotFoundException("Customer not found"));
    Order order = Order.builder().customer(customer).orderNumber("ORD-" + System.currentTimeMillis()).status(OrderStatus.PENDING).deliveryAddress(req.deliveryAddress()).subtotal(BigDecimal.ZERO).gstAmount(BigDecimal.ZERO).total(BigDecimal.ZERO).items(new ArrayList<>()).build();
    BigDecimal subtotal=BigDecimal.ZERO, gst=BigDecimal.ZERO;
    for (OrderItemRequest itemReq : req.items()) {
      Product p = products.findById(itemReq.productId()).orElseThrow(() -> new EntityNotFoundException("Product not found"));
      if (p.getStockQty() < itemReq.quantity()) throw new IllegalArgumentException("Insufficient stock for " + p.getName());
      BigDecimal qty=BigDecimal.valueOf(itemReq.quantity()); BigDecimal line=p.getPrice().multiply(qty); BigDecimal lineGst=line.multiply(p.getGstPercent()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
      p.setStockQty(p.getStockQty() - itemReq.quantity()); products.save(p);
      order.getItems().add(OrderItem.builder().order(order).product(p).quantity(itemReq.quantity()).unitPrice(p.getPrice()).gstPercent(p.getGstPercent()).lineTotal(line.add(lineGst)).build());
      subtotal=subtotal.add(line); gst=gst.add(lineGst);
    }
    order.setSubtotal(subtotal); order.setGstAmount(gst); order.setTotal(subtotal.add(gst));
    Order saved=orders.save(order);
    invoices.save(Invoice.builder().order(saved).invoiceNumber("INV-" + saved.getId()).invoiceDate(LocalDate.now()).build());
    notifications.save(Notification.builder().title("New booking").message("Order " + saved.getOrderNumber() + " placed").build());
    whatsappLogs.save(WhatsappLog.builder().order(saved).phone("9999999999").message("New booking: " + saved.getOrderNumber()).status("QUEUED").build());
    return saved;
  }
  public List<Order> all(){ return orders.findAll(); }
  public Order updateStatus(Long id, StatusRequest req){ Order o=orders.findById(id).orElseThrow(() -> new EntityNotFoundException("Order not found")); o.setStatus(OrderStatus.valueOf(req.status())); return orders.save(o); }
}
