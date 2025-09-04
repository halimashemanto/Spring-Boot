package com.emranhss.hospital.repository;


import com.emranhss.hospital.entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBedRepo extends JpaRepository<Bed,Long> {

    List<Bed> findByIsOccupiedFalse();
}
