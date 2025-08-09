package com.emranhss.hospital.service;

import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Receptionist;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.INurseRepo;
import com.emranhss.hospital.repository.IReceptionistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceptionistService {

    @Autowired
    private IReceptionistRepo receptionistRepository;


    public List<Receptionist> getAll() {
        return receptionistRepository.findAll();
    }

    public Optional<Receptionist> getById(Long id) {
        return receptionistRepository.findById(id);
    }

    public Receptionist save(Receptionist receptionist) {
        return receptionistRepository.save(receptionist);
    }

    public void delete(Long id) {
        receptionistRepository.deleteById(id);
    }

    public Receptionist getProfileByUserId(long userId) {
        return receptionistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

}
