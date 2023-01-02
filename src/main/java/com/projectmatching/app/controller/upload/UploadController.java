package com.projectmatching.app.controller.upload;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.file.dto.FileDetail;
import com.projectmatching.app.service.file.FileUploadService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value="/upload")
@RequiredArgsConstructor
@Api(tags = "업로드 컨트롤러")
public class UploadController {

    private final FileUploadService fileUploadService;

    @PostMapping
    @ApiOperation(value="파일 업로드")
    public ResponseTemplate<FileDetail> posting(@RequestPart("file")MultipartFile multipartFile){
        return ResponseTemplate.valueOf(fileUploadService.save(multipartFile));
    }

    @GetMapping("/cancel")
    @ApiOperation(value = "이미지 삭제")
    public ResponseTemplate<Void> removing(@RequestParam("imgUrl")String url){
        fileUploadService.remove(url);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }


}
