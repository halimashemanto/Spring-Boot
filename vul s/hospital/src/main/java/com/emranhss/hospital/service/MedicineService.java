package com.emranhss.hospital.service;



import com.emranhss.hospital.entity.Medicine;
import com.emranhss.hospital.repository.IMedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {


    @Autowired
    private IMedicineRepo medicineRepo;


    public List<Medicine> getAllMedicine() {
        return medicineRepo.findAll();
    }


    public Medicine save(Medicine medicine) {
        return medicineRepo.save(medicine);
    }


    public Optional<Medicine> getById(Long id) {
        return medicineRepo.findById(id);
    }


    public Medicine findById(long id){
        return medicineRepo.findById(id).orElseThrow(()->new RuntimeException("Tests Not Found with id"+id));
    }


    public void delete(long id) {
        medicineRepo.deleteById(id);
    }
}
