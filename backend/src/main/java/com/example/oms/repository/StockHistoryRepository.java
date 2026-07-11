package com.example.oms.repository;
import com.example.oms.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {}
