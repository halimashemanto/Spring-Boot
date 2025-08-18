package com.emranhss.hospital.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String age;
    private String address;
    private String contact;
    private String reason;
    private String department;
    private Date admittedDate;

    private String photo;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public Patient() {
    }

    public Patient(long id, User user, Date admittedDate, String department, String reason, String address, String age, String name, String contact, String photo) {
        this.id = id;
        this.user = user;
        this.admittedDate = admittedDate;
        this.department = department;
        this.reason = reason;
        this.address = address;
        this.age = age;
        this.name = name;
        this.contact = contact;
        this.photo = photo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getAdmittedDate() {
        return admittedDate;
    }

    public void setAdmittedDate(Date admittedDate) {
        this.admittedDate = admittedDate;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }
    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
