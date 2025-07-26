package com.emranhss.Project.dto;

import com.emranhss.Project.Entity.Division;

import java.util.List;

public class CountryResponseDTO {

    private int id;
    private String name;
    private List<Division> divisions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Division> getDivisions() {
        return divisions;
    }

    public void setDivisions(List<Division> divisions) {
        this.divisions = divisions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
