package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDateTime;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WhatsappLog { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @ManyToOne private Order order; private String phone; @Column(length=500) private String message; private String status="QUEUED"; private LocalDateTime createdAt=LocalDateTime.now(); }