package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Report;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.IReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private IReportRepo reportRepository;

    @Autowired
    private IDoctorRepo doctorRepository;


    public Report save(Report report, long doctor_id) {
        Doctor doctor = doctorRepository.findById(doctor_id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id " + doctor_id));
       report.setDoctor(doctor);
        return reportRepository.save(report);
    }


    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Optional<Report> getReportById(Long id) {
        return reportRepository.findById(id);
    }
}
