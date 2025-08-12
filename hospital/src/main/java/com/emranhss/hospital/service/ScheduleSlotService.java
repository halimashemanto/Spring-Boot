package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.IScheduleSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleSlotService {

@Autowired
    private IScheduleSlot scheduleSlotRepo;



    public List<ScheduleSlot> getAllScheduleSlot() {
        return scheduleSlotRepo.findAll();
    }

    public Optional<ScheduleSlot >   getAvailableSlots(Long doctorId) {
        return scheduleSlotRepo.findById(doctorId);
    }

    public ScheduleSlot  save(ScheduleSlot  scheduleSlot, Doctor doctor) {
        scheduleSlot.setDoctor(doctor);

        return scheduleSlotRepo.save(scheduleSlot);
    }

    public void delete(Long id) {
        scheduleSlotRepo.deleteById(id);
    }

    public ScheduleSlot  getProfileByDoctorId(long doctorId) {
        return scheduleSlotRepo.findByDoctorId(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

}
