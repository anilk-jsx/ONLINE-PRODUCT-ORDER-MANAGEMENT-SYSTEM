package com.example.oms.repository;
import com.example.oms.entity.Product; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ProductRepository extends JpaRepository<Product, Long> { List<Product> findByNameContainingIgnoreCaseOrSkuContainingIgnoreCase(String name, String sku); }
