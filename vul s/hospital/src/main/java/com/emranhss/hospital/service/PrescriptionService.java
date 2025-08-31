package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.PrescriptionDTO;
import com.emranhss.hospital.entity.*;
import com.emranhss.hospital.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private IPrescriptionRepo prescriptionRepo;

    @Autowired
    private IDoctorRepo doctorRepo;

    @Autowired
    private IAppoinmentRepo appointmentRepo;

    @Autowired
    private IMedicineRepo medicineRepo;

    @Autowired
    private ITestRepo testRepo;

    // Create or Update
    public Prescription createOrUpdatePrescription(PrescriptionDTO dto) {
        Prescription p = dto.getId() != null ?
                prescriptionRepo.findById(dto.getId()).orElse(new Prescription()) :
                new Prescription();
        return mapAndSave(dto, p);
    }

    // Delete
    public void deletePrescription(Long id) throws Exception {
        Prescription p = prescriptionRepo.findById(id)
                .orElseThrow(() -> new Exception("Prescription not found"));
        prescriptionRepo.delete(p);
    }

    // GET all
    @Transactional
    public List<PrescriptionDTO> getAllPrescriptionsDTO() {
        List<Prescription> list = prescriptionRepo.findAll();
        List<PrescriptionDTO> dtoList = new ArrayList<>();
        for(Prescription p : list){
            dtoList.add(mapToDTO(p));
        }
        return dtoList;
    }

    // GET by ID
    @Transactional
    public PrescriptionDTO getPrescriptionDTOById(Long id) throws Exception {
        Prescription p = prescriptionRepo.findById(id)
                .orElseThrow(() -> new Exception("Prescription not found"));
        return mapToDTO(p);
    }

    // Private: map DTO → Entity
    private Prescription mapAndSave(PrescriptionDTO dto, Prescription p){
        p.setNote(dto.getNote());
        p.setAdvice(dto.getAdvice());
        p.setHeight(dto.getHeight());
        p.setWeight(dto.getWeight());
        p.setBp(dto.getBp());
        p.setDate(dto.getDate() != null ? dto.getDate() : new Date());
        p.setApplyWay(dto.getApplyWay());

        // Doctor
        doctorRepo.findById(dto.getDoctorId()).ifPresent(p::setDoctor);

        // Appointment
        appointmentRepo.findById(dto.getAppoinmentId()).ifPresent(p::setAppointment);

        // Medicines
        List<Medicine> meds = new ArrayList<>();
        if(dto.getMedicineIds() != null){
            for(Long id : dto.getMedicineIds()){
                medicineRepo.findById(id).ifPresent(meds::add);
            }
        }
        p.setMedicines(meds);

        // Tests
        List<Tests> tests = new ArrayList<>();
        if(dto.getTestIds() != null){
            for(Long id : dto.getTestIds()){
                testRepo.findById(id).ifPresent(tests::add);
            }
        }
        p.setTests(tests);

        return prescriptionRepo.save(p);
    }

    // Private: map Entity → DTO
    private PrescriptionDTO mapToDTO(Prescription p){
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(p.getId());
        dto.setNote(p.getNote());
        dto.setAdvice(p.getAdvice());
        dto.setHeight(p.getHeight());
        dto.setWeight(p.getWeight());
        dto.setBp(p.getBp());
        dto.setDate(p.getDate());
        dto.setApplyWay(p.getApplyWay());
        dto.setDoctorId(p.getDoctor() != null ? p.getDoctor().getId() : null);
        dto.setAppoinmentId(p.getAppointment() != null ? p.getAppointment().getId() : null);

        List<Long> medIds = new ArrayList<>();
        if(p.getMedicines() != null){
            for(Medicine m : p.getMedicines()) medIds.add(m.getId());
        }
        dto.setMedicineIds(medIds);

        List<Long> testIds = new ArrayList<>();
        if(p.getTests() != null){
            for(Tests t : p.getTests()) testIds.add(t.getId());
        }
        dto.setTestIds(testIds);

        return dto;
    }
}