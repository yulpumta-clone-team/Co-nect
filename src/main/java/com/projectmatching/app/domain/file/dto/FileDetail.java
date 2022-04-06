package com.projectmatching.app.domain.file.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.util.MultipartUtil;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FileDetail {

    @ApiModelProperty(notes = "파일 고유 ID",required = true)
    private String id;

    @ApiModelProperty(notes = "파일 경로",required = true)
    private String path;

    @ApiModelProperty(notes = "파일명")
    private String name;

    @ApiModelProperty(notes = "파일 용량(byte)")
    private long bytes;

    @ApiModelProperty(notes = "이미지 가로")
    private Integer width;

    @ApiModelProperty(notes = "이미지 세로")
    private Integer height;

    @ApiModelProperty(notes = "정렬 순서")
    private int sequence;

    @Builder.Default
    @JsonIgnore
    @ApiModelProperty(notes = "삭제된 파일인지 여부")
    private boolean delete = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();


    public static FileDetail multipartOf(MultipartFile multipartFile) {
        final String fileId = MultipartUtil.createFileId();
        final String format = MultipartUtil.getFormat(multipartFile.getContentType());
        return FileDetail.builder()
                .id(fileId)
                .name(multipartFile.getOriginalFilename())
                .path(MultipartUtil.createPath(fileId, format))
                .bytes(multipartFile.getSize())
                .build();
    }
}
