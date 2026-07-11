package com.example.oms.service;
import com.example.oms.entity.*; import com.example.oms.repository.*; import jakarta.persistence.EntityNotFoundException; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service; import java.util.*;
@Service @RequiredArgsConstructor
public class ProductService {
  private final ProductRepository products; private final CategoryRepository categories;
  public List<Product> search(String q) { return q == null || q.isBlank() ? products.findAll() : products.findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(q, q); }
  public Product save(Product product, Long categoryId) { Category c=categories.findById(categoryId).orElseThrow(() -> new EntityNotFoundException("Category not found")); product.setCategory(c); return products.save(product); }
  public Product get(Long id) { return products.findById(id).orElseThrow(() -> new EntityNotFoundException("Product not found")); }
  public void delete(Long id) { products.deleteById(id); }
}
