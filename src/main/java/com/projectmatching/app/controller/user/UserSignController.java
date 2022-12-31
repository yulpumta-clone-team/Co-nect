package com.projectmatching.app.controller.user;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.domain.user.dto.UserIsFirstDto;
import com.projectmatching.app.domain.user.dto.UserJoinDto;
import com.projectmatching.app.domain.user.dto.UserLoginDto;
import com.projectmatching.app.service.user.Impl.UserService;
import com.projectmatching.app.service.user.Impl.UserSignInService;
import com.projectmatching.app.service.user.Impl.UserSignUpService;
import com.projectmatching.app.util.AuthToken;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import static com.projectmatching.app.constant.ResponseTemplateStatus.SUCCESS;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Api(tags = "유저 회원 관련 컨트롤러")
public class UserSignController {
    private final UserService userService;
    private final UserSignUpService userSignUpService;
    private final UserSignInService userSignInService;

    /**
     * 일반 회원가입
     * 가입 성공시 유저 id반환
     */
    @ApiOperation(value = "일반 회원가입, 성공시 유저 id 반환됨 ")
    @PostMapping("/join")
    public ResponseTemplate<Long> join(@RequestBody UserJoinDto userJoinDto) throws ResponeException {
        return ResponseTemplate.valueOf(userSignUpService.join(userJoinDto));
    }

    /**
     * 로그인
     */
    @ApiOperation(value = "일반 로그인, 성공시 유저 id 반환 및 헤더에 토큰 생성, 최초 로그인 여부가 isFirst 이름으로 전달됨")
    @PostMapping("/login")
    public ResponseEntity<ResponseTemplate<UserIsFirstDto>> login(@RequestBody UserLoginDto userLoginDto) {
        AuthToken authToken = userSignInService.userLogin(userLoginDto);
        return ResponseEntity.ok()
                .headers(HttpHeaders.readOnlyHttpHeaders(authToken.asHeaders()))
                .body(ResponseTemplate.valueOf(
                        userSignInService.isFirstLoginUserCheck(userLoginDto.getEmail())
                ));
    }


    /**
     * 회원탈퇴
     */
    @ApiOperation(value = "회원 탈퇴, 해당 유저의 Status 칼럼을 NA(Not Avaliable)로 바꿈")
    @DeleteMapping("/withdrawal")
    public ResponseTemplate<String> withDrawal(@AuthenticationPrincipal UserDetails userDetails) {
        userSignInService.userDelete(userDetails.getUsername());
        return ResponseTemplate.of(SUCCESS);

    }

    @ApiOperation(value = "회원 가입시 사용할 Email 중복여부 체크")
    @PatchMapping("/checkDuplicate/email")
    public ResponseTemplate<Boolean> checkDuplicateEmail(@RequestParam(name = "email") String email) {
        return ResponseTemplate.valueOf(userService.isDuplicateEmail(email));
    }

    @ApiOperation(value = "회원 가입시 사용할 NickName 중복여부 체크")
    @PatchMapping("/checkDuplicate/name")
    public ResponseTemplate<Boolean> checkDuplicateName(@RequestParam(name = "name") String name) {
        return ResponseTemplate.valueOf(userService.isDuplicateName(name));
    }
}
