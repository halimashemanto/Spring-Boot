package com.emranhss.project.dto;

import java.util.List;

public class DivisionDTO {
    private int id;
    private String name;
    private List<Integer> districts;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Integer> getDistricts() {
        return districts;
    }

    public void setDistricts(List<Integer> districts) {
        this.districts = districts;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
