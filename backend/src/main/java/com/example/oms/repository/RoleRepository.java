package com.example.oms.repository;
import com.example.oms.entity.Role; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface RoleRepository extends JpaRepository<Role, Long> { Optional<Role> findByName(String name); }
