package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.dto.UserLoginDto;
import com.projectmatching.app.domain.user.dto.UserLoginResDto;

import javax.servlet.http.HttpServletResponse;


public interface UserSignInService {

    UserLoginResDto userLogin(UserLoginDto userLoginDto, HttpServletResponse response);

    void userDelete(String userEamil);


}
