package com.emranhss.hospital.repository;

import com.emranhss.hospital.entity.Appoinment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppoinmentRepo extends JpaRepository<Appoinment,Long> {
}
