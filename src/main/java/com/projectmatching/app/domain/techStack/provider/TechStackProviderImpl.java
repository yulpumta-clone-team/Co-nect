package com.projectmatching.app.domain.techStack.provider;
import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class TechStackProviderImpl implements TechStackProvider{
    private final TechStackCodeBean techStackCode;

    @Override
    public List<TechCode> extractTechCodeByKeys(List<Integer> keys) {
        return techStackCode.getTechCodeList()
                .stream()
                .filter(t-> keys.contains(t.getKey())).collect(Collectors.toList());
    }

    @Override
    public List<TechCodeDto> extractTechCodeDtoByCategory(String category) {
        return techStackCode.getTechCodeList()
                .stream()
                .map(TechCodeDto::of)
                .filter(t-> t.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    @Override
    public List<TechCodeDto> extractAnyTechCodeDto() {
        return techStackCode.getTechCodeList()
                .stream()
                .map(TechCodeDto::of)
                .collect(Collectors.toList());
    }



}
