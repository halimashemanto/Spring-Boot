package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.TestAdmitedPatientDTO;
import com.emranhss.hospital.service.TestAdmitedPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testss")
public class TestAdmitedPatientRestController {

    @Autowired
    private TestAdmitedPatientService testService;

    @GetMapping("/bedBooking/{bedBookingId}")
    public List<TestAdmitedPatientDTO> getTestsByBedBooking(@PathVariable Long bedBookingId) {
        return testService.getTestsByBedBooking(bedBookingId);
    }

    @PostMapping("/bedBooking/{bedBookingId}")
    public TestAdmitedPatientDTO addTest(@PathVariable Long bedBookingId, @RequestBody TestAdmitedPatientDTO dto) {
        return testService.addTest(bedBookingId, dto);
    }

    @PutMapping("/{id}")
    public TestAdmitedPatientDTO updateTest(@PathVariable Long id, @RequestBody TestAdmitedPatientDTO dto) {
        return testService.updateTest(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTest(@PathVariable Long id) {
        testService.deleteTest(id);
    }
}
