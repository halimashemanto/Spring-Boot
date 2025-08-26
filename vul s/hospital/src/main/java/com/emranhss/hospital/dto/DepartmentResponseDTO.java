package com.emranhss.hospital.dto;

import java.util.List;

public class DepartmentResponseDTO {


    private Long id;
    private String departmentName;
    private String description;




    public DepartmentResponseDTO() {
    }

    public DepartmentResponseDTO(Long id, String departmentName, String description) {
        this.id = id;
        this.departmentName = departmentName;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
