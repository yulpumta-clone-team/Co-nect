package com.projectmatching.app.service.comment;

import com.projectmatching.app.annotation.UserInfoContainedInReturnVal;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.constant.ServiceConstant;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.dto.TeamCommentReqDto;
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
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.service.userInfoAdder.UserInfoAdderService;
import com.projectmatching.app.util.IdGenerator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ResponseTemplateStatus.*;
import static com.projectmatching.app.constant.ServiceConstant.ROOT_COMMENT;

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
    private final UserInfoAdderService userInfoAdderService;
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

            User beingCommentedUser = userRepository.findById(userCommentReqDto.getUserId()).orElseThrow(CoNectNotFoundException::new);
            User subjectUser = userRepository.findById(userDetails.getUserId()).orElseThrow(CoNectNotFoundException::new);

            UserComment userComment = userCommentReqDto.asEntity();
            userComment.setWriter(subjectUser.getName());

            addCommentToUser(userComment, beingCommentedUser);

            userComment.setParent(userCommentRepository.findById(userCommentReqDto.getParentId()).orElseThrow(NullPointerException::new)); //부모 댓글 설정

            return UserCommentDto.of(userCommentRepository.save(userComment));

        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponeException(ADD_NESTED_FAILED);
        }


    }

    /**
     * (대)댓글 수정 서비스
     */
    @Transactional
    public UserCommentDto updateUserComment(UserCommentReqDto userCommentReqDto ,UserDetailsImpl userDetails,Long commentId) {

        return UserCommentDto.of(updateCommentToUser(userCommentReqDto,commentId));
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
                .map(dto->{
                    User writer = userRepository.findByName(dto.getWriter()).orElseThrow(CoNectLogicalException::new);
                    userInfoAdderService.userInfoAdder(dto, writer.getId());
                    return dto;
                    }
                )
                .collect(Collectors.toList());
        return userComments;
    }



    private void addUserInfo(UserCommentDto result,UserDetailsImpl userDetails) {
        userInfoAdderService.userInfoAdder(result, userDetails.getUserId());

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

    private UserComment updateCommentToUser(UserCommentReqDto userCommentReqDto,Long commentId){

            UserComment userComment = userCommentRepository.findById(commentId).orElseThrow(CoNectNotFoundException::new);
            //부모 댓글이 바뀌면 안됨
            if(isParentIdChanged(userCommentReqDto,userComment))
                throw new CoNectLogicalException();

            userComment.setContent(userComment.getContent()); //댓글 수정
            if(userCommentReqDto.getSecret().equals(true)) userComment.setSecret(userCommentReqDto.getSecret()); //비밀댓글 여부 바뀌었다면
            return userComment;


    }

    private boolean isParentIdChanged(UserCommentReqDto userCommentReqDto, UserComment userComment){

        //부모 댓글인 경우에 대한 처리
        if(userCommentReqDto.getParentId() == ROOT_COMMENT && userComment.getParent()==null)return false;

        if(userCommentReqDto.getParentId() != userComment.getParent().getId())return true;
        else return false;
    }


    private UserComment addCommentToUser(UserComment userComment, User user) {
        userComment.setUser(user);
        userCommentRepository.save(userComment);
        return userComment;

    }


    /**
     * team (대)댓글 추가
     */
    @Transactional
    public TeamCommentDto addTeamComment(TeamCommentReqDto teamCommentDto) {
        TeamComment teamComment = addCommentToTeam(teamCommentDto);
        if(teamCommentDto.getParentId()!=null){
            teamComment.setParent(teamCommentRepository.findById(teamCommentDto.getParentId()).orElseThrow(NullPointerException::new));
        }
        return TeamCommentDto.of(teamCommentRepository.save(teamComment));

    }



    /**
     * team (대)댓글 수정
     * @Param teamCommentReqDto 수정될 내용을 담은 dto
     * @Param commentId 수정할 댓글 id
     */
    @Transactional
    public TeamCommentDto updateTeamComment(TeamCommentReqDto teamCommentReqDto,Long commentId) {
        TeamComment teamComment = updateCommentToTeam(teamCommentReqDto,commentId);
        return TeamCommentDto.of(teamCommentRepository.save(teamComment));
    }



    /**
     * team (대)댓글 삭제
     */
    @Transactional
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


    private TeamComment updateCommentToTeam(TeamCommentReqDto teamCommentReqDto,Long commentId){
        try{
            TeamComment teamComment = teamCommentRepository.findById(commentId).orElseThrow(NullPointerException::new);
            if(teamCommentReqDto.getParentId() != teamComment.getParent().getId()) throw new RuntimeException();

            teamComment.setContent(teamCommentReqDto.getContent());
            if(teamCommentReqDto.getSecret() != teamComment.getSecret()) teamComment.setSecret(teamCommentReqDto.getSecret());
            return teamComment;
        }catch (RuntimeException e){
            e.printStackTrace();
            throw new ResponeException(ResponseTemplateStatus.UPDATE_COMMENT_FAILED);
        }
    }


    private TeamComment addCommentToTeam(TeamCommentReqDto teamCommentDto){
        try{
            Team team = Optional.ofNullable(teamRepository.getById(teamCommentDto.getTeamId())).orElseThrow(NullPointerException::new);
            TeamComment teamComment = teamCommentDto.asEntity();
            teamComment.setTeam(team);
            return teamComment;
        }catch(NullPointerException e){
            e.printStackTrace();
            throw new ResponeException(ResponseTemplateStatus.ADD_COMMENT_FAILED);
        }
    }


}
