package com.emranhss.hospital.service;

import com.emranhss.hospital.entity.Appoinment;
import com.emranhss.hospital.entity.Doctor;
import com.emranhss.hospital.entity.Invoice;
import com.emranhss.hospital.entity.Tests;
import com.emranhss.hospital.repository.IAppoinmentRepo;
import com.emranhss.hospital.repository.IDoctorRepo;
import com.emranhss.hospital.repository.IInvoiceRepo;
import com.emranhss.hospital.repository.ITestRepo;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private IInvoiceRepo invoiceRepository;

    @Autowired
    private IAppoinmentRepo appoinmentRepository;

    @Autowired
    private IDoctorRepo doctorRepository;

    @Autowired
    private ITestRepo testsRepository;


    @Autowired
    private EntityManager entityManager;


    public InvoiceService(IInvoiceRepo invoiceRepository, ITestRepo testsRepository,IDoctorRepo doctorRepository,IAppoinmentRepo appoinmentRepository) {
        this.invoiceRepository = invoiceRepository;
        this.testsRepository = testsRepository;
        this.doctorRepository = doctorRepository;
        this.appoinmentRepository = appoinmentRepository;
    }

    @Transactional
    public Invoice saveInvoice(Invoice invoice) {
        // 1️⃣ Check doctor
        Doctor doctor = Optional.ofNullable(invoice.getDoctor())
                .map(d -> doctorRepository.findById(d.getId())
                        .orElseThrow(() -> new RuntimeException("Doctor not found!")))
                .orElseThrow(() -> new RuntimeException("Doctor must be provided!"));

        invoice.setDoctor(doctor);

        // 2️⃣ Check appointment
        Appoinment appoinment = Optional.ofNullable(invoice.getAppoinment())
                .map(a -> appoinmentRepository.findById(a.getId())
                        .orElseThrow(() -> new RuntimeException("Appoinment not found!")))
                .orElse(null); // appointment optional
        invoice.setAppoinment(appoinment);

        // 3️⃣ Merge tests
        if(invoice.getTests() != null) {
            for(int i = 0; i < invoice.getTests().size(); i++) {
                Tests test = invoice.getTests().get(i);
                invoice.getTests().set(i, entityManager.merge(test));
            }
        }

        // 4️⃣ Calculate totalAmount
        double total = 0;
        if(invoice.getTests() != null) {
            total = invoice.getTests().stream()
                    .mapToDouble(Tests::getTestPrice)
                    .sum();
        }
        if(invoice.getDiscount() != null) {
            total -= invoice.getDiscount();
        }
        invoice.setTotalAmount(total);

        // 5️⃣ Save invoice
        return invoiceRepository.save(invoice);
    }



    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }


    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }


}
