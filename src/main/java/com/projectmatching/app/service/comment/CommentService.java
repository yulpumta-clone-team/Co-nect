package com.projectmatching.app.service.comment;


import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;

import java.util.List;

public interface CommentService {
//
//    //조회
//    List<TeamComment> getTeamComment(Long teamPostId);
    List<UserCommentDto> getUserComment(Long userPostId);
//
//    //댓글 생성 및 수정 삭제
    TeamCommentDto addTeamComment(TeamCommentDto teamCommentDto);
    TeamCommentDto updateTeamComment(TeamCommentDto teamCommentDto);
//
    UserCommentDto addUserComment(UserCommentDto userCommentDto);
    UserCommentDto updateUserComment(UserCommentDto userCommentDto);
//
    //대댓글 및 댓글 삭제
    void deleteUserComment(UserDetailsImpl userDetails, Long commentId);
    void deleteTeamComment(UserDetailsImpl userDetails, Long commentId);
//
//
//    //대댓글 생성 및 수정 삭제
    TeamCommentDto updateTeamNestedComment(TeamCommentDto teamCommentDto);
    TeamCommentDto addTeamNestedComment(TeamCommentDto teamCommentDto);
//
    UserCommentDto updateUserNestedComment(UserCommentDto userCommentDto);
    UserCommentDto addUserNestedComment(UserCommentDto userCommentDto);
////
//    void deleteUserNestedComment(UserDetails userDetails, Long commentId);
//    void deleteTeamNestedComment(Long userPostId, Long parentCommentId, Long childCommentId);

    //댓글 좋아요 누르기
    void doUserCommentLiking(UserDetailsImpl userDetails,Long commentId);
    void cancelUserCommentLiking(UserDetailsImpl userDetails,Long commentId);


    Boolean likingTeamComment(UserDetailsImpl userDetails, Long commentId);




}
