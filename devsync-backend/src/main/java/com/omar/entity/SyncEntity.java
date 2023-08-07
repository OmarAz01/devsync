package com.omar.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "syncs")
public class SyncEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long syncId;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private UserEntity sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private UserEntity receiver;

    @Column(length = 250, nullable = false)
    private String content;
    
    @Column(nullable = false)
    private String dateCreated;


}
