package com.emranhss.hospital.restController;

import com.emranhss.hospital.entity.Appoinment;
import com.emranhss.hospital.service.AppoinmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appoinment")
public class AppoinmentRestController {

    @Autowired
    private AppoinmentService appointmentService;

    // Book appointment
    @PostMapping
    public ResponseEntity<Appoinment> bookAppointment(@RequestBody Appoinment appointment) {
        Appoinment saved = appointmentService.bookAppointment(appointment);
        return ResponseEntity.ok(saved);
    }

    // Cancel appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok("Appointment cancelled and slot freed up");
    }


}
