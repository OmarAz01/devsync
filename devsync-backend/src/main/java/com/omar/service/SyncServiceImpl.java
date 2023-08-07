package com.omar.service;

import com.omar.dto.PostDTO;
import com.omar.dto.SyncDTO;
import com.omar.entity.PostEntity;
import com.omar.entity.SyncEntity;
import com.omar.entity.UserEntity;
import com.omar.repo.SyncRepo;
import com.omar.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SyncServiceImpl implements SyncService {

    private final SyncRepo syncRepo;
    private final UserRepo userRepo;

    @Override
    public ResponseEntity<Long> deleteSync(Long syncId) {
        Optional<SyncEntity> syncEntity = syncRepo.findBySyncId(syncId);
        if (syncEntity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(syncId);
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(syncEntity.get().getSender().getUserId()) ||
                    !((UserEntity) principal).getUserId().equals(syncEntity.get().getReceiver().getUserId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        try {
            syncRepo.deleteBySyncId(syncEntity.get().getSyncId());
            return ResponseEntity.status(HttpStatus.OK).body(syncId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<Long> createSync(SyncDTO syncDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        String decodedTime;
        SyncEntity syncEntity = new SyncEntity();
        try {
            decodedTime = URLDecoder.decode(syncDTO.getDateCreated(), StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(syncDTO.getSenderId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            try {
                UserEntity sender = (UserEntity) principal;
                Optional<UserEntity> receiver = userRepo.findByUserId(syncDTO.getReceiverId());
                if (receiver.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(syncDTO.getReceiverId());
                }
                syncEntity.setSender(sender);
                syncEntity.setReceiver(receiver.get());
                syncEntity.setContent(syncDTO.getContent());
                syncEntity.setDateCreated(decodedTime);
                System.out.println("saving sync");
                syncRepo.save(syncEntity);
                System.out.println("saved sync");
                return ResponseEntity.status(HttpStatus.OK).body(syncEntity.getSyncId());

            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

    }

    @Override
    public ResponseEntity<List<SyncDTO>> getSentSyncs(Long senderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(senderId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<SyncDTO> syncDTOS = new ArrayList<>();
        try {
            Optional<List<SyncEntity>> syncEntities = syncRepo.findBySender(senderId);
            if (syncEntities.isEmpty() || syncEntities.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            for (SyncEntity syncs : syncEntities.get()) {
                syncDTOS.add(SyncDTO.convertToDTO(syncs));
            }
            return ResponseEntity.status(HttpStatus.OK).body(syncDTOS);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public ResponseEntity<List<SyncDTO>> getReceivedSyncs(Long receiverId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserEntity) {
            if (!((UserEntity) principal).getUserId().equals(receiverId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        List<SyncDTO> syncDTOS = new ArrayList<>();
        try {
            Optional<List<SyncEntity>> syncEntities = syncRepo.findByReceiver(receiverId);
            if (syncEntities.isEmpty() || syncEntities.get().isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            for (SyncEntity sync : syncEntities.get()) {
                syncDTOS.add(SyncDTO.convertToDTO(sync));
            }
            return ResponseEntity.status(HttpStatus.OK).body(syncDTOS);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
