package com.example.oms.repository;
import com.example.oms.entity.CustomerIssue;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CustomerIssueRepository extends JpaRepository<CustomerIssue, Long> {}
