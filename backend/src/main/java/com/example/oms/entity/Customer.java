package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Customer { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @OneToOne private User user; private String address; private String city; private String state; private String pincode; }