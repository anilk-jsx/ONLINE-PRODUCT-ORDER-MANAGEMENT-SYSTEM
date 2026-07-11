package com.example.oms.controller;
import com.example.oms.dto.OrderDtos.*; import com.example.oms.entity.Order; import com.example.oms.service.OrderService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/orders") @RequiredArgsConstructor
public class OrderController { private final OrderService service; @GetMapping List<Order> all(){ return service.all(); } @PostMapping Order create(@Valid @RequestBody CreateOrderRequest req){ return service.create(req); } @PatchMapping("/{id}/status") Order status(@PathVariable Long id, @RequestBody StatusRequest req){ return service.updateStatus(id, req); } }
