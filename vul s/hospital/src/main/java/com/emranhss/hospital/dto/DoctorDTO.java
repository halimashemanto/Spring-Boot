package com.emranhss.hospital.dto;

import com.emranhss.hospital.entity.Department;
import com.emranhss.hospital.entity.Doctor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

public class DoctorDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private String status;
    private String study;

    private String chamber;
    private Date joinDate;
    private String photo;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy load to avoid big joins unless needed
    @JoinColumn(name = "department_id", nullable = false) // FK column
    @JsonBackReference
    private Department department;

    private DoctorDTO toDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());
        dto.setGender(doctor.getGender());
        dto.setStatus(doctor.getStatus());
        dto.setStudy(doctor.getStudy());
        dto.setChamber(doctor.getChamber());
        dto.setJoinDate(doctor.getJoinDate());
        dto.setPhoto(doctor.getPhoto());


        if (doctor.getDepartment() != null) {
            dto.setDepartment(doctor.getDepartment());
        }

        // no slots or minimal slot info here to avoid recursion
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStudy() {
        return study;
    }

    public void setStudy(String study) {
        this.study = study;
    }


    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getChamber() {
        return chamber;
    }

    public void setChamber(String chamber) {
        this.chamber = chamber;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
