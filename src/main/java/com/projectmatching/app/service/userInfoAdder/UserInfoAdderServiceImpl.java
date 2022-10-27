package com.projectmatching.app.service.userInfoAdder;

import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectNotFoundException;
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

    @Override
    public <T extends UserInfoDto> T userInfoAdder(T userInfoAppendableDto, String userName) {

        User user = userRepository.findByName(userName).orElseThrow(CoNectNotFoundException::new);

        userInfoAppendableDto.setUserInfoWith(user);

        return userInfoAppendableDto;

    }
}
