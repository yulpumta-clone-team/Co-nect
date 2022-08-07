package com.projectmatching.app.controller.user;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.domain.user.dto.PostUserProfileDto;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserEssentialDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.service.user.Impl.UserService;
import com.projectmatching.app.service.user.Impl.UserSignUpService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.projectmatching.app.constant.ResponseTemplateStatus.SUCCESS;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Api(tags = "유저 정보 입력 관련 컨트롤러")
public class UserEditController {

    private final UserService userService;
    private final UserSignUpService userSignUpService;


    /**
     * 유저 필수 정보 입력(essential_info)
     */
    @ApiOperation(value = "유저 필수정보 업데이트 ")
    @PostMapping("/essential_info")
    public ResponseTemplate<Void> updateEssential(@RequestBody UserEssentialDto userEssentialDto){
        userSignUpService.updateUserEssentialInfo(userEssentialDto);
        return ResponseTemplate.of(SUCCESS);
    }

    @ApiOperation(value = "유저 프로필을 띄우기 위한 최소 필수정보들을 조회")
    @GetMapping("/essential_info")
    public ResponseTemplate<UserInfo> getEssential(@AuthenticationPrincipal UserDetailsImpl userDetails){
        return ResponseTemplate.valueOf(userService.getUserEssentialInfo(userDetails));
    }


    /**
     * 유저 프로필 생성(유저 게시물 등록)
     */
    @ApiOperation(value = "유저 게시물 등록")
    @PostMapping("/myprofile")
    public ResponseTemplate<Void> addUserProfilePosting(@RequestBody PostUserProfileDto postUserProfileDto, @AuthenticationPrincipal UserDetailsImpl userDetails){
        userService.postingUserProfile(postUserProfileDto,userDetails);
        return ResponseTemplate.of(SUCCESS);
    }


    /**
     * 유저 프로필 수정(등록된 게시물 수정)
     */

    @ApiOperation(value = "유저 게시물 수정")
    @PatchMapping("/myprofile")
    public ResponseTemplate<UserDto> updateUserPosting(@RequestBody PostUserProfileDto postUserProfileDto, @AuthenticationPrincipal UserDetailsImpl userDetails){
        return ResponseTemplate.valueOf(userService.updateUserPosting(postUserProfileDto,userDetails));
    }


}