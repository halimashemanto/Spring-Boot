package com.shemanto.Spring.restControllar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/police/")
public class restControllar {
    @Autowired
    private policeService policeService;

    public  void save(@RequestBody police p){
        policeService.saveOrUpdate
    }



}
