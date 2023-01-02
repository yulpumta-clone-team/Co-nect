package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.domain.liking.dto.UserLikingDto;
import com.projectmatching.app.domain.liking.entity.UserLiking;
import com.projectmatching.app.domain.liking.repository.UserLikingRepository;
import com.projectmatching.app.domain.team.dto.TeamSimpleDto;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.projectmatching.app.domain.user.dto.UserInfo.of;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService  {


    private final QUserRepository qUserRepository;
    private final UserRepository userRepository;
    private final UserLikingRepository userLikingRepository;
    private final UserDetails userDetails;
    private final TeamRepository teamRepository;

    private final ApplicationEventPublisher applicationEventPublisher;

    /**
     * 사용자의
     * id
     * name
     * image
     * 들을 반환
     */
    @Transactional(readOnly = true)
    public UserInfo getUserEssentialInfo(UserDetailsImpl userDetails){
        log.info("userEmail {}",userDetails.getEmail());
        User user = userRepository.findByEmail(userDetails.getEmail())
                .orElseThrow(CoNectNotFoundException::new);
        return UserInfo.of(user);

    }


    //유저 상세 조회
    @Transactional(readOnly = true)
    public UserDto getUserDetail(Long id){
        User user = qUserRepository.find(id).orElseThrow(CoNectNotFoundException::new);
        applicationEventPublisher.publishEvent(user); //조회수 증가
        return UserDto.of(user);

    }



    //유저 게시물 조회
    @Transactional(readOnly = true)
    public List<UserProfileDto> getUserList(PageRequest pageRequest){
        return qUserRepository.find(pageRequest)
                .stream().map(UserProfileDto::of)
                .collect(Collectors.toList());
    }



    //좋아요 누르기
    @Transactional
    public Long addLiking(UserDetailsImpl userDetails, long userId){
        User from = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(RuntimeException::new);
        User to = userRepository.findById(userId).orElseThrow(RuntimeException::new);
        UserLikingDto userLikingDto = new UserLikingDto();
        return userLikingRepository.save(userLikingDto.asEntity(from,to)).getId();


    }


    //좋아요 한 유저 목록 불러오기
    @Transactional(readOnly = true)
    public List<UserProfileDto> getLikedUserList(UserDetails userDetails) {
        return userLikingRepository.getLikedUserByUserEmail(userDetails.getUsername()).stream()
                .map(userLiking -> userLiking.getToUser()).map(user -> UserProfileDto.of(user)).collect(Collectors.toList());
    }




    // 내가 좋아요한 유저 목록 가져오기
    @Transactional(readOnly = true)
    public List<UserProfileDto> getUserLikingList(UserDetailsImpl userDetails) {
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(CoNectNotFoundException::new);
        List<UserLiking> userLikings = userLikingRepository.findUserLikingByFromUser(user);

        return userLikings.stream().map(u-> u.getToUser()).map(UserProfileDto::of).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public List<TeamSimpleDto> getMyTeamList(UserDetailsImpl userDetails) {
        User user = userRepository.findById(userDetails.getUserId()).orElseThrow(CoNectNotFoundException::new);
        List<TeamSimpleDto> myTeamList = teamRepository.findTeamByOwnerId(user.getId()).stream().map(t->{
            return TeamSimpleDto.valueOf(t,user);
        }).collect(Collectors.toList());

        return myTeamList;


    }



    @Transactional(readOnly = true)
    public Boolean isDuplicateEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public Boolean isDuplicateName(String name) {
        return userRepository.existsByName(name);
    }


}
