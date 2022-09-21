package com.projectmatching.app.controller.history;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.service.history.TeamHistoryService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history/team")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "팀 히스토리 컨트롤러")
public class TeamHistoryController {

    private final TeamHistoryService teamHistoryService;

    @ApiOperation(value = "히스토리 조회")
    @GetMapping("")
    public ResponseTemplate<List<Team>> getTeamHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseTemplate.valueOf(teamHistoryService.getTeamHistory(userDetails));
    }


    @ApiOperation(value = "팀 게시글 히스토리 저장")
    @PostMapping("/{teamId}")
    public ResponseTemplate<Long> saveTeamHistory(@AuthenticationPrincipal UserDetailsImpl userDetails,@PathVariable(name = "teamId") Long visitedTeamId){
        return ResponseTemplate.valueOf(teamHistoryService.savedTeamHistory(userDetails, visitedTeamId));
    }
}
