package com.example.oms.controller;
import com.example.oms.entity.Category; import com.example.oms.repository.CategoryRepository; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/categories") @RequiredArgsConstructor
public class CategoryController { private final CategoryRepository repo; @GetMapping List<Category> all(){ return repo.findAll(); } @PostMapping Category save(@Valid @RequestBody Category c){ return repo.save(c); } @PutMapping("/{id}") Category update(@PathVariable Long id, @RequestBody Category c){ c.setId(id); return repo.save(c); } @DeleteMapping("/{id}") void delete(@PathVariable Long id){ repo.deleteById(id); } }
