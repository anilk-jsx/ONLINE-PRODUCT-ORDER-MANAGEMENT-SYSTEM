package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.time.*;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Delivery { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @OneToOne private Order order; private String partnerName; private String trackingNumber; private String status; private LocalDate expectedDelivery; private LocalDateTime deliveredAt; }