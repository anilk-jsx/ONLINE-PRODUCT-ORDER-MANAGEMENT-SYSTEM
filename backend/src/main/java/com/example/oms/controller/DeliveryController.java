package com.example.oms.controller;
import com.example.oms.entity.Delivery; import com.example.oms.repository.DeliveryRepository; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/deliveries") @RequiredArgsConstructor
public class DeliveryController { private final DeliveryRepository repo; @GetMapping List<Delivery> all(){ return repo.findAll(); } @PostMapping Delivery save(@RequestBody Delivery d){ return repo.save(d); } }
