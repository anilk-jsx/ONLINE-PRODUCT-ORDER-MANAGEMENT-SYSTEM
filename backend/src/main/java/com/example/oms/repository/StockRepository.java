package com.example.oms.repository;
import com.example.oms.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StockRepository extends JpaRepository<Stock, Long> {}
