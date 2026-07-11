package com.example.oms.controller;
import com.example.oms.dto.IssueDtos.*; import com.example.oms.entity.*; import com.example.oms.service.SupportService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/issues") @RequiredArgsConstructor
public class IssueController { private final SupportService service; @GetMapping List<CustomerIssue> all(){ return service.all(); } @PostMapping CustomerIssue raise(@Valid @RequestBody IssueRequest req){ return service.raise(req); } @PostMapping("/{id}/replies") IssueReply reply(@PathVariable Long id, @RequestBody ReplyRequest req){ return service.reply(id, req); } }
