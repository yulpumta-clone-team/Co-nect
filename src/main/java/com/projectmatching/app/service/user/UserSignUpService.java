package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.dto.UserJoinDto;


public interface UserSignUpService {

    Long join(UserJoinDto userJoinDto);

}
