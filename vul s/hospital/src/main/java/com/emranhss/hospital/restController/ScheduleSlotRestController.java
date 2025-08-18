package com.emranhss.hospital.restController;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.ScheduleSlot;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.service.DoctorService;
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


}
