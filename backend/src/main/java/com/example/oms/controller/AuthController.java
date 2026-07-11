package com.example.oms.controller;
import com.example.oms.dto.AuthDtos.*; import com.example.oms.service.AuthService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/auth") @RequiredArgsConstructor
public class AuthController { private final AuthService auth; @PostMapping("/login") AuthResponse login(@Valid @RequestBody LoginRequest req){ return auth.login(req); } @PostMapping("/register") AuthResponse register(@Valid @RequestBody RegisterRequest req){ return auth.register(req); } }
