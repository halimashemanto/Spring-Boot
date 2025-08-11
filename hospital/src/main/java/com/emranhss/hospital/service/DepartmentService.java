package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.Department;
import com.emranhss.hospital.entity.Tests;
import com.emranhss.hospital.repository.IDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {

    @Autowired
    private IDepartmentRepository departmentRepo;

    public List<Department> getAllDepartment() {

        return departmentRepo.findAll();
    }


    public Department save(Department department) {
        return departmentRepo.save(department);
    }


    public Optional<Department> getById(Long id) {
        return departmentRepo.findById(id);
    }

    //find Department by id
    public Department findById(long id){
        return departmentRepo.findById(id).orElseThrow(()->new RuntimeException("Tests Not Found with id"+id));
    }

    //delete
    public void delete(long id) {
        departmentRepo.deleteById(id);
    }


}
