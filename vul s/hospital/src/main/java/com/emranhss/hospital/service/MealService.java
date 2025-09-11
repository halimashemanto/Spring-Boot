package com.emranhss.hospital.service;


import com.emranhss.hospital.dto.MealDTO;
import com.emranhss.hospital.entity.AdmittedPatient;
import com.emranhss.hospital.entity.BedBooking;
import com.emranhss.hospital.entity.Meal;
import com.emranhss.hospital.entity.MealMaster;
import com.emranhss.hospital.repository.IAdmittedPatientRepo;
import com.emranhss.hospital.repository.IBedBookingRepo;
import com.emranhss.hospital.repository.IMealMasterRepo;
import com.emranhss.hospital.repository.IMealRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MealService {



    @Autowired
    private IMealRepo mealRepo;

    @Autowired
    private IMealMasterRepo mealMasterRepo;

    @Autowired
    private IBedBookingRepo bedBookingRepo;

    @Autowired
    private IAdmittedPatientRepo admittedPatientRepository;




    public Meal saveMeal(MealDTO dto) {
        Meal meal = new Meal();

        MealMaster master = mealMasterRepo.findById(dto.getMealMasterId()).orElseThrow(() -> new RuntimeException("MealMaster not found"));
        BedBooking bedBooking = bedBookingRepo.findById(dto.getBedBookingId()).orElseThrow(() -> new RuntimeException("BedBooking not found"));

        meal.setMealMaster(master);
        meal.setBedBooking(bedBooking);
        meal.setMealCost(master.getPrice());
        meal.setServedAt(dto.getServedAt());

        return mealRepo.save(meal);
    }

    // Fetch all meals by BedBooking ID
    public MealDTO getMealsByBedBooking(Long bedBookingId) {
        List<Meal> meals = mealRepo.findByBedBookingId(bedBookingId);

        if(meals.isEmpty()) return null;

        MealDTO result = new MealDTO();
        List<MealDTO> mealDTOList = new ArrayList<>();
        double total = 0;

        BedBooking bedBooking = meals.get(0).getBedBooking();

        // Patient info
        result.setPatientName(bedBooking.getPatientName());
        result.setPhone(bedBooking.getPhone());
        result.setAge(bedBooking.getAge());
        result.setAddress(bedBooking.getAddress());

        for(Meal m : meals){
            MealDTO dto = new MealDTO();
            dto.setMealId(m.getId());
            dto.setMealName(m.getMealMaster().getName());
            dto.setMealCategory(m.getMealMaster().getCategory());
            dto.setMealType(m.getMealMaster().getType());
            dto.setMealCost(m.getMealCost());
            dto.setServedAt(m.getServedAt());
            mealDTOList.add(dto);

            total += m.getMealCost();
        }

        result.setMeals(mealDTOList);
        result.setTotalCost(total);

        return result;
    }


    public void deleteMeal(Long id) {
        mealRepo.deleteById(id);
    }
}
