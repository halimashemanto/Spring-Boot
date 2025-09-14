package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.DoctorChargeDTO;
import com.emranhss.hospital.entity.BedBooking;
import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.DoctorCharge;
import com.emranhss.hospital.repository.IBedBookingRepo;
import com.emranhss.hospital.repository.IDoctorChargeRepo;
import com.emranhss.hospital.repository.IDoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorChargeService {

    @Autowired
    private IDoctorChargeRepo chargeRepo;

    @Autowired
    private IDoctorRepo doctorRepo;

    @Autowired
    private IBedBookingRepo bedBookingRepo;

    public DoctorChargeService(IDoctorChargeRepo chargeRepo,
                               IDoctorRepo doctorRepo,
                               IBedBookingRepo bedBookingRepo) {
        this.chargeRepo = chargeRepo;
        this.doctorRepo = doctorRepo;
        this.bedBookingRepo = bedBookingRepo;
    }

    public List<DoctorChargeDTO> getChargesByBedBooking(Long bedBookingId) {
        return chargeRepo.findByBedBooking_Id(bedBookingId)
                .stream()
                .map(c -> new DoctorChargeDTO(
                        c.getId(),
                        c.getDescription(),
                        c.getAmount(),
                        c.getDoctor().getId(),
                        c.getBedBooking().getId()
                ))
                .collect(Collectors.toList());
    }

    public DoctorChargeDTO saveCharge(DoctorChargeDTO dto) {
        DoctorCharge charge = new DoctorCharge();
        charge.setDescription(dto.getDescription());
        charge.setAmount(dto.getAmount());

        Doctor doctor = doctorRepo.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        BedBooking bedBooking = bedBookingRepo.findById(dto.getBedBookingId())
                .orElseThrow(() -> new RuntimeException("BedBooking not found"));

        charge.setDoctor(doctor);
        charge.setBedBooking(bedBooking);

        DoctorCharge saved = chargeRepo.save(charge);

        dto.setId(saved.getId());
        return dto;
    }
}
