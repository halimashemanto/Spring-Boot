package com.shemanto.studentCRUD.service;


import com.shemanto.studentCRUD.entity.Student;
import com.shemanto.studentCRUD.repository.IStudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private IStudentRepo repo;

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Student getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void save(Student student) {
        repo.save(student);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }



}
