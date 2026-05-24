package com.gamebox.gb.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class UploadController {
    @PostMapping("/games")
    public ResponseEntity<String> uploadGameImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();

            Path path = Paths.get("uploads/games/" + fileName);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            String url = "http://localhost:8080/uploads/games/" + fileName;

            return ResponseEntity.ok(url);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao fazer upload da imagem.");
        }
    }
}
