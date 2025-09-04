package com.emranhss.hospital.repository;


import com.emranhss.hospital.entity.Bed;
import com.emranhss.hospital.entity.BedBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBedBookingRepo  extends JpaRepository<BedBooking,Long> {

    BedBooking findTopByBedOrderByAdmissionDateDesc(Bed bed);
}
