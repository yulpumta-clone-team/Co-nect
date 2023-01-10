package com.projectmatching.app.controller.user;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.domain.common.Paging;
import com.projectmatching.app.domain.team.dto.TeamSimpleDto;
import com.projectmatching.app.domain.user.dto.*;

import com.projectmatching.app.service.user.Impl.UserService;
import com.projectmatching.app.service.user.Impl.UserSignInService;
import com.projectmatching.app.service.user.Impl.UserSignUpService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

import static com.projectmatching.app.constant.ResponseTemplateStatus.SUCCESS;
import static com.projectmatching.app.constant.ServiceConstant.PAGING_SIZE;

@RestController
@RequestMapping("/user")
@Slf4j
@RequiredArgsConstructor
@Api(tags = "유저 컨트롤러")
public class UserController {

    private final UserService userService;

    private final UserSignInService userSignInService;


    /**
     * 유저 카드(리스트) 조회
     */
    @ApiOperation(value = "유저 리스트(카드) 조회")
    @ApiImplicitParam(name = "lastPage", example = "1", required = true, value = "마지막 페이지 기준으로 10개씩 유저 리스트를 보내줌")
    @GetMapping
    public ResponseTemplate<List<UserProfileDto>> getUserList(@RequestParam(name = "lastPage") int lastPage) {
        Paging paging = new Paging(lastPage, PAGING_SIZE, Sort.by("updated_at").descending());
        return ResponseTemplate.valueOf(userService.getUserList(paging));
    }


    /**
     * 특정 유저 카드 조회
     */
    @ApiOperation(value = "특정 유저 상세 조회")
    @ApiImplicitParam(name = "id", example = "1", required = true, value = "유저 id")
    @GetMapping("/{id}")
    public ResponseTemplate<UserDto> getUserDetail(@PathVariable(name = "id") Long id) {
        return ResponseTemplate.valueOf(userService.getUserDetail(id));
    }

    /**
     * 유저 좋아요 누르기
     */
    @ApiOperation(value = "특정 유저프로필 좋아요 누르기")
    @PatchMapping("/liking/{user_id}")
    public ResponseTemplate<Void> addUserLiking(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable(name = "user_id") long userId) {
        userService.addLiking(userDetails, userId);
        return ResponseTemplate.of(SUCCESS);
    }


    /**
     * 좋아요한 유저 리스트
     */
    @ApiOperation(value = "좋아요 한 유저 리스트")
    @GetMapping("/liking")
    public ResponseTemplate<List<UserProfileDto>> getLikedUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseTemplate.valueOf(userService.getLikedUserList(userDetails));

    }


    /**
     * 내가 좋아요한 유저 목록
     */
    @ApiOperation(value = "내가 좋아요한 유저목록")
    @GetMapping("/favorite")
    public ResponseTemplate<List<UserProfileDto>> getMyFavoriteUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseTemplate.valueOf(userService.getUserLikingList(userDetails));


    }


    @ApiOperation(value = "내가 작성한 팀 게시물 목록")
    @GetMapping("/my-post")
    public ResponseTemplate<List<TeamSimpleDto>> getMyTeamList(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseTemplate.valueOf(userService.getMyTeamList(userDetails));
    }

}
