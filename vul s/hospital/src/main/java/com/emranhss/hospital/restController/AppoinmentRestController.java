package com.emranhss.hospital.restController;

import com.emranhss.hospital.entity.Appoinment;
import com.emranhss.hospital.service.AppoinmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appoinment")
public class AppoinmentRestController {

    @Autowired
    private AppoinmentService appointmentService;


    @PostMapping
    public ResponseEntity<Appoinment> bookAppointment(@RequestBody Appoinment appointment) {

        System.out.println(appointment+ "333333333333333333333333333");
        Appoinment saved = appointmentService.bookAppointment(appointment);
        return ResponseEntity.ok(saved);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable Long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok("Appointment cancelled and slot freed up");
    }


    @GetMapping
    public ResponseEntity<List<Appoinment>> getAllAppointments() {
        List<Appoinment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }



}
