package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.liking.dto.UserLikingDto;
import com.projectmatching.app.domain.liking.entity.UserLiking;
import com.projectmatching.app.domain.liking.repository.UserLikingRepository;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.PostUserProfileDto;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ResponseTemplateStatus.LOGICAL_ERROR;
import static com.projectmatching.app.domain.user.dto.UserInfo.toUserInfoByUser;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService  {


    private final QUserRepository qUserRepository;
    private final UserRepository userRepository;
    private final UserLikingRepository userLikingRepository;
    private final UserDetails userDetails;


    /**
     * 사용자의
     * id
     * name
     * image
     * 들을 반환
     */
    @Transactional(readOnly = true)
    public UserInfo getUserEssentialInfo(UserDetailsImpl userDetails){
        User user = userRepository.findByEmail(userDetails.getEmail())
                .orElseThrow(CoNectNotFoundException::new);
        return toUserInfoByUser(user);

    }


    //유저 상세 조회
    @Transactional(readOnly = true)
    public UserDto getUserDetail(Long id){
        return UserDto.of(qUserRepository.find(id)
                .orElseThrow(CoNectNotFoundException::new)
        );

    }


    //유저 업데이트
    @Transactional
    public UserDto updateUser(UserDto NewUserDto) {
        String userEmail = userDetails.getUsername();
        UserDto DBUser =  Optional.ofNullable(userRepository.findByEmail(userEmail))
              .map(u -> UserDto.of(u.get())).orElse(UserDto.createEmpty());
        BeanUtils.copyProperties(NewUserDto,DBUser);
       return UserDto.of(userRepository.save(DBUser.asEntity()));
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


    //게시물 등록, 프로필 생성하기
    @Transactional
    public void postingUserProfile(PostUserProfileDto postUserProfileDto, UserDetailsImpl userDetails) {
        //TODO 이부분 수정 필요, 현재 안쓰임
        UserProfileDto userProfileDto = UserProfileDto.builder()
                .name(userDetails.getUserRealName())
                .image(postUserProfileDto.getImg())
                .skills(postUserProfileDto.getSkills())
                .job(postUserProfileDto.getJob())
                .build();

        if(userRepository.existsByName(userProfileDto.getName())) updateUserPosting(postUserProfileDto,userDetails);
        else userRepository.save(userProfileDto.asEntity());

    }

    //게시물 수정
    @Transactional
    public UserDto updateUserPosting(PostUserProfileDto postUserProfileDto, UserDetailsImpl userDetails) {
        if(!userRepository.existsByName(userDetails.getUserRealName()))throw new ResponeException(LOGICAL_ERROR); //등록하지 않은것을 수정 불가
        else{
            User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
            BeanUtils.copyProperties(postUserProfileDto,user);
            return UserDto.of(user);
        }

    }


    // 내가 좋아요한 유저 목록 가져오기
    @Transactional(readOnly = true)
    public List<UserProfileDto> getUserLikingList(UserDetailsImpl userDetails) {
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
        List<UserLiking> userLikings = userLikingRepository.findUserLikingByFromUser(user);

        return userLikings.stream().map(u-> u.getToUser()).map(UserProfileDto::of).collect(Collectors.toList());
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
