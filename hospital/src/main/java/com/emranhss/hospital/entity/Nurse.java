package com.emranhss.hospital.entity;


import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "nurses")
public class Nurse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 80,nullable = false)
    private String name;

    private String email;
    private String phone;
    private String address;
    private String nurseType;
    private String gender;
    private Date joinDate;
    private String Shift;
    private String workingHours;
    private String photo;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Nurse() {
    }

    public Nurse(long id, User user, String photo, String workingHours, String shift, Date joinDate, String gender, String nurseType, String address, String phone, String email, String name) {
        this.id = id;
        this.user = user;
        this.photo = photo;
        this.workingHours = workingHours;
        this.Shift = shift;
        this.joinDate = joinDate;
        this.gender = gender;
        this.nurseType = nurseType;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNurseName() {
        return name;
    }

    public void setNurseName(String nurseName) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNurseType() {
        return nurseType;
    }

    public void setNurseType(String nurseType) {
        this.nurseType = nurseType;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public String getShift() {
        return Shift;
    }

    public void setShift(String shift) {
       this.Shift = shift;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
