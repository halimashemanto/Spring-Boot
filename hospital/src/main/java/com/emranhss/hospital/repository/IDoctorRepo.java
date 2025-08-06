package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IDoctorRepo extends JpaRepository<Doctor,Long> {



    Optional<Doctor> findByUserId(long userId);
}
