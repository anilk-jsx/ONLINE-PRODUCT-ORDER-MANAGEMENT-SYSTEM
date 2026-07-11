package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDateTime;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Notification { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @ManyToOne private User user; private String title; private String message; private boolean readFlag=false; private LocalDateTime createdAt=LocalDateTime.now(); }