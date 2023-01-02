package com.projectmatching.app.controller.comment;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.dto.TeamCommentReqDto;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
import com.projectmatching.app.service.comment.CommentService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "팀 댓글 컨트롤러")
public class TeamCommentController {

    private final CommentService commentService;

    @ApiOperation(value = "팀 댓글 달기")
    @PostMapping("/comment")
    public ResponseTemplate<TeamCommentDto> addTeamComment(@RequestBody TeamCommentReqDto teamCommentReqDto, @AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseTemplate.valueOf(commentService.addTeamComment(teamCommentReqDto,userDetails));
    }

    @ApiOperation(value = "팀 대댓글 달기")
    @PostMapping("/nested_comment")
    public ResponseTemplate<TeamCommentDto> addNestedComment(@RequestBody TeamCommentReqDto teamCommentReqDto, @AuthenticationPrincipal UserDetailsImpl userDetails){
        return ResponseTemplate.valueOf(commentService.addTeamNestedComment(teamCommentReqDto,userDetails));
    }



    @ApiOperation(value = "팀 게시글 (대)댓글 수정")
    @PatchMapping("/comment/{comment_id}")
    public ResponseTemplate<TeamCommentDto> updateTeamComment(@RequestBody TeamCommentReqDto teamCommentReqDto, @PathVariable(name = "comment_id") Long commentId,@AuthenticationPrincipal UserDetailsImpl userDetails) {

        return ResponseTemplate.valueOf(commentService.updateTeamComment(teamCommentReqDto,userDetails,commentId));
    }


    @ApiOperation(value = "팀 게시글 (대)댓글 삭제")
    @DeleteMapping("/comment/{comment_id}")
    public ResponseTemplate<Void> delTeamComment(@PathVariable(name = "comment_id") Long commentId, @AuthenticationPrincipal UserDetailsImpl userDetails){
        commentService.deleteTeamComment(userDetails,commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }



    @ApiOperation(value = "팀 게시물 댓글에 좋아요 누르기")
    @PatchMapping("/comment/liking/{comment_id}")
    public ResponseTemplate<Boolean> doTeamCommentLiking(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable(name = "comment_id") Long commentId){
        commentService.doTeamCommentLiking(userDetails, commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }

    @ApiOperation(value ="팀 게시물 댓글 좋아요 취소")
    @DeleteMapping("/comment/unliking/{comment_id}")
    public ResponseTemplate<Boolean> cancelTeamCommentLiking(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable(name = "comment_id") Long commentId){
        commentService.cancelTeamCommentLiking(userDetails, commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }


    @ApiOperation(value = "팀 게시글 댓글 리스트 조회")
    @GetMapping("/comment/{team_id}")
    public ResponseTemplate<List<TeamCommentDto>> getTeamCommentList(@PathVariable(name = "team_id") Long teamId){
        return ResponseTemplate.valueOf(commentService.getTeamComment(teamId));
    }
}
