package com.emranhss.hospital.repository;


import com.emranhss.hospital.entity.Bed;
import com.emranhss.hospital.entity.BedBooking;
import com.emranhss.hospital.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBedBookingRepo  extends JpaRepository<BedBooking,Long> {

    BedBooking findTopByBedOrderByAdmissionDateDesc(Bed bed);


//    List<Meal> findByBedBookingId(Long bedBookingId);
}
