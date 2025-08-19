package com.emranhss.hospital.restController;

import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.service.DoctorService;
import com.emranhss.hospital.service.ScheduleSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slot")
public class ScheduleSlotRestController {


    @Autowired
    private ScheduleSlotService scheduleSlotService;

    @Autowired
    private DoctorService doctorService;

    // Get all slots
    @GetMapping
    public ResponseEntity<List<ScheduleSlot>> getAllSlots() {
        return ResponseEntity.ok(scheduleSlotService.getAllScheduleSlot());
    }

    // Get slots by doctorId
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<ScheduleSlot>> getSlotsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(scheduleSlotService.getAvailableSlots(doctorId));
    }

    // Save new slot
//    @PostMapping("")
//    public ResponseEntity<ScheduleSlot> saveSlot(@PathVariable Long doctorId, @RequestBody ScheduleSlot slot) {
//        Doctor doctor = doctorService.getDoctorById(doctorId);
//        ScheduleSlot savedSlot = scheduleSlotService.save(slot, doctor);
//        return ResponseEntity.ok(savedSlot);
//    }

    @PostMapping("")
    public ScheduleSlot saveSlot(@RequestBody ScheduleSlot b,
                             @RequestParam long doctor_id) {
        return scheduleSlotService.save(b, doctor_id);
    }



//    // Update slot
//    @PutMapping("/{Id}")
//    public ResponseEntity<ScheduleSlot> updateSlot(@PathVariable Long Id, @RequestBody ScheduleSlot slotDetails) {
//        ScheduleSlot slot = scheduleSlotService.getFirstSlotByDoctorId(slotDetails.getDoctor().getId());
//        slot.setDate(slotDetails.getDate());
//        slot.setStartTime(slotDetails.getStartTime());
//        slot.setEndTime(slotDetails.getEndTime());
//        slot.setBooked(slotDetails.isBooked());
//
//        ScheduleSlot updatedSlot = scheduleSlotService.save(slot, slot.getDoctor());
//        return ResponseEntity.ok(updatedSlot);
//    }

    // Delete slot
    @DeleteMapping("/{Id}")
    public ResponseEntity<String> deleteSlot(@PathVariable Long slotId) {
        scheduleSlotService.delete(slotId);
        return ResponseEntity.ok("Slot deleted successfully!");
    }

}
