package com.emranhss.hospital.service;

import com.emranhss.hospital.dto.InvoiceDTO;
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
    public Invoice saveInvoice(InvoiceDTO dto) {
        // 1️⃣ Doctor
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor must be provided!"));

        // 2️⃣ Appointment (optional)
        Appoinment appoinment = null;
        if (dto.getAppoinmentId() != null) {
            appoinment = appoinmentRepository.findById(dto.getAppoinmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found!"));
        }

        // 3️⃣ Tests
        List<Tests> tests = testsRepository.findAllById(dto.getTestIds());

        // 4️⃣ Create Invoice
        Invoice invoice = new Invoice();
        invoice.setDoctor(doctor);
        invoice.setAppoinment(appoinment);
        invoice.setTests(tests);
        invoice.setDiscount(dto.getDiscount());
        invoice.setInvoiceDate(dto.getInvoiceDate());
        invoice.setDeliveryDate(dto.getDeliveryDate());
        invoice.setDeliveryTime(dto.getDeliveryTime());

        // 5️⃣ Calculate total, payable, due
        invoice.calculateTotal();

        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

}
