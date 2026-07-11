package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Entity @Table(name="order_items") @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @ManyToOne private Order order; @ManyToOne private Product product; private Integer quantity; private BigDecimal unitPrice; private BigDecimal gstPercent; private BigDecimal lineTotal; }