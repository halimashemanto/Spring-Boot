package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPrescriptionRepo extends JpaRepository<Prescription,Long> {
}
