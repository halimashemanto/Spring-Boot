package com.shemanto.Spring.policeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class policeService {

    @Autowired
    private ipolicerepo policeRepo;


    public void saveOrUpdate(Police p) {
        policeRepo.save(ps);

        public void saveOrUpdate(Police p){
            policeRepo.save(p);
        }


        public List<Police> findAll() {

            return policeRepo.findAll();
        }

        public Optional<Police> findById(Integer id){
            return policeRepo.findById(id);
        }
    }
}








