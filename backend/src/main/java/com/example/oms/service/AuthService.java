package com.example.oms.service;
import com.example.oms.dto.AuthDtos.*; import com.example.oms.entity.*; import com.example.oms.repository.*; import jakarta.persistence.EntityNotFoundException; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service;
@Service @RequiredArgsConstructor
public class AuthService {
  private final UserRepository users; private final RoleRepository roles; private final CustomerRepository customers;
  public AuthResponse login(LoginRequest req) {
    User user = users.findByEmail(req.email()).filter(u -> u.getPassword().equals(req.password())).orElseThrow(() -> new EntityNotFoundException("Invalid email or password"));
    return new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().getName(), "demo-token-" + user.getId());
  }
  public AuthResponse register(RegisterRequest req) {
    Role role = roles.findByName("CUSTOMER").orElseGet(() -> roles.save(Role.builder().name("CUSTOMER").build()));
    User user = users.save(User.builder().name(req.name()).email(req.email()).password(req.password()).phone(req.phone()).role(role).active(true).build());
    customers.save(Customer.builder().user(user).build());
    return new AuthResponse(user.getId(), user.getName(), user.getEmail(), role.getName(), "demo-token-" + user.getId());
  }
}
