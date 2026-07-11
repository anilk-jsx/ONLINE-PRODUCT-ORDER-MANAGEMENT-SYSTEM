package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDateTime;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StockHistory { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @ManyToOne private Product product; @Enumerated(EnumType.STRING) private StockChangeType changeType; private Integer quantity; private String note; private LocalDateTime changedAt=LocalDateTime.now(); public enum StockChangeType { ADD, REMOVE, ADJUST } }