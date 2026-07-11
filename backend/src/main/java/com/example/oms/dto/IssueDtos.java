package com.example.oms.dto;
import jakarta.validation.constraints.*;
public class IssueDtos {
  public record IssueRequest(@NotNull Long customerId, Long orderId, @NotBlank String subject, @NotBlank String message) {}
  public record ReplyRequest(@NotNull Long userId, @NotBlank String reply) {}
}
