package com.example.oms.controller;
import com.example.oms.repository.*; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/reports") @RequiredArgsConstructor
public class ReportController { private final OrderRepository orders; private final ProductRepository products; private final CategoryRepository categories; @GetMapping("/sales") Map<String,Object> sales(@RequestParam String from, @RequestParam String to){ return Map.of("from", from, "to", to, "orders", orders.count(), "products", products.count(), "categories", categories.count(), "exportFormats", List.of("PDF","EXCEL")); } }
