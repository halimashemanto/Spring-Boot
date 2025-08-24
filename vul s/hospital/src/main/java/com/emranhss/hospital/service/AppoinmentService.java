package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.Appoinment;
import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.repository.IAppoinmentRepo;
import com.emranhss.hospital.repository.IScheduleSlot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppoinmentService {

    @Autowired
    private IAppoinmentRepo appointmentRepo;

    @Autowired
    private IScheduleSlot slotRepo;

    public Appoinment bookAppointment(Appoinment appointment) {

        ScheduleSlot slot = slotRepo.findById(appointment.getScheduleSlot().getId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.isBooked()) {
            throw new RuntimeException("Slot already booked!");
        }

        slot.setBooked(true);
        slotRepo.save(slot);

        appointment.setScheduleSlot(slot);


        return appointmentRepo.save(appointment);
    }


    public void cancelAppointment(Long id) {
        Appoinment appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));


        ScheduleSlot slot = appointment.getScheduleSlot();
        slot.setBooked(false);
        slotRepo.save(slot);


        appointmentRepo.delete(appointment);
    }






}
