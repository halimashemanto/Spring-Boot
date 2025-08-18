package com.emranhss.hospital.repository;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.ScheduleSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IScheduleSlot extends JpaRepository<ScheduleSlot,Long> {

    Optional<ScheduleSlot> findByDoctorId(long doctorId);




}
