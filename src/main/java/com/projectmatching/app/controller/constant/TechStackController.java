package com.projectmatching.app.controller.constant;


import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.domain.techStack.dto.TechCodeDto;
import com.projectmatching.app.service.techStack.TechStackService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/techstack")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "기술 스택 컨트롤러")
public class TechStackController {

    private final TechStackService techStackService;

    @ApiOperation(value = "선택할 수 있는 기술 스택 카테고리로 조회")
    @GetMapping("")
    public ResponseTemplate<List<TechCodeDto>> getUserHistory(@RequestParam(name="category")String category) {
        return ResponseTemplate.valueOf(techStackService.getTechCodeDtoListByCategory(category));
    }

    @ApiOperation(value = "선택할 수 있는 기술 스택 전체 조회 ")
    @GetMapping("/all")
    public ResponseTemplate<List<TechCodeDto>> getUserHistory() {
        return ResponseTemplate.valueOf(techStackService.getTechCodeDtoList());
    }





}
