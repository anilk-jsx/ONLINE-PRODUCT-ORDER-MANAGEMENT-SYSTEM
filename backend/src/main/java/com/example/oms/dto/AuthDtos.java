package com.example.oms.dto;
import jakarta.validation.constraints.*;
public class AuthDtos {
  public record LoginRequest(@Email String email, @NotBlank String password) {}
  public record RegisterRequest(@NotBlank String name, @Email String email, @NotBlank String password, String phone) {}
  public record AuthResponse(Long userId, String name, String email, String role, String token) {}
}
