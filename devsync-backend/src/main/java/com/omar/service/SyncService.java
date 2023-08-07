package com.omar.service;

import com.omar.dto.SyncDTO;
import com.omar.entity.SyncEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SyncService {

    public ResponseEntity<Long> deleteSync(Long syncId);

    public ResponseEntity<Long> createSync(SyncDTO syncDTO);

    public ResponseEntity<List<SyncDTO>> getSentSyncs(Long senderId);

    public ResponseEntity<List<SyncDTO>> getReceivedSyncs(Long receiverId);


}
