package com.projectmatching.app.service.userInfoAdder;


import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import org.springframework.stereotype.Service;

@Service
public interface UserInfoAdderService {

    <T extends UserInfoDto> T userInfoAdder(T userInfoAppendableDto, Long userId);

    <T extends UserInfoDto> T userInfoAdder(T userInfoAppendableDto, String userName);

    <T extends UserInfoDto> T nestedUserInfoAdder(T nestedUserInfoAppendableDto,String userName);


}
