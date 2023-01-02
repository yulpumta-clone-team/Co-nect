package com.projectmatching.app.domain.techStack.provider;

import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class TechStackProviderImpl implements TechStackProvider {

    private final TechStackCodeBean techStackCodeBean;

    @Override
    public List<TechCode> extractTechCodeByKeys(List<Integer> keys) {
        return techStackCodeBean.getTechCodeList()
                .stream()
                .filter(t -> keys.contains(t.getKeys())).collect(Collectors.toList());
    }

    @Override
    public List<TechCodeDto> extractTechCodeDtoByCategory(String category) {
        return techStackCodeBean.getTechCodeList()
                .stream()
                .map(TechCodeDto::of)
                .filter(t -> t.getCategory().equals(category))
                .collect(Collectors.toList());
    }

    @Override
    public List<TechCodeDto> extractAnyTechCodeDto() {
        return techStackCodeBean.getTechCodeList()
                .stream()
                .map(TechCodeDto::of)
                .collect(Collectors.toList());
    }

}