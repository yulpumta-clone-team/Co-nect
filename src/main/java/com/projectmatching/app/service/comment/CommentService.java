package com.projectmatching.app.service.comment;

import com.projectmatching.app.annotation.UserInfoContainedInReturnVal;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.comment.repository.QTeamCommentRepository;
import com.projectmatching.app.domain.comment.repository.QUserCommentRepository;
import com.projectmatching.app.domain.comment.repository.TeamCommentRepository;
import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.liking.repository.TeamCommentLikingRepository;
import com.projectmatching.app.domain.liking.repository.UserCommentLikingRepository;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ResponseTemplateStatus.*;

@Service
@RequiredArgsConstructor
public class CommentService {


    private final TeamCommentRepository teamCommentRepository;
    private final UserCommentRepository userCommentRepository;

    private final TeamRepository teamRepository;

    private final UserCommentLikingRepository userCommentLikingRepository;
    private final QTeamCommentRepository qTeamCommentRepository;
    private final QUserCommentRepository qUserCommentRepository;
    private final TeamCommentLikingRepository teamCommentLikingRepository;
    private final UserRepository userRepository;
    /**
     * 댓글 추가 서비스
     */
    //유저 프로필에 댓글달기
    @Transactional
    @UserInfoContainedInReturnVal
    public UserCommentDto addUserComment(UserCommentReqDto userCommentReqDto, UserDetailsImpl userDetails) {
        User beingCommentedUser = userRepository.findById(userCommentReqDto.getUserId()).orElseThrow(CoNectNotFoundException::new);
        UserComment userComment = userCommentReqDto.asEntity();
        userComment.setWriter(userDetails.getUserRealName()); //댓글 단 사람 입력

        return UserCommentDto.of(addCommentToUser(userComment,beingCommentedUser));

    }

    //유저 프로필에 대댓글 달기

    @Transactional
    @UserInfoContainedInReturnVal
    public UserCommentDto addUserNestedComment(UserCommentReqDto userCommentReqDto, UserDetailsImpl userDetails) {
        //부모 댓글 설정 안되어있으면 에러
        try {
            if (userCommentReqDto.getParentId() == null) throw new ResponeException(ADD_NESTED_FAILED);

            User beingCommentedUser = userRepository.findById(userDetails.getId()).orElseThrow(CoNectNotFoundException::new);
            UserComment userComment = userCommentReqDto.asEntity();
            addCommentToUser(userComment, beingCommentedUser);

            userComment.setParent(userCommentRepository.findById(userCommentReqDto.getParentId()).orElseThrow(NullPointerException::new)); //부모 댓글 설정
            return UserCommentDto.of(userCommentRepository.save(userComment));

        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponeException(ADD_NESTED_FAILED);
        }


    }

    /**
     * 댓글 수정 서비스
     */
    @Transactional
    @UserInfoContainedInReturnVal
    public UserCommentDto updateUserComment(UserCommentReqDto userCommentDto ,UserDetailsImpl userDetails) {

        return UserCommentDto.of(updateCommentToUser(userCommentDto));
    }

    /**
     * 대댓글 수정
     */

    @Transactional
    @UserInfoContainedInReturnVal
    public UserCommentDto updateUserNestedComment(UserCommentReqDto userCommentDto, UserDetailsImpl userDetails) {
        return UserCommentDto.of(updateCommentToUser(userCommentDto));
    }


    /**
     *  (대)댓글 삭제
     */

    @Transactional
    public void deleteUserComment(UserDetailsImpl userDetails, Long commentId) {

        UserComment userComment = Optional.of(userCommentRepository.getById(commentId)).orElseThrow(NullPointerException::new);
        //작성자와 삭제자 일치하거나 유저프로필이 본인 것이거나 관리자 일경우에만 삭제
        if(userComment.getUser().getName().equals(userDetails.getUserRealName()) || userComment.getUser().getName().equals(userDetails.getUserRealName()) || userDetails.getRole().equals(Role.ADMIN))
            userCommentRepository.delete(userComment);

        else throw new ResponeException(DELETE_COMMENT_FAILED);

    }


    /**
     * 유저게시물에서 댓글 리스트 조회
     */

    @Transactional(readOnly = true)
    public List<UserCommentDto> getUserComment(Long userPostId) {
        List<UserCommentDto> userComments = userCommentRepository.getUserCommentByPostId(userPostId).stream()
                .map(UserCommentDto::of)
                .collect(Collectors.toList());
        return userComments;
    }

    /**
     * 댓글 좋아요 하기
     */

    @Transactional
    public void doUserCommentLiking(UserDetailsImpl userDetails, Long commentId) {

        UserComment userComment = userCommentRepository.findById(commentId).orElseThrow(RuntimeException::new);
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);

        UserCommentLiking userCommentLiking = UserCommentLiking.builder()
                .id(IdGenerator.number())
                .userComment(userComment)
                .user(user)
                .build();

