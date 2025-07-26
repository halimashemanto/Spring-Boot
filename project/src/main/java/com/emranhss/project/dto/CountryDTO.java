package com.emranhss.project.dto;

import java.util.List;

public class CountryDTO {

    private int id;
    private String name;

    public List<Integer> getDivisions() {
        return divisions;
    }

    public void setDivisions(List<Integer> divisions) {
        this.divisions = divisions;
    }

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

    private List<Integer> divisions;



}
