package com.example.oms.entity;
import jakarta.persistence.*; import lombok.*; import java.time.LocalDateTime;
@Entity @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class IssueReply { @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; @ManyToOne private CustomerIssue issue; @ManyToOne private User user; @Column(length=2000) private String reply; private LocalDateTime createdAt=LocalDateTime.now(); }