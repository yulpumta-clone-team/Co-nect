package com.projectmatching.app.service.techStack;

import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.techStack.TechCodeRepository;
import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.domain.techStack.entity.TechCode;
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

    /**
     * category에 따라 기술 스택 목록 조회
     */
    public List<TechCodeDto> getTechCodeDtoListByCategory(String param){

        return techStackCode.getTechCodeList()
                .stream()
                .map(TechCodeDto::of)
                .filter(t-> t.getCategory().equals(param))
                .collect(Collectors.toList());
    }

    /**
     * category에 따라 기술 스택 목록 조회
     */
    public List<TechCodeDto> getTechCodeDtoList(){
        return techStackCode.getTechCodeList()
                .stream()
                .map(TechCodeDto::of)
                .collect(Collectors.toList());

    }


    /**
     *  key 값 리스트를 입력받아 해당 기술스택 리스트를 반환
     *  서버 내부 처리용
     */
    public List<TechCode> getTechCodeList(List<Integer> keys){
        return techStackCode.getTechCodeList()
                .stream()
                .filter(t-> keys.contains(t.getKey())).collect(Collectors.toList());
    }


}
