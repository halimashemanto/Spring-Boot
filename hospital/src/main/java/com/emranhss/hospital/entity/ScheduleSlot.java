package com.emranhss.hospital.entity;


import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.Date;

@Entity

public class ScheduleSlot {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private long id;

    @Column(name = "doctor_id", nullable = false)
    private long doctorId;

    @Column(nullable = false)
    private Date date;  // store as "YYYY-MM-DD"

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "is_booked", nullable = false)
    private boolean isBooked;


    public ScheduleSlot() {
    }

    public ScheduleSlot(long id, boolean isBooked, LocalTime endTime, LocalTime startTime, Date date, long doctorId) {
        this.id = id;
        this.isBooked = isBooked;
        this.endTime = endTime;
        this.startTime = startTime;
        this.date = date;
        this.doctorId = doctorId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(long doctorId) {
        this.doctorId = doctorId;
    }
}
