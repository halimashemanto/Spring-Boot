package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.DoctorChargeDTO;
import com.emranhss.hospital.service.DoctorChargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor-charges")
public class DoctorChargeRestController {

    @Autowired
    private DoctorChargeService service;

    public DoctorChargeRestController(DoctorChargeService service) {
        this.service = service;
    }

    @GetMapping("/by-bed/{bedBookingId}")
    public List<DoctorChargeDTO> getCharges(@PathVariable Long bedBookingId) {
        return service.getChargesByBedBooking(bedBookingId);
    }

    @PostMapping("/save")
    public DoctorChargeDTO saveCharge(@RequestBody DoctorChargeDTO dto) {
        return service.saveCharge(dto);
    }



}
