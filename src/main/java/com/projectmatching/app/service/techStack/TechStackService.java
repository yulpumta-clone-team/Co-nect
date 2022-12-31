package com.projectmatching.app.service.techStack;

import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.techStack.TechCodeRepository;
import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.provider.TechStackProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechStackService {
    private final TechCodeRepository techCodeRepository;
    private final TechStackCodeBean techStackCode;
    private final TechStackProvider techStackProvider;

    /**
     * category에 따라 기술 스택 목록 조회
     */
    public List<TechCodeDto> getTechCodeDtoListByCategory(String param){
        return techStackProvider.extractTechCodeDtoByCategory(param);
    }

    /**
     * category에 상관없이 기술 스택 목록 모두 조회
     */
    public List<TechCodeDto> getTechCodeDtoList(){
        return techStackProvider.extractAnyTechCodeDto();

    }
}