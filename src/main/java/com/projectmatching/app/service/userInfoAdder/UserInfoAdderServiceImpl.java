package com.projectmatching.app.service.userInfoAdder;

import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.constant.ServiceConstant;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.exception.CoNectRuntimeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserInfoAdderServiceImpl implements UserInfoAdderService {

    private final UserRepository userRepository;

    @Override
    public <T extends UserInfoDto> T userInfoAdder(T userInfoAppendalbeDto, Long userId) {
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

    //대댓글에도 UserInfo 추가하기 위한 메소드
    @Override
    public <T extends UserInfoDto> T nestedUserInfoAdder(T nestedUserInfoAppendableDto, String userName) {


        //유저 대댓글에 userInfo추가
        if (nestedUserInfoAppendableDto instanceof UserCommentDto) {
            UserCommentDto userCommentDto = (UserCommentDto) nestedUserInfoAppendableDto;
            userCommentDto.getReplies().forEach(
                    dto -> {
                        User user = userRepository.findByName(userName).orElseThrow(CoNectNotFoundException::new);
                        dto.setUserInfoWith(user);
                    }
            );

            return nestedUserInfoAppendableDto;
        }
        //팀 대댓글에 userInfo 추가
        else if (nestedUserInfoAppendableDto instanceof TeamCommentDto) {
            TeamCommentDto teamCommentDto = (TeamCommentDto) nestedUserInfoAppendableDto;
            teamCommentDto.getReplies().forEach(
                    dto -> {
                        User user = userRepository.findByName(userName).orElseThrow(CoNectNotFoundException::new);
                        dto.setUserInfoWith(user);
                    }
            );

            return nestedUserInfoAppendableDto;
        } else throw new CoNectRuntimeException(ResponseTemplateStatus.ADD_NESTED_FAILED, "대댓글이 존재할 수 없는 dto 입니다.");


    }
}
