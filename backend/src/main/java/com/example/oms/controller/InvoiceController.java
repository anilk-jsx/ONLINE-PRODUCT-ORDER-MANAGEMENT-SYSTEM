package com.example.oms.controller;
import com.example.oms.entity.Invoice; import com.example.oms.repository.InvoiceRepository; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/invoices") @RequiredArgsConstructor
public class InvoiceController { private final InvoiceRepository repo; @GetMapping List<Invoice> all(){ return repo.findAll(); } @GetMapping("/{id}/print") String print(@PathVariable Long id){ return "Printable invoice #" + id; } }
