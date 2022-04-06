package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.dto.PostUserProfileDto;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserService {
    //유저 상세 조회
    UserDto getUserDetail(Long id);
    //유저 카드 조회
    List<UserProfileDto> getUserList(PageRequest pageRequest);

    //유저 업데이트
    UserDto updateUser(UserDto userDto);

    //특정 유저 좋아요 누르기
    Long addLiking(UserDetailsImpl userDetails, long userId);


    //좋아요한 유저 목록 불러오기
    List<UserProfileDto> getLikedUserList(UserDetails userDetails);

    //유저 게시물 등록
    void postingUserProfile(PostUserProfileDto postUserProfileDto, UserDetailsImpl userDetails);
    //유저 게시물 수정
    UserDto updateUserPosting(PostUserProfileDto postUserProfileDto, UserDetailsImpl userDetails);


}
