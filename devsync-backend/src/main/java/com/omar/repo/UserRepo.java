package com.omar.repo;

import com.omar.entity.UserDTO;
import com.omar.entity.UserEntity;
import com.omar.entity.UserIdsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE user_id IN :userIds", nativeQuery = true)
    List<UserEntity> findUsersWithIds(@Param("userIds") List<Integer> userIds);
}
