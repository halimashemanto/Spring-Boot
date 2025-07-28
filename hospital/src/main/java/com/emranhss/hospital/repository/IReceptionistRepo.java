package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReceptionistRepo extends JpaRepository<Receptionist,Long> {
}
