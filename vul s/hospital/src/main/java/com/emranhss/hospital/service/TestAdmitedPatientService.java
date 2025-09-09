package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.TestAdmitedPatientDTO;
import com.emranhss.hospital.entity.AdmittedPatient;
import com.emranhss.hospital.entity.BedBooking;
import com.emranhss.hospital.entity.TestAdmitedPatient;
import com.emranhss.hospital.repository.IAdmittedPatientRepo;
import com.emranhss.hospital.repository.IBedBookingRepo;
import com.emranhss.hospital.repository.ITestAdmitedPatientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestAdmitedPatientService {


    @Autowired
    private ITestAdmitedPatientRepo testRepo;

    @Autowired
    private IAdmittedPatientRepo patientRepo;

    @Autowired
    private IBedBookingRepo bedBookingRepo;




    public TestAdmitedPatientDTO addTest(Long bedBookingId, TestAdmitedPatientDTO dto) {
        BedBooking bedBooking = bedBookingRepo.findById(bedBookingId)
                .orElseThrow(() -> new RuntimeException("BedBooking not found"));

        AdmittedPatient patient = bedBooking.getAdmittedPatient();

        TestAdmitedPatient test = new TestAdmitedPatient();
        test.setTestName(dto.getTestName());
        test.setTestPrice(dto.getTestPrice());
        test.setTestCost(dto.getTestCost());
        test.setAdmittedPatient(patient);

        testRepo.save(test);

        dto.setId(test.getId());
        return dto;
    }


    public List<TestAdmitedPatientDTO> getTestsByBedBooking(Long bedBookingId) {
        BedBooking bedBooking = bedBookingRepo.findById(bedBookingId)
                .orElseThrow(() -> new RuntimeException("BedBooking not found"));

        AdmittedPatient patient = bedBooking.getAdmittedPatient();

        return testRepo.findByAdmittedPatientId(patient.getId())
                .stream()
                .map(t -> {
                    TestAdmitedPatientDTO dto = new TestAdmitedPatientDTO();
                    dto.setId(t.getId());
                    dto.setTestName(t.getTestName());
                    dto.setTestPrice(t.getTestPrice());
                    dto.setTestCost(t.getTestCost());
                    return dto;
                })
                .collect(Collectors.toList());
    }


    public TestAdmitedPatientDTO updateTest(Long id, TestAdmitedPatientDTO dto) {
        TestAdmitedPatient test = testRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Test not found"));

        test.setTestName(dto.getTestName());
        test.setTestPrice(dto.getTestPrice());
        test.setTestCost(dto.getTestCost());

        testRepo.save(test);
        dto.setId(test.getId());
        return dto;
    }


    public void deleteTest(Long id) {
        testRepo.deleteById(id);
    }


}
