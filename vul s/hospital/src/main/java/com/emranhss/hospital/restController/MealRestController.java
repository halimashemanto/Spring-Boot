package com.emranhss.hospital.restController;


import com.emranhss.hospital.dto.MealDTO;
import com.emranhss.hospital.entity.Meal;
import com.emranhss.hospital.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meals")
public class MealRestController {

    @Autowired
    private MealService mealService;

    @PostMapping
    public Meal addMeal(@RequestBody MealDTO dto){
        return mealService.saveMeal(dto);
    }

    @GetMapping("/bedbooking/{id}")
    public MealDTO getMealsByBedBooking(@PathVariable Long id){
        return mealService.getMealsByBedBooking(id);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable Long id){
        mealService.deleteMeal(id);
    }
}
