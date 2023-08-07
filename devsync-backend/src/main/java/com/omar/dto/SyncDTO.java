package com.omar.dto;

import com.omar.entity.SyncEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SyncDTO {
    private Long syncId;
    private Long senderId;
    private Long receiverId;
    private String receiverUsername;
    private String senderUsername;
    private String senderLevel;
    private String content;
    private String dateCreated;

    public static SyncDTO convertToDTO(SyncEntity sync) {
        return new SyncDTO(
                sync.getSyncId(),
                sync.getSender().getUserId(),
                sync.getReceiver().getUserId(),
                sync.getReceiver().getUsername(),
                sync.getSender().getUsername(),
                sync.getSender().getLevel(),
                sync.getContent(),
                sync.getDateCreated()
        );
    }
}
