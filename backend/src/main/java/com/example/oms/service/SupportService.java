package com.example.oms.service;
import com.example.oms.dto.IssueDtos.*; import com.example.oms.entity.*; import com.example.oms.repository.*; import jakarta.persistence.EntityNotFoundException; import lombok.RequiredArgsConstructor; import org.springframework.stereotype.Service; import java.util.*;
@Service @RequiredArgsConstructor
public class SupportService {
  private final CustomerIssueRepository issues; private final CustomerRepository customers; private final OrderRepository orders; private final UserRepository users; private final IssueReplyRepository replies;
  public CustomerIssue raise(IssueRequest req){ Customer c=customers.findById(req.customerId()).orElseThrow(() -> new EntityNotFoundException("Customer not found")); Order o=req.orderId()==null?null:orders.findById(req.orderId()).orElse(null); return issues.save(CustomerIssue.builder().customer(c).order(o).subject(req.subject()).message(req.message()).build()); }
  public IssueReply reply(Long issueId, ReplyRequest req){ CustomerIssue issue=issues.findById(issueId).orElseThrow(() -> new EntityNotFoundException("Issue not found")); User user=users.findById(req.userId()).orElseThrow(() -> new EntityNotFoundException("User not found")); issue.setStatus(CustomerIssue.IssueStatus.IN_PROGRESS); issues.save(issue); return replies.save(IssueReply.builder().issue(issue).user(user).reply(req.reply()).build()); }
  public List<CustomerIssue> all(){ return issues.findAll(); }
}
