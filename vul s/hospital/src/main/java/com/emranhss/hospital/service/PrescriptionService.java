package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.*;
import com.emranhss.hospital.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionService {



    @Autowired
    private IPrescriptionRepo prescriptionRepository;

    @Autowired
    private ITestRepo testsRepository;
    @Autowired
    private IMedicineRepo medicineRepository;
    @Autowired
    private IDoctorRepo doctorRepository;

    @Autowired
    private IAppoinmentRepo appoinmentRepo;


//    public Prescription savePrescription(Prescription prescription, List<Long> medicineIds, List<Long> testIds, Long doctorId) {
//
//        // Medicines attach করা
//        List<Medicine> medicines = new ArrayList<>();
//        if (medicineIds != null) {
//            for (Long medId : medicineIds) {
//                medicineRepository.findById(medId).ifPresent(medicines::add);
//            }
//        }
//        prescription.setMedicines(medicines);
//
//        // Tests attach করা
//        List<Tests> tests = new ArrayList<>();
//        if (testIds != null) {
//            for (Long testId : testIds) {
//                testsRepository.findById(testId).ifPresent(tests::add);
//            }
//        }
//        prescription.setTests(tests);
//
//        // Doctor attach করা
//        if (doctorId != null) {
//            Doctor doctor = doctorRepository.findById(doctorId)
//                    .orElseThrow(() -> new RuntimeException("Doctor not found with id " + doctorId));
//            prescription.setDoctor(doctor);
//        }
//
//        return prescriptionRepository.save(prescription);
//    }




    public Prescription savePrescription(Prescription prescription, List<Long> medicineIds, List<Long> testIds, Long doctorId, Long appoinmentId) {

        // Attach medicines
        List<Medicine> medicines = new ArrayList<>();
        if (medicineIds != null) {
            for (Long medId : medicineIds) {
                medicineRepository.findById(medId).ifPresent(med -> {
                    med.setPrescription(prescription);
                    medicines.add(med);
                });
            }
        }
        prescription.setMedicines(medicines);

        // Attach tests
        List<Tests> tests = new ArrayList<>();
        if (testIds != null) {
            for (Long testId : testIds) {
                testsRepository.findById(testId).ifPresent(test -> {
                    test.setPrescription(prescription);
                    tests.add(test);
                });
            }
        }
        prescription.setTests(tests);

        // Attach doctor
        if (doctorId != null) {
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id " + doctorId));
            prescription.setDoctor(doctor);
        }

        // Attach appointment
        if (appoinmentId != null) {
            Appoinment appointment = appoinmentRepo.findById(appoinmentId)
                    .orElseThrow(() -> new RuntimeException("Appointment not found with id " + appoinmentId));
            prescription.setAppointment(appointment);
        } else {
            throw new RuntimeException("Appointment id cannot be null");
        }

        return prescriptionRepository.save(prescription);
    }



//    // অন্যান্য standard methods
//    public List<Prescription> getAllPrescriptions() {
//        return prescriptionRepository.findAll();
//    }

    public Optional<Prescription> getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id);
    }

    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }
}
