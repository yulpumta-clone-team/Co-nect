package com.projectmatching.app.service.comment;

import com.projectmatching.app.annotation.UserInfoContainedInReturnVal;
import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.dto.TeamCommentReqDto;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentReqDto;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.comment.repository.TeamCommentRepository;
import com.projectmatching.app.domain.comment.repository.UserCommentRepository;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.liking.repository.QTeamCommentLikingRepository;
import com.projectmatching.app.domain.liking.repository.QUserCommentLikingRepository;
import com.projectmatching.app.domain.liking.repository.TeamCommentLikingRepository;
import com.projectmatching.app.domain.liking.repository.UserCommentLikingRepository;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.exception.CoNectRuntimeException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.service.userInfoAdder.UserInfoAdderService;
import com.projectmatching.app.util.IdGenerator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ResponseTemplateStatus.*;
import static com.projectmatching.app.constant.ServiceConstant.ROOT_COMMENT;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {


    private final TeamCommentRepository teamCommentRepository;
    private final UserCommentRepository userCommentRepository;

    private final TeamRepository teamRepository;

    private final UserCommentLikingRepository userCommentLikingRepository;
    private final TeamCommentLikingRepository teamCommentLikingRepository;
    private final UserRepository userRepository;
    private final UserInfoAdderService userInfoAdderService;

    private final QTeamCommentLikingRepository qTeamCommentLikingRepository;
    private final QUserCommentLikingRepository qUserCommentLikingRepository;


    /**
     * 유저 프로필에 댓글 달기
     */
    @Transactional
    @UserInfoContainedInReturnVal
    public UserCommentDto addUserComment(UserCommentReqDto userCommentReqDto, UserDetailsImpl userDetails) {
        User beingCommentedUser = userRepository.findById(userCommentReqDto.getUserId()).orElseThrow(CoNectNotFoundException::new);
        UserComment userComment = userCommentReqDto.asEntity();
        userComment.setWriter(userDetails.getUserRealName()); //댓글 단 사람 입력

        return UserCommentDto.of(addCommentToUser(userComment,beingCommentedUser));

    }



    /**
     * 유저 프로필에 대댓글 달기
     * @param userCommentReqDto
     * @param userDetails
     * @return UserCommentDto : 작성 완료된 댓글
     */
    @Transactional
    @UserInfoContainedInReturnVal
    public UserCommentDto addUserNestedComment(UserCommentReqDto userCommentReqDto, UserDetailsImpl userDetails) {

        //부모 댓글 설정 안되어있으면 에러
        if(userCommentReqDto.getParentId() == null) throw new CoNectRuntimeException(ADD_NESTED_FAILED);

        UserComment userComment = createUserCommentValueOf(userCommentReqDto, userDetails);

        //댓글 달리는 대상 유저
        User beingCommentedUser = userRepository.findById(userCommentReqDto.getUserId()).orElseThrow(CoNectNotFoundException::new);
        userComment.setParent(userCommentRepository.findById(userCommentReqDto.getParentId()).orElseThrow(CoNectNotFoundException::new)); //부모 댓글 설정

        addCommentToUser(userComment, beingCommentedUser);

        return UserCommentDto.of(userCommentRepository.save(userComment));
    }



    /***
     *  유저 프로필에 달 댓글을 생성
     * @Param UserCommentReqDto  : 유저 댓글 생성 요청 dto
     * @Param UserDetails : 해당 댓글을 작성하는 작성자의 정보
     *
     * @Return : UserComment Entity
     */
    private UserComment createUserCommentValueOf(UserCommentReqDto userCommentReqDto, UserDetailsImpl userDetails) {
        UserComment userComment = userCommentReqDto.asEntity();
        userComment.setWriter(userDetails.getUserRealName());
        return userComment;
    }



    /**
     * 유저 (대)댓글 수정 서비스
     */
    @Transactional
    public UserCommentDto updateUserComment(UserCommentReqDto userCommentReqDto ,UserDetailsImpl userDetails,Long commentId) {
        UserComment userComment = userCommentRepository.findById(commentId).orElseThrow(CoNectNotFoundException::new);

        //댓글 작성자 본인이 아니라면 수정 불가
        if(userComment.isWriterSameWith(userDetails.getUserRealName()) == false)throw new CoNectRuntimeException(LOGICAL_ERROR,"본인의 댓글만 수정 가능합니다");

        return UserCommentDto.of(updateCommentToUser(userCommentReqDto,userComment));
    }


    /**
     *  유저 (대)댓글 삭제
     */

    @Transactional
    public void deleteUserComment(UserDetailsImpl userDetails, Long commentId) {

        UserComment userComment = Optional.of(userCommentRepository.getById(commentId)).orElseThrow(NullPointerException::new);
        //작성자와 삭제자 일치하거나 유저프로필이 본인 것이거나 관리자 일경우에만 삭제
        if(userComment.getWriter().equals(userDetails.getUserRealName())
                || userComment.getUser().getName().equals(userDetails.getUserRealName())
                || userDetails.getRole().equals(Role.ADMIN))
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
                .filter(dto->dto.getParentId() == null) //대댓글은 따로 조회하지 않음
                .map(dto->
                    userInfoAdderService.userInfoAdder(dto, dto.getWriter())
                ).map(dto->
                    userInfoAdderService.nestedUserInfoAdder(dto,dto.getWriter())
                )
                .collect(Collectors.toList());
        return userComments;
    }



    private void addUserInfo(UserCommentDto result,UserDetailsImpl userDetails) {
        userInfoAdderService.userInfoAdder(result, userDetails.getUserId());

    }


    /**
     * 유저 댓글 좋아요 하기
     */
    @Transactional
    public void doUserCommentLiking(UserDetailsImpl userDetails, Long commentId) {

        UserComment userComment = userCommentRepository.findById(commentId).orElseThrow(RuntimeException::new);
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);

        if(qUserCommentLikingRepository.isExistWithUserIdAndCommentId(user.getId(),userComment.getId())){
            throw new CoNectRuntimeException(LIKING_DUPLICATE_ERROR);
        }


        UserCommentLiking userCommentLiking = UserCommentLiking.builder()
                .id(IdGenerator.number())
                .userComment(userComment)
                .user(user)
                .build();

        userCommentLikingRepository.save(userCommentLiking);

    }


    /**
     * 유저 댓글 좋아요 취소
     * @param userDetails
     * @param commentId
     */
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

    private UserComment updateCommentToUser(UserCommentReqDto userCommentReqDto,UserComment userComment){

            //부모 댓글은 바뀌면 안됨
            if(isParentIdChanged(userCommentReqDto,userComment))
                throw new CoNectLogicalException();

            userComment.setContent(userCommentReqDto.getContent()); //댓글 수정
            userComment.setSecret(userCommentReqDto.getSecret()); //비밀 여부
            return userComment;


    }

    //true인 경우 비정상적인 상황, 부모 댓글 대상은 수정될 수 없음
    private boolean isParentIdChanged(UserCommentReqDto userCommentReqDto, UserComment userComment){

        //부모 댓글이 없는 경우
        if(userCommentReqDto.getParentId().equals(ROOT_COMMENT) && userComment.isRoot()) return false;

        //부모 댓글이 존재하고 해당 부모 댓글이 수정된 경우
        if(userComment.hasParent() && !userCommentReqDto.getParentId().equals(userComment.getParent().getId())) return true;

        else return false;
    }


    private UserComment addCommentToUser(UserComment userComment, User user) {
        userComment.setUser(user);
        userCommentRepository.save(userComment);
        return userComment;

    }


    /**
     * 팀 게시물 댓글 추가
     */
    @Transactional
    public TeamCommentDto addTeamComment(TeamCommentReqDto teamCommentReqDto, UserDetailsImpl userDetails) {

        Team beingCommentedTeam = teamRepository.findById(teamCommentReqDto.getTeamId()).orElseThrow(CoNectNotFoundException::new);
        TeamComment teamComment = teamCommentReqDto.asEntity();
        teamComment.setWriter(userDetails.getUserRealName());

        return TeamCommentDto.of(teamCommentRepository.save(addCommentToTeam(teamComment,beingCommentedTeam)));

    }


    /**
     * 팀 게시물 대댓글 추가
     * @param teamCommentReqDto
     * @param userDetails
     *
     * @Return teamCommentDto
     */

    @Transactional
    public TeamCommentDto addTeamNestedComment(TeamCommentReqDto teamCommentReqDto, UserDetailsImpl userDetails) {
        //부모 댓글 설정 안되어있으면 에러
        if(teamCommentReqDto.getParentId() == null) throw new CoNectRuntimeException(ADD_NESTED_FAILED);
        TeamComment teamComment = createTeamCommentValueOf(teamCommentReqDto,userDetails);

        Team beginCommentedTeam = teamRepository.findById(teamCommentReqDto.getTeamId()).orElseThrow(CoNectNotFoundException::new);
        teamComment.setParent(teamCommentRepository.findById(teamCommentReqDto.getParentId()).orElseThrow(CoNectNotFoundException::new));

        addCommentToTeam(teamComment,beginCommentedTeam);


        return TeamCommentDto.of(teamCommentRepository.save(teamComment));

    }

    private TeamComment addCommentToTeam(TeamComment teamComment, Team team){
        teamComment.setTeam(team);
        teamCommentRepository.save(teamComment);
        return teamComment;
    }

    private TeamComment createTeamCommentValueOf(TeamCommentReqDto teamCommentReqDto, UserDetailsImpl userDetails){
        TeamComment teamComment = teamCommentReqDto.asEntity();
        teamComment.setWriter(userDetails.getUserRealName());
        return teamComment;
    }

    /**
     * team (대)댓글 수정
     * @Param teamCommentReqDto 수정될 내용을 담은 dto
     * @Param commentId 수정할 댓글 id
     */
    @Transactional
    public TeamCommentDto updateTeamComment(TeamCommentReqDto teamCommentReqDto,UserDetailsImpl userDetails ,Long commentId) {
        TeamComment teamComment = teamCommentRepository.findById(commentId).orElseThrow(CoNectNotFoundException::new);

        //댓글 작성자 본인이 아니라면 수정 불가
        if(teamComment.isWriterSameWith(userDetails.getUserRealName()) == false)throw new CoNectRuntimeException(LOGICAL_ERROR,"본인의 댓글만 수정 가능합니다");

        return TeamCommentDto.of(updateCommentToTeam(teamCommentReqDto,teamComment));
    }



    private TeamComment updateCommentToTeam(TeamCommentReqDto teamCommentReqDto,TeamComment teamComment){

        if(isParentIdChanged(teamCommentReqDto,teamComment))
            throw new CoNectLogicalException();

        teamComment.setContent(teamCommentReqDto.getContent()); //댓글 수정
        teamComment.setSecret(teamCommentReqDto.getSecret()); //비밀 여부
        return teamComment;

    }


    //true인 경우 비정상적인 상황, 부모 댓글 대상은 수정될 수 없음
    private boolean isParentIdChanged(TeamCommentReqDto teamCommentReqDto, TeamComment teamComment){

        //부모 댓글이 없는 경우
        if(teamCommentReqDto.getParentId().equals(ROOT_COMMENT) && teamComment.isRoot()) return false;

        //부모 댓글이 존재하고 해당 부모 댓글이 수정된 경우
        if(teamComment.hasParent() && !teamCommentReqDto.getParentId().equals(teamComment.getParent().getId())) return true;

        else return false;
    }


    /**
     * team (대)댓글 삭제
     */
    @Transactional
    public void deleteTeamComment(UserDetailsImpl userDetails, Long commentId) {
        TeamComment teamComment = Optional.of(teamCommentRepository.getById(commentId)).orElseThrow(NullPointerException::new);

        if(teamComment.getWriter().equals(userDetails.getUserRealName())
                || isTeamOwner(userDetails,teamComment)
                || userDetails.getRole().equals(Role.ADMIN))
            teamCommentRepository.delete(teamComment);
        else throw new ResponeException(ResponseTemplateStatus.DELETE_COMMENT_FAILED);
    }

    public boolean isTeamOwner(UserDetailsImpl userDetails, TeamComment teamComment){
        if(userDetails.getUserId().equals(teamComment.getTeam().getOwnerId()))return true;
        else return false;
    }


    /**
     * team 댓글 좋아요 등록
     */
    @Transactional
    public void doTeamCommentLiking(UserDetailsImpl userDetails, Long commentId) {
        TeamComment teamComment = teamCommentRepository.findById(commentId).orElseThrow(RuntimeException::new);
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(RuntimeException::new);


        if(qTeamCommentLikingRepository.isExistWithUserIdAndCommentId(user.getId(),teamComment.getId())){
            throw new CoNectRuntimeException(LIKING_DUPLICATE_ERROR);
        }

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
            User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(CoNectNotFoundException::new);
            TeamCommentLiking teamCommentLiking = teamCommentLikingRepository.findByUserIdAndTeamCommentId(user.getId(), commentId)
                    .orElseThrow(CoNectNotFoundException::new);

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
                .filter(dto-> dto.getParentId() == null)
                .map(dto-> userInfoAdderService.userInfoAdder(dto,dto.getWriter()))
                .map(dto-> userInfoAdderService.nestedUserInfoAdder(dto,dto.getWriter()))
                .collect(Collectors.toList());

        return teamCommentDtos;
    }






}
