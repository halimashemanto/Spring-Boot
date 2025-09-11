package com.emranhss.hospital.dto;

import java.util.Date;
import java.util.List;

public class MealDTO {



        private Long mealMasterId;
        private Long bedBookingId;
        private Long admittedPatientId;
        private Date servedAt;
        private Long mealId;
        private String mealName;
        private String mealType;
        private String mealCategory;
        private double mealCost;
        private Date servedTime;


        private String patientName;
        private String phone;
        private int age;
        private String address;


        private List<MealDTO> meals;
        private double totalCost;


        public Long getMealMasterId() { return mealMasterId; }
        public void setMealMasterId(Long mealMasterId) { this.mealMasterId = mealMasterId; }

        public Long getBedBookingId() { return bedBookingId; }
        public void setBedBookingId(Long bedBookingId) { this.bedBookingId = bedBookingId; }

        public Long getAdmittedPatientId() { return admittedPatientId; }
        public void setAdmittedPatientId(Long admittedPatientId) { this.admittedPatientId = admittedPatientId; }

        public Date getServedAt() { return servedAt; }
        public void setServedAt(Date servedAt) { this.servedAt = servedAt; }

        public Long getMealId() { return mealId; }
        public void setMealId(Long mealId) { this.mealId = mealId; }

        public String getMealName() { return mealName; }
        public void setMealName(String mealName) { this.mealName = mealName; }

        public String getMealType() { return mealType; }
        public void setMealType(String mealType) { this.mealType = mealType; }

        public String getMealCategory() { return mealCategory; }
        public void setMealCategory(String mealCategory) { this.mealCategory = mealCategory; }

        public double getMealCost() { return mealCost; }
        public void setMealCost(double mealCost) { this.mealCost = mealCost; }

        public Date getServedTime() { return servedTime; }
        public void setServedTime(Date servedTime) { this.servedTime = servedTime; }

        public String getPatientName() { return patientName; }
        public void setPatientName(String patientName) { this.patientName = patientName; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public int getAge() { return age; }
        public void setAge(int age) { this.age = age; }

        public String getAddress() { return address; }
        public void setAddress(String address) { this.address = address; }

        public List<MealDTO> getMeals() { return meals; }
        public void setMeals(List<MealDTO> meals) { this.meals = meals; }

        public double getTotalCost() { return totalCost; }
        public void setTotalCost(double totalCost) { this.totalCost = totalCost; }


}
