package com.example.oms.dto;
import jakarta.validation.constraints.*; import java.math.BigDecimal; import java.util.*;
public class OrderDtos {
  public record OrderItemRequest(@NotNull Long productId, @Min(1) int quantity) {}
  public record CreateOrderRequest(@NotNull Long customerId, @NotBlank String deliveryAddress, @NotEmpty List<OrderItemRequest> items) {}
  public record StatusRequest(@NotBlank String status) {}
  public record OrderSummary(Long id, String orderNumber, String status, BigDecimal total) {}
}
