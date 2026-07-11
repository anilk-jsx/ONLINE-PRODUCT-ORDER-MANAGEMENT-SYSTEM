package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDate;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Invoice { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @OneToOne private Order order; @Column(unique=true) private String invoiceNumber; private LocalDate invoiceDate; private String pdfUrl; }