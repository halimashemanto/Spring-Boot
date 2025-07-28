package com.suprovashemanto.crud.service;

import com.suprovashemanto.crud.entity.Employee;
import com.suprovashemanto.crud.repository.IEmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private IEmployeeRepo repo;

    public List<Employee> getAll() {
        return repo.findAll();
    }

    public Employee getById(int id) {
        return repo.findById(id).orElse(null);
    }

    public void save(Employee employee) {
        repo.save(employee);
    }

    public void delete(int id) {
        repo.deleteById(id);
    }

}
