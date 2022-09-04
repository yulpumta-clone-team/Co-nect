package com.projectmatching.app.domain.techStack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class TechStackDto {

    private Integer keys;

    private String category;

    private String techName; //기술 이름

    private String image;


    public static TechStackDto of(TechStack techStack){
        TechStackDto techStackDto = new TechStackDto();
        techStackDto.keys = techStack.getKeys();
        techStackDto.category = techStack.getCategory();
        techStackDto.techName = techStack.getTechName();
        techStackDto.image = techStack.getImage();
        return techStackDto;
    }
}
