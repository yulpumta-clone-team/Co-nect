package com.projectmatching.app.controller.history;


import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.domain.user.dto.UserLoginDto;
import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.service.history.UserHistoryService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/history")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "히스토리 컨트롤러")
public class HistoryController {

    private final UserHistoryService userHistoryService;


    @ApiOperation(value = "히스토리 조회")
    @GetMapping("")
    public ResponseTemplate<List<UserProfileDto>> getUserHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseTemplate.valueOf(userHistoryService.getUserHistory(userDetails));
    }


    @ApiOperation(value = "유저 상세 조회 이력 저장")
    @PostMapping("/{userId}")
    public ResponseTemplate<Long> saveUserHistory(@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable(name = "userId") Long visitedUserId){

        return ResponseTemplate.valueOf(userHistoryService.savedUserHistory(userDetails,visitedUserId));

    }


}
