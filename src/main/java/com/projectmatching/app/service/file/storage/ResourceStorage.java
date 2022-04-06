package com.projectmatching.app.service.file.storage;


import org.springframework.web.multipart.MultipartFile;

public interface ResourceStorage {
    void store(String directoryPath, MultipartFile multipartFile);
    void remove(String directoryPath);

}