        userCommentLikingRepository.save(userCommentLiking);

    }


    @Transactional
    public void cancelUserCommentLiking(UserDetailsImpl userDetails, Long commentId) {
        try {
            UserCommentLiking userCommentLiking = userCommentLikingRepository
                    .findUserCommentLikingByUserNameAndUserCommentId(userDetails.getUserRealName(), commentId)
                    .orElseThrow(NullPointerException::new);

            userCommentLikingRepository.delete(userCommentLiking);
        }catch (NullPointerException e){

            throw new ResponeException(LIKING_COMMENT_FAILED);
        }


    }

    private UserComment updateCommentToUser(UserCommentReqDto userCommentReqDto){
        try {
            UserComment userComment = userCommentRepository.findById(userCommentReqDto.getUserId()).orElseThrow(NullPointerException::new);
            //부모 댓글이 바뀌면 안됨
            if(userCommentReqDto.getParentId() != userComment.getParent().getId()) throw new RuntimeException();

            userComment.setContent(userComment.getContent()); //댓글 수정
            if(userCommentReqDto.getSecret() != userComment.getSecret()) userComment.setSecret(userCommentReqDto.getSecret()); //비밀댓글 여부 바뀌었다면
            return userComment;

        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponeException(UPDATE_COMMENT_FAILED);
        }

    }




    @UserInfoContainedInReturnVal
    private UserComment addCommentToUser(UserComment userComment, User user) {
        userComment.setUser(user);
        userCommentRepository.save(userComment);
        return userComment;

    }


    /**
     * team (대)댓글 추가
     */
    @Transactional(rollbackFor = ResponeException.class)
    public TeamCommentDto addTeamComment(TeamCommentDto teamCommentDto) {
        TeamComment teamComment = addCommentToTeam(teamCommentDto);
        if(teamCommentDto.getParentId()!=null){
            teamComment.setParent(teamCommentRepository.findById(teamCommentDto.getParentId()).orElseThrow(NullPointerException::new));
        }
        return teamCommentDto.of(teamCommentRepository.save(teamComment));

    }



    /**
     * team (대)댓글 수정
     */
    @Transactional(rollbackFor = ResponeException.class)
    public TeamCommentDto updateTeamComment(TeamCommentDto teamCommentDto) {
        TeamComment teamComment = updateCommentToTeam(teamCommentDto);
        return teamCommentDto.of(teamCommentRepository.save(teamComment));
    }



    /**
     * team (대)댓글 삭제
     */
    @Transactional(rollbackFor = ResponeException.class)
    public void deleteTeamComment(UserDetailsImpl userDetails, Long commentId) {
        TeamComment teamComment = Optional.of(teamCommentRepository.getById(commentId)).orElseThrow(NullPointerException::new);
        if(teamComment.getWriter().equals(userDetails.getUserRealName()) || userDetails.getRole().equals(Role.ADMIN))
            teamCommentRepository.delete(teamComment);
        else throw new ResponeException(ResponseTemplateStatus.DELETE_COMMENT_FAILED);
    }


    /**
     * team 댓글 좋아요 등록
     */
    @Transactional
    public void doTeamCommentLiking(UserDetailsImpl userDetails, Long commentId) {
        TeamComment teamComment = teamCommentRepository.findById(commentId).orElseThrow(RuntimeException::new);
        User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(RuntimeException::new);

        TeamCommentLiking teamCommentLiking = TeamCommentLiking.builder()
                .id(IdGenerator.number())
                .teamComment(teamComment)
                .user(user)
                .build();

        teamCommentLikingRepository.save(teamCommentLiking);
    }

    /**
     * team 댓글 좋아요 취소
     */
    @Transactional
    public void cancelTeamCommentLiking(UserDetailsImpl userDetails, Long commentId) {
        try{
            User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(RuntimeException::new);
            TeamCommentLiking teamCommentLiking = teamCommentLikingRepository.findByUser_IdAndTeamComment_Id(user.getId(), commentId).orElseThrow(NullPointerException::new);

            teamCommentLikingRepository.delete(teamCommentLiking);
        }catch (NullPointerException e){
            throw new ResponeException(LIKING_COMMENT_FAILED);
        }
    }

    /**
     * 팀 게시물에서 댓글 리스트 조회
     */
    @Transactional(readOnly = true)
    public List<TeamCommentDto> getTeamComment(Long teamPostId) {
        List<TeamCommentDto> teamCommentDtos = teamCommentRepository.findAllByTeam_Id(teamPostId).stream()
                .map(TeamCommentDto::of)
                .collect(Collectors.toList());

        return teamCommentDtos;
    }


    private TeamComment updateCommentToTeam(TeamCommentDto teamCommentDto){
        try{
            TeamComment teamComment = teamCommentRepository.findById(teamCommentDto.getId()).orElseThrow(NullPointerException::new);
            if(teamCommentDto.getParentId() != teamComment.getParent().getId()) throw new RuntimeException();

            teamComment.setContent(teamCommentDto.getContent());
            if(teamCommentDto.getSecret() != teamComment.getSecret()) teamComment.setSecret(teamCommentDto.getSecret());
            return teamComment;
        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponeException(ResponseTemplateStatus.UPDATE_COMMENT_FAILED);
        }
    }


    private TeamComment addCommentToTeam(TeamCommentDto teamCommentDto){
        try{
            Team team = Optional.ofNullable(teamRepository.getById(teamCommentDto.getTeamId())).orElseThrow(NullPointerException::new);
            teamCommentDto.setId(IdGenerator.number());
            TeamComment teamComment = teamCommentDto.asEntity();
            teamComment.setTeam(team);
            return teamComment;
        }catch(NullPointerException e){
            e.printStackTrace();
            throw new ResponeException(ResponseTemplateStatus.ADD_COMMENT_FAILED);
        }
    }


}
