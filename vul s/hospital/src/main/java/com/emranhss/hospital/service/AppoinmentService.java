package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.Appoinment;
import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.repository.IAppoinmentRepo;
import com.emranhss.hospital.repository.IDepartmentRepository;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.IScheduleSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppoinmentService {


    @Autowired
    private IAppoinmentRepo appointmentRepo;

    @Autowired
    private IScheduleSlot slotRepo;

    @Autowired
    private IDepartmentRepository departmentRepo;

    @Autowired
    private IDoctorRepo doctorRepo;



    public Appoinment bookAppointment(Appoinment appointment) {
        // Load slot from DB to make sure it's valid
        ScheduleSlot slot = slotRepo.findById(appointment.getScheduleSlot().getId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.isBooked()) {
            throw new RuntimeException("Slot already booked!");
        }

        // Mark slot as booked
        slot.setBooked(true);
        slotRepo.save(slot);

        // Attach slot back to appointment
        appointment.setScheduleSlot(slot);

        // Save appointment
        return appointmentRepo.save(appointment);
    }


    public void cancelAppointment(Long id) {
        Appoinment appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Free up slot
        ScheduleSlot slot = appointment.getScheduleSlot();
        slot.setBooked(false);
        slotRepo.save(slot);

        // Delete appointment
        appointmentRepo.delete(appointment);
    }






}
