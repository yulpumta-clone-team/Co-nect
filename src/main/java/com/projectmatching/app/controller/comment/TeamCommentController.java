package com.projectmatching.app.controller.comment;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.service.comment.CommentService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "팀 댓글 컨트롤러")
public class TeamCommentController {

    private final CommentService commentService;

    @ApiOperation(value = "팀 댓글 달기")
    @PostMapping("/comment")
    public ResponseTemplate<TeamCommentDto> addTeamComment(@RequestBody TeamCommentDto teamCommentDto) {

        return ResponseTemplate.valueOf(commentService.addTeamComment(teamCommentDto));

    }

    @ApiOperation(value = "팀 대댓글 달기")
    @PostMapping("/nested_comment")
    public ResponseTemplate<TeamCommentDto> addTeamNestedComment(@RequestBody TeamCommentDto teamCommentDto){
        return ResponseTemplate.valueOf(commentService.addTeamNestedComment(teamCommentDto));
    }

    @ApiOperation(value = "팀 게시글 댓글 수정")
    @PatchMapping("/comment")
    public ResponseTemplate<TeamCommentDto> updateTeamComment(@RequestBody TeamCommentDto teamCommentDto) {

        return ResponseTemplate.valueOf(commentService.updateTeamComment(teamCommentDto));
    }

    @ApiOperation(value = "팀 게시글 대댓글 수정")
    @PatchMapping("/nested_comment")
    public ResponseTemplate<TeamCommentDto> updateTeamNestedComment(@RequestBody TeamCommentDto teamCommentDto) {

        return ResponseTemplate.valueOf(commentService.updateTeamNestedComment(teamCommentDto));
    }

    @ApiOperation(value = "팀 게시글 (대)댓글 삭제")
    @DeleteMapping("/comment/{comment_id}")
    public ResponseTemplate<Void> delTeamComment(@PathVariable(name = "comment_id") Long commentId, @AuthenticationPrincipal UserDetailsImpl userDetails){
        commentService.deleteTeamComment(userDetails,commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }

    @ApiOperation(value = "팀 게시물 댓글에 좋아요 누르기")
    @PostMapping("/comment/liking/{comment_id}")
    public ResponseTemplate<Boolean> likingTeamComment(@PathVariable(name = "comment_id") Long commentId, @AuthenticationPrincipal UserDetailsImpl userDetails){
        Boolean result = commentService.likingTeamComment(userDetails, commentId);
        return ResponseTemplate.valueOf(result);
    }
}
