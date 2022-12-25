package com.projectmatching.app.domain.user.dto;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.Validatable;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ServiceConstant.NAME_SIZE_MAX;


/**
 * 유저 필수 정보를 담은 dto;
 */
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@ToString
public class UserEssentialDto implements Validatable {

    private String name;
    private String slogan;
    private String image;
    private String content;//자기소개
    private String portfolio;
    private List<Integer> skills; //기술 스택 key 값만 받음
    private String hope_session; //원하는 작업기간
    private String job; //직업


    @Override
    public void validate() {
        if (name.length() > NAME_SIZE_MAX) {
            throw new ResponeException(ResponseTemplateStatus.NAME_SIZE_INVALID);
        }

    }

    // userDto로부터 Essential 정보만 추출
    public static UserEssentialDto extract(UserDto userDto) {
        UserEssentialDto userEssentialDto = new UserEssentialDto();
        userEssentialDto.name = userDto.getName();
        userEssentialDto.slogan = userDto.getSlogan();
        userEssentialDto.image = userDto.getImage();
        userEssentialDto.content = userDto.getContent();
        userEssentialDto.portfolio = userDto.getPortfolio();
        userEssentialDto.skills = userDto.getSkills()
                .stream().map(techStackDto -> techStackDto.getKey()).collect(Collectors.toList());
        userEssentialDto.hope_session = userDto.getHopeSession();
        userEssentialDto.job = userDto.getJob();
        return userEssentialDto;
    }
}
