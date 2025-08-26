package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.SlotResponseDTO;
import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.IScheduleSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ScheduleSlotService {
    @Autowired
    private IScheduleSlot scheduleSlotRepo;
    @Autowired
    private IDoctorRepo doctorRepository;


    public List<ScheduleSlot> getAllScheduleSlot() {
        return scheduleSlotRepo.findAll();
    }


    public List<ScheduleSlot> getAvailableSlots(Long doctorId) {
        return scheduleSlotRepo.findByDoctorId(doctorId);
    }



    public ScheduleSlot save(ScheduleSlot scheduleSlot, long doctor_id) {
        Doctor doctor = doctorRepository.findById(doctor_id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id " + doctor_id));
        scheduleSlot.setDoctor(doctor);
        return scheduleSlotRepo.save(scheduleSlot);
    }
    // delete slot by id
    public void delete(Long id) {
        scheduleSlotRepo.deleteById(id);
    }




    public List<SlotResponseDTO> getAllSlotsByDoctorId(long doctorId) {
        List<SlotResponseDTO> slots = scheduleSlotRepo.findBookedSlotsByDoctorId(doctorId);

        if (slots.isEmpty()) {
            throw new RuntimeException("No slots found for doctor id " + doctorId);
        }

        return slots; // return all slots
    }




}
