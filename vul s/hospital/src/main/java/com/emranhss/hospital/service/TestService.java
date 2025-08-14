package com.emranhss.hospital.service;


import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Tests;
import com.emranhss.hospital.repository.ITestRepo;
import org.aspectj.weaver.ast.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestService {

    @Autowired
    private ITestRepo testRepo;


    public List<Tests> getAllTests() {

        return testRepo.findAll();
    }


    public Tests save(Tests tests) {

        return testRepo.save(tests);
    }


    public Optional<Tests> getById(Long id) {

        return testRepo.findById(id);
    }

    //find test by id
    public Tests findById(long id){
        return testRepo.findById(id)
                .orElseThrow(()->new RuntimeException("Tests Not Found with id"+id));
    }

    //delete
    public void delete(long id) {
        testRepo.deleteById(id);
    }

}
