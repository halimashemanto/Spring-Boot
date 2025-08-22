package com.emranhss.hospital.restController;


import com.emranhss.hospital.entity.Invoice;
import com.emranhss.hospital.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceRestController {

    @Autowired
    private  InvoiceService invoiceService;

    @Autowired
    public InvoiceRestController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }




    @PostMapping

    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        Invoice savedInvoice = invoiceService.saveInvoice(invoice);
        return ResponseEntity.ok(savedInvoice);
    }

    // ✅ Get all invoices
    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoices);
    }

    // ✅ Get invoice by ID
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return invoiceService.getInvoiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }













//    @PostMapping
//    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
//        Invoice savedInvoice = invoiceService.saveInvoice(invoice);
//        return ResponseEntity.ok(savedInvoice);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Invoice>> getAllInvoices() {
//        List<Invoice> invoices = invoiceService.getAllInvoices();
//        return ResponseEntity.ok(invoices);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
//        return invoiceService.getInvoiceById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice updatedInvoice) {
//        Invoice invoice = invoiceService.updateInvoice(id, updatedInvoice);
//        return ResponseEntity.ok(invoice);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
//        invoiceService.deleteInvoice(id);
//        return ResponseEntity.noContent().build();
//    }

}
