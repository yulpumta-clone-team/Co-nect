package com.projectmatching.app.service.file.storage;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.util.MultipartUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import static com.projectmatching.app.constant.ResponseTemplateStatus.LOGIN_USER_ERROR;


@Component
@ConditionalOnProperty(prefix = "cloud.aws.s3", name = "bucket")
@RequiredArgsConstructor
public class S3ResourceStorage implements ResourceStorage{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;


    @Override
    public void store(String directoryPath, MultipartFile multipartFile) {

        File file = new File(MultipartUtil.getLocalHomeDirectory(), directoryPath);
        try {
            multipartFile.transferTo(file);
            amazonS3Client.putObject(new PutObjectRequest(bucket, directoryPath, file)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponeException(LOGIN_USER_ERROR);
        } finally {
            if (file.exists()) {
                file.delete();
            }
        }
    }

    @Override
    public void remove(String directoryPath) {
        if (amazonS3Client.doesObjectExist(bucket, directoryPath)) {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, directoryPath));
        }
    }
}
