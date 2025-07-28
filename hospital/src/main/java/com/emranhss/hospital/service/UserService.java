package com.emranhss.hospital.service;

import com.emranhss.hospital.entity.*;
import com.emranhss.hospital.repository.IUserRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

   @Autowired
    private IUserRepo userRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private NurseService nurseService;

    @Autowired
   private ReceptionistService receptionistService;

    @Value("src/main/resources/static/images")
    private String uploadDir;



    public void saveOrUpdate(User user, MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = saveImage(imageFile, user);
            user.setPhoto(filename);
        }

        user.setRole(Role.Admin);
        userRepo.save(user);
        sendActivationEmail(user);
    }




    public List<User> findAll() {

        return userRepo.findAll();
    }

    public User findById(int id) {

        return userRepo.findById(id).get();
    }

    public void delete(User user) {

        userRepo.delete(user);
    }




    private void sendActivationEmail(User user) {
        String subject = "Welcome to Our Service – Confirm Your Registration";

        String mailText = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "  body { font-family: Arial, sans-serif; line-height: 1.6; }"
                + "  .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; }"
                + "  .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 10px 10px 0 0; }"
                + "  .content { padding: 20px; }"
                + "  .footer { font-size: 0.9em; color: #777; margin-top: 20px; text-align: center; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "  <div class='container'>"
                + "    <div class='header'>"
                + "      <h2>Welcome to Our Platform</h2>"
                + "    </div>"
                + "    <div class='content'>"
                + "      <p>Dear " + user.getName() + ",</p>"
                + "      <p>Thank you for registering with us. We are excited to have you on board!</p>"
                + "      <p>Please confirm your email address to activate your account and get started.</p>"
                + "      <p>If you have any questions or need help, feel free to reach out to our support team.</p>"
                + "      <br>"
                + "      <p>Best regards,<br>The Support Team</p>"
                + "    </div>"
                + "    <div class='footer'>"
                + "      &copy; " + java.time.Year.now() + " YourCompany. All rights reserved."
                + "    </div>"
                + "  </div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendSimpleEmail(user.getEmail(), subject, mailText);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send activation email", e);
        }
    }

//user images

    public String saveImage(MultipartFile file, User user) {

        Path uploadPath = Paths.get(uploadDir + "/users");
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectory(uploadPath);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        String fileName = user.getName() + "_" + UUID.randomUUID().toString();


        try {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return fileName;

    }





    //  Doctor Images folder
    public String saveImageForDoctor(MultipartFile file, Doctor doctor) {

        Path uploadPath = Paths.get(uploadDir + "/doctor");
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectory(uploadPath);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        String doctorName = doctor.getName() ;
        String fileName = doctorName.trim().replaceAll("\\s+", "_") ;

        String savedFileName = fileName+ "_" + UUID.randomUUID().toString();

        try {
            Path filePath = uploadPath.resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return savedFileName;

    }


    public void registerDoctor(User user, MultipartFile imageFile, Doctor doctorData) {
        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = saveImage(imageFile, user);
            String doctorPhoto = saveImageForDoctor(imageFile, doctorData);
            doctorData.setPhoto(doctorPhoto);
            user.setPhoto(filename);
        }

        user.setRole(Role.Doctor);
        User savedUser = userRepo.save(user); // Save User first

        // Set user to doctor and save it
        doctorData.setUser(savedUser);

        doctorService.save(doctorData);

        sendActivationEmail(savedUser);
    }


    //  nurse Images folder
    public String saveImageForNurse(MultipartFile file, Nurse nurse) {

        Path uploadPath = Paths.get(uploadDir + "/nurse");
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectory(uploadPath);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        String nurseName = nurse.getNurseName() ;
        String fileName = nurseName.trim().replaceAll("\\s+", "_") ;

        String savedFileName = fileName+ "_" + UUID.randomUUID().toString();

        try {
            Path filePath = uploadPath.resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return savedFileName;

    }
//Nurse Configuration

    public void registerNurse(User user, MultipartFile imageFile, Nurse nurseData) {
        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = saveImage(imageFile, user);
            String nursePhoto = saveImageForNurse(imageFile, nurseData);
            nurseData.setPhoto(nursePhoto);
            user.setPhoto(filename);
        }

        user.setRole(Role.Nurse);
        User savedUser = userRepo.save(user); // Save User first

        // Set user to nurse and save it
        nurseData.setUser(savedUser);

        nurseService.save(nurseData);

        sendActivationEmail(savedUser);
    }



    //  Receptionist Images folder
    public String saveImageForReceptionist(MultipartFile file, Receptionist receptionist) {

        Path uploadPath = Paths.get(uploadDir + "/receptionist");
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectory(uploadPath);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        String receptionistName = receptionist.getName() ;
        String fileName = receptionistName.trim().replaceAll("\\s+", "_") ;

        String savedFileName = fileName+ "_" + UUID.randomUUID().toString();

        try {
            Path filePath = uploadPath.resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return savedFileName;

    }


    public void registerReceptionist(User user, MultipartFile imageFile, Receptionist receptionistData) {
        if (imageFile != null && !imageFile.isEmpty()) {
            String filename = saveImage(imageFile, user);
            String receptionistPhoto = saveImageForReceptionist(imageFile, receptionistData);
            receptionistData.setPhoto(receptionistPhoto);
            user.setPhoto(filename);
        }

        user.setRole(Role.Receptionist);
        User savedUser = userRepo.save(user); // Save User first

        // Set user to receptionist and save it
        receptionistData.setUser(savedUser);

      receptionistService.save(receptionistData);

        sendActivationEmail(savedUser);
    }


}
