package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepo extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);

}
