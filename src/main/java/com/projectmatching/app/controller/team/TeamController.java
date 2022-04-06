package com.projectmatching.app.controller.team;


import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ServiceConstant;
import com.projectmatching.app.domain.common.Paging;
import com.projectmatching.app.domain.team.dto.TeamDetailResponseDto;
import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.dto.TeamResponseDto;
import com.projectmatching.app.service.team.TeamService;
import com.projectmatching.app.service.user.UserService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.projectmatching.app.constant.ResponseTemplateStatus.EMPTY_TEAM_NAME;
import static com.projectmatching.app.constant.ServiceConstant.PAGING_SIZE;


@Slf4j
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
@Api(tags = "팀 컨트롤러")
public class TeamController {
    private final TeamService teamService;
    private final UserService userService;

    /**
     *
     * team 생성
     */
    @ApiOperation(value = "team 생성 API", notes = "team을 생성합니다.")
    @PostMapping("/team")
    public ResponseTemplate<Long> saveTeam(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody TeamRequestDto requestDto){
        if(requestDto.getName()==null) return ResponseTemplate.of(EMPTY_TEAM_NAME);

        Long result = teamService.save(requestDto, userDetails.getEmail());
        return ResponseTemplate.valueOf(result);
    }

    /**
     * team 카드들 조회
     */
    @ApiOperation(value = "team 카드 조회 API", notes = "팀 리스트를 조회합니다.")
    @GetMapping("/teams")
    public ResponseTemplate<List<TeamResponseDto>> getTeams(@RequestParam(name="page") int page){
        Paging paging = new Paging(page,PAGING_SIZE);
        return ResponseTemplate.valueOf(teamService.getTeams(paging));
    }

    /**
     * team 삭제
     */
    @ApiOperation(value = "team 게시글 삭제 API", notes = "팀 게시글을 삭제합니다.")
    @DeleteMapping("/team/{team_id}")
    public ResponseTemplate<String> deleteTeam(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long team_id){
        teamService.delete(team_id, userDetails.getEmail());
        String result = "팀 삭제에 성공하였습니다.";
        return ResponseTemplate.valueOf(result);
    }

    /**
     * team 상세페이지 조회
     */
    @ApiOperation(value = "team 게시글 상세 조회 API", notes = "팀 게시글 상세 페이지를 조회합니다.")
    @GetMapping("/team/{team_id}")
    public ResponseTemplate<TeamDetailResponseDto> getTeamDetail(@PathVariable Long team_id){
        return ResponseTemplate.valueOf(teamService.getTeam(team_id));
    }

    /**
     * team 수정
     */
    @ApiOperation(value = "team 게시글 수정 API", notes = "팀 게시글을 수정합니다.")
    @PatchMapping("/team/{team_id}")
    public ResponseTemplate<String> updateTeam(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long team_id, @RequestBody TeamRequestDto requestDto){
        teamService.update(team_id, requestDto, userDetails.getEmail());
        String result = "팀 수정에 성공하였습니다.";
        return ResponseTemplate.valueOf(result);
    }

    /**
     * team 좋아요 등록 및 삭제
     */
    @ApiOperation(value = "team 게시글 좋아요 등록 및 취소 API", notes = "팀 게시글을 수정합니다.")
    @PostMapping("/team/liking/{team_id}")
    public ResponseTemplate<Boolean> teamLike(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long team_id){  //user_id 부분 수정필요
        Boolean result = teamService.teamLike(team_id, userDetails.getEmail());
        return ResponseTemplate.valueOf(result);
    }
}
