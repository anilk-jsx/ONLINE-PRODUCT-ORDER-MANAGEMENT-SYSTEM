package com.example.oms.repository;
import com.example.oms.entity.User; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface UserRepository extends JpaRepository<User, Long> { Optional<User> findByEmail(String email); }
