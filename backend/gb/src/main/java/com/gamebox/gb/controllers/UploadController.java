package com.gamebox.gb.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class UploadController {

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    @PostMapping("/games")
    public ResponseEntity<String> uploadGameImage(@RequestParam("file") MultipartFile file) {

        try {
            String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();

            Path path = Paths.get(uploadDir, "games", fileName);

            System.out.println("SALVANDO EM: " + path.toAbsolutePath());

            Files.createDirectories(path.getParent());

            Files.write(path, file.getBytes());

            String url = baseUrl + "/uploads/games/" + fileName;

            System.out.println("ARQUIVO RECEBIDO: " + file.getOriginalFilename());
            System.out.println("TAMANHO: " + file.getSize());
            System.out.println("URL GERADA: " + url);

            return ResponseEntity.ok(url);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao fazer upload da imagem.");
        }
    }
}
