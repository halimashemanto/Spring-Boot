package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IReceptionistRepo extends JpaRepository<Receptionist,Long> {



    Optional<Receptionist> findByUserId(long userId);

}
