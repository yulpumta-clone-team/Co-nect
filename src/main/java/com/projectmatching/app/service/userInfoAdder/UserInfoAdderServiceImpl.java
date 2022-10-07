package com.projectmatching.app.service.userInfoAdder;

import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoAdderServiceImpl implements UserInfoAdderService{

    private final UserRepository userRepository;

    @Override
    public <T extends UserInfoDto> T userInfoAdder(T userInfoAppendalbeDto, Long userId){
       User user = userRepository.findById(userId).orElseThrow(CoNectLogicalException::new);

       userInfoAppendalbeDto.setUserInfoWith(user);
       return userInfoAppendalbeDto;
    }

}
