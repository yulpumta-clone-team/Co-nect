package com.projectmatching.app.service.user.Impl;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.liking.dto.UserLikingDto;
import com.projectmatching.app.domain.liking.repository.UserLikingRepository;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.PostUserProfileDto;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectRuntimeException;
import com.projectmatching.app.service.user.UserService;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {


    private final QUserRepository qUserRepository;
    private final UserRepository userRepository;
    private final UserLikingRepository userLikingRepository;
    private final UserDetails userDetails;


    //유저 상세 조회
    @Transactional(readOnly = true)
    @Override
    public UserDto getUserDetail(Long id){
        return UserDto.of(qUserRepository.find(id)
                .orElseThrow(CoNectRuntimeException::new)
        );

    }


    //유저 업데이트
    @Transactional
    @Override
    public UserDto updateUser(UserDto NewUserDto) {
        String userEmail = userDetails.getUsername();
        UserDto DBUser =  Optional.ofNullable(userRepository.findByEmail(userEmail))
              .map(u -> UserDto.of(u.get())).orElse(UserDto.createEmpty());
        BeanUtils.copyProperties(NewUserDto,DBUser);
       return UserDto.of(userRepository.save(DBUser.asEntity()));
    }

    //유저 게시물 조회
    @Transactional(readOnly = true)
    @Override
    public List<UserProfileDto> getUserList(PageRequest pageRequest){
        return qUserRepository.find(pageRequest)
                .stream().map(UserProfileDto::of)
                .collect(Collectors.toList());
    }



    //좋아요 누르기
    @Transactional
    @Override
    public Long addLiking(UserDetailsImpl userDetails, long userId){
        User from = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(RuntimeException::new);
        User to = userRepository.findById(userId).orElseThrow(RuntimeException::new);
        UserLikingDto userLikingDto = new UserLikingDto();
        return userLikingRepository.save(userLikingDto.asEntity(from,to)).getId();


    }


    //좋아요 한 유저 목록 불러오기
    @Transactional(readOnly = true)
    @Override
    public List<UserProfileDto> getLikedUserList(UserDetails userDetails) {
        return userLikingRepository.getLikedUserByUserEmail(userDetails.getUsername()).stream()
                .map(userLiking -> userLiking.getToUser()).map(user -> UserProfileDto.of(user)).collect(Collectors.toList());
    }


    //게시물 등록, 프로필 생성하기
    @Override
    @Transactional
    public void postingUserProfile(PostUserProfileDto postUserProfileDto, UserDetailsImpl userDetails) {
        //TODO 이부분 수정 필요, 현재 안쓰임
        UserProfileDto userProfileDto = UserProfileDto.builder()
                .name(userDetails.getUserRealName())
                .slogan(postUserProfileDto.getSlogan())
                .description(postUserProfileDto.getDescription())
                .img(postUserProfileDto.getImg())
                .hopeSession(postUserProfileDto.getHope_session())
                .skills(postUserProfileDto.getSkills())
                .job(postUserProfileDto.getJob())
                .build();

        if(userRepository.existsByName(userProfileDto.getName())) updateUserPosting(postUserProfileDto,userDetails);
        else userRepository.save(userProfileDto.asEntity());

    }

    //게시물 수정
    @Override
    @Transactional
    public UserDto updateUserPosting(PostUserProfileDto postUserProfileDto, UserDetailsImpl userDetails) {
        if(!userRepository.existsByName(userDetails.getUserRealName()))throw new ResponeException(LOGICAL_ERROR); //등록하지 않은것을 수정 불가
        else{
            User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
            BeanUtils.copyProperties(postUserProfileDto,user);
            return UserDto.of(user);
        }

    }





}
