package com.projectmatching.app.domain.techStack.provider;

import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.domain.techStack.entity.TechCode;

import java.util.List;

public interface TechStackProvider {


    List<TechCode> extractTechCodeByKeys(List<Integer> key);

    List<TechCodeDto> extractTechCodeDtoByCategory(String category);

    List<TechCodeDto> extractAnyTechCodeDto();
}
