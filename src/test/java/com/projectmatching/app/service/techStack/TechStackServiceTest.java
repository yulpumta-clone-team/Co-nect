package com.projectmatching.app.service.techStack;

import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.techStack.TechCodeRepository;
import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.service.ServiceTest;
import com.projectmatching.app.util.StreamUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.when;

public class TechStackServiceTest extends ServiceTest {


    @InjectMocks
    private TechStackService techStackService;
    @Mock
    private TechCodeRepository techCodeRepository;
    @Mock
    private TechStackCodeBean techStackCodeBean;

    @InjectMocks
    private TechStackProviderImpl techStackProvider;



    private List<TechCode> techCodeList;
    private List<TechCodeDto> techCodeDtoList;

    @BeforeEach
    void setup(){
        techCodeList = new ArrayList<>();
        techCodeList.add(TechCode.builder().techName("javascript")
                        .image("url").category("front").keys(100).build());
        techCodeList.add(TechCode.builder()
                .techName("react")
                .image("url")
                .category("front")
                .keys(101).build());
        techCodeList.add(TechCode.builder()
                .techName("express")
                .image("url")
                .category("back")
                .keys(202).build());

        techCodeDtoList = StreamUtil.map(techCodeList,TechCodeDto::of);

    }

    @Test
    @DisplayName("카테고리 파라미터로 기술 스택 리스트 조회 ")
    void GIVEN_CATERGORY_PARAM_THEN_RETURN_TECHSTACKLIST(){
        when(techStackCodeBean.getTechCodeList()).thenReturn(techCodeList);

        String param = "front";
        List<TechCodeDto> result = techStackProvider.extractTechCodeDtoByCategory(param);

        assertThat(result).extracting("category").contains("front");
        assertThat(result).extracting("category").doesNotContain("architect");
    }



    @Test
    @DisplayName("정수형 키가 들어있는 리스트를 받아 기술 스택 리스트 조회")
    void GIVEN_INTGER_KET_LIST_THEN_RETURN_TECHSTACKLIST(){
        when(techStackCodeBean.getTechCodeList()).thenReturn(techCodeList);
        List<Integer> keys = new ArrayList<>();
        keys.add(202);
        keys.add(101);

        List<TechCode> result = techStackProvider.extractTechCodeByKeys(keys);

        assertThat(result).extracting("techName").contains("react","express");

    }



}
