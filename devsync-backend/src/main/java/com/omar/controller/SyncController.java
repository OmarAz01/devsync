package com.omar.controller;

import com.omar.dto.SyncDTO;
import com.omar.service.SyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/sync")
public class SyncController {
    private final SyncService syncService;


    @GetMapping("/sent/user/{senderid}")
    public ResponseEntity<List<SyncDTO>> getSentSyncs(@PathVariable("senderid") Long senderid) {
        return syncService.getSentSyncs(senderid);
    }

    @GetMapping("/received/user/{receiverid}")
    public ResponseEntity<List<SyncDTO>> getReceivedSyncs(@PathVariable("receiverid") Long receiverid) {
        return syncService.getReceivedSyncs(receiverid);
    }

    @PostMapping
    public ResponseEntity<Long> createSync(@RequestBody SyncDTO syncDTO) {
        return syncService.createSync(syncDTO);
    }

    @DeleteMapping("/{syncid}")
    public ResponseEntity<Long> deleteSync(@PathVariable("syncid") Long syncid) {
        return syncService.deleteSync(syncid);
    }


}
