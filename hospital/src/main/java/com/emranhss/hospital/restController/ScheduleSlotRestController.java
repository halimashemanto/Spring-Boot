package com.emranhss.hospital.restController;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.service.ScheduleSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slot/")
public class ScheduleSlotRestController {

    @Autowired
    private ScheduleSlotService scheduleSlotService;

    @Autowired
    private IDoctorRepo doctorRepo;



    @GetMapping
    public ResponseEntity<List<ScheduleSlot>> getAllSlots() {
        return ResponseEntity.ok(scheduleSlotService.getAllScheduleSlot());
    }



    @GetMapping("/available/{doctorId}")
    public ResponseEntity<?> getAvailableSlots(@PathVariable Long doctorId) {
        return scheduleSlotService.getAvailableSlots(doctorId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<ScheduleSlot> createSlot(@RequestBody ScheduleSlot slot) {
        Doctor doctor=doctorRepo.findById(slot.getDoctor().getId()).get();
        ScheduleSlot saved = scheduleSlotService.save(slot, doctor);
        return ResponseEntity.ok(saved);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ScheduleSlot> updateSlot(@PathVariable Long id, @RequestBody ScheduleSlot slot) {
        slot.setId(id);
        Doctor doctor=doctorRepo.findById(slot.getDoctor().getId()).get();
        ScheduleSlot updated = scheduleSlotService.save(slot, doctor);
        return ResponseEntity.ok(updated);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        scheduleSlotService.delete(id);
        return ResponseEntity.noContent().build();
    }



    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<ScheduleSlot> getProfileByDoctorId(@PathVariable long doctorId) {
        return ResponseEntity.ok(scheduleSlotService.getProfileByDoctorId(doctorId));
    }


}
