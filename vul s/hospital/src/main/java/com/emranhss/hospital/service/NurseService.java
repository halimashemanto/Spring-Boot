package com.emranhss.hospital.service;

import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Nurse;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.INurseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NurseService {


    @Autowired
    private INurseRepo nurseRepository;



    public List<Nurse> getAll() {
        return nurseRepository.findAll();
    }

    public Optional<Nurse> getById(Long id) {
        return nurseRepository.findById(id);
    }

    public Nurse save(Nurse nurse) {
        return nurseRepository.save(nurse);
    }

    public void delete(Long id) {
        nurseRepository.deleteById(id);
    }

    public Nurse getProfileByUserId(long userId) {
        return nurseRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Nurse not found"));
    }





}
