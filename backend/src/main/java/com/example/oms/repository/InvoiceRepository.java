package com.example.oms.repository;
import com.example.oms.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {}
