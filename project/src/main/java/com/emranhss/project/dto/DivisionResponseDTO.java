package com.emranhss.Project.dto;

import com.emranhss.Project.Entity.District;

import java.util.List;

public class DivisionResponseDTO {

    private int id;
    private String name;
    private List<District> districts;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }
}
