package com.example.oms.exception;
import jakarta.persistence.EntityNotFoundException; import org.springframework.http.*; import org.springframework.web.bind.MethodArgumentNotValidException; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(EntityNotFoundException.class) ResponseEntity<Map<String,String>> notFound(Exception ex){ return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage())); }
  @ExceptionHandler(MethodArgumentNotValidException.class) ResponseEntity<Map<String,String>> validation(MethodArgumentNotValidException ex){ return ResponseEntity.badRequest().body(Map.of("error", "Validation failed")); }
  @ExceptionHandler(IllegalArgumentException.class) ResponseEntity<Map<String,String>> bad(Exception ex){ return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage())); }
}
