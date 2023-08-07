package com.omar.repo;

import com.omar.entity.SyncEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SyncRepo extends JpaRepository<SyncEntity, Long> {

    @Query(value = "SELECT * FROM syncs WHERE receiver_id = :receiverId", nativeQuery = true)
    Optional<List<SyncEntity>> findByReceiver(@Param("receiverId") Long receiverId);

    @Query(value = "SELECT * FROM syncs WHERE sender_id = :senderId", nativeQuery = true)
    Optional<List<SyncEntity>> findBySender(@Param("senderId") Long senderId);

    @Query(value = "SELECT * FROM syncs WHERE sender_id = :senderId AND reciever_id = :receiverId", nativeQuery = true)
    Optional<List<SyncEntity>> findBySenderAndReceiver(@Param("senderId") Long senderId, @Param("receiverId") Long receiverId);


    @Query(value = "SELECT * FROM syncs WHERE sync_id = :syncId", nativeQuery = true)
    Optional<SyncEntity> findBySyncId(Long syncId);

    @Query(value = "DELETE FROM syncs WHERE sync_id = :syncId", nativeQuery = true)
    void deleteBySyncId(Long syncId);

}
