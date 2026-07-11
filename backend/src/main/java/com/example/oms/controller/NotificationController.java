package com.example.oms.controller;
import com.example.oms.entity.Notification; import com.example.oms.repository.NotificationRepository; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/notifications") @RequiredArgsConstructor
public class NotificationController { private final NotificationRepository repo; @GetMapping List<Notification> all(){ return repo.findAll(); } }
