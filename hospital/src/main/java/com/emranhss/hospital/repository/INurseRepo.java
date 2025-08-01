package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INurseRepo extends JpaRepository<Nurse, Long> {
}
