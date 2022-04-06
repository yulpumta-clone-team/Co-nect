package com.projectmatching.app.controller.comment;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
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
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "댓글 컨트롤러")
public class CommentController {


    private final CommentService commentService;


    @ApiOperation(value = "유저 댓글 달기")
    @PostMapping("/comment")
    public ResponseTemplate<UserCommentDto> addComment(@RequestBody UserCommentDto userCommentDto){

        return ResponseTemplate.valueOf(commentService.addUserComment(userCommentDto));

    }


    @ApiOperation(value ="유저 대댓글 달기")
    @PostMapping("/nested_comment")
    public ResponseTemplate<UserCommentDto> addNestedComment(@RequestBody UserCommentDto userCommentDto){
        return ResponseTemplate.valueOf(commentService.addUserNestedComment(userCommentDto));
    }


    @ApiOperation(value = "유저 게시글 댓글 수정")
    @PatchMapping("/comment")
    public ResponseTemplate<UserCommentDto> updateComment(@RequestBody UserCommentDto userCommentDto){
        return ResponseTemplate.valueOf(commentService.updateUserComment(userCommentDto));
    }


    @ApiOperation(value = "유저 게시글 대댓글 수정")
    @PatchMapping("/nested_comment")
    public ResponseTemplate<UserCommentDto> updateNestedComment(@RequestBody UserCommentDto userCommentDto){
        return ResponseTemplate.valueOf(commentService.updateUserNestedComment(userCommentDto));
    }


    @ApiOperation(value = "유저 게시글 (대)댓글 삭제")
    @DeleteMapping("/comment/{comment_id}")
    public ResponseTemplate<Void> delComment(@PathVariable(name = "comment_id") Long commentId, @AuthenticationPrincipal UserDetailsImpl userDetails){
        commentService.deleteUserComment(userDetails,commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }


    @ApiOperation(value = "댓글 리스트 조회")
    @GetMapping("/comment/{user_id}")
    public ResponseTemplate<List<UserCommentDto>> getUserCommentList(@PathVariable(name="user_id") Long postId){
        return ResponseTemplate.valueOf(commentService.getUserComment(postId));

    }


    @ApiOperation(value = "유저 댓글 좋아요하기")
    @GetMapping("/comment/liking/{comment_id}")
    public ResponseTemplate<Void> doUserCommentLiking(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable(name = "comment_id") Long commentId){
        commentService.doUserCommentLiking(userDetails,commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }

    @ApiOperation(value ="유저 댓글 좋아요 취소")
    @GetMapping("/comment/unliking/{comment_id}")
    public ResponseTemplate<Void> cancelUserCommentLiking(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable(name = "comment_id")Long commentId){
        commentService.cancelUserCommentLiking(userDetails,commentId);
        return ResponseTemplate.of(ResponseTemplateStatus.SUCCESS);
    }

}
