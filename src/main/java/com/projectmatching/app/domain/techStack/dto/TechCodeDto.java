package com.projectmatching.app.domain.techStack.dto;

import com.projectmatching.app.domain.techStack.entity.TechCode;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class TechCodeDto {


    private int key;
    private String category;
    private String image;
    private String techName;

    public static TechCodeDto of(TechCode techCode){

        TechCodeDto techCodeDto = new TechCodeDto();
        techCodeDto.key =techCode.getKeys();
        techCodeDto.category = techCode.getCategory();
        techCodeDto.image = techCode.getImage();
        techCodeDto.techName = techCode.getTechName();

        return techCodeDto;

    }
}
