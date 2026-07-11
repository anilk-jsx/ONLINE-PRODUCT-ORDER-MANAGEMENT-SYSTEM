package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Stock { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @OneToOne private Product product; private Integer quantity; private Integer lowStockLimit; }