package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.techStack.dto.TechStackDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTech;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class UserDto {

    private Long id;
    private String email;
    private String portfolio;
    private String slogan;
    private String content;//자기소개
    private String hopeSession; //원하는 작업기간
    private String job; //직업
    private String status;

    private String name;
    private String image;

    private int likeCnt;
    private int commentCnt;
    private int readCnt;

    @Builder.Default
    private List<TechStackDto> skills = new ArrayList<>();


    public static UserDto createEmpty() {
        return new UserDto();
    }

    //entity를 dto로
    public static UserDto of(User user) {
        UserDto userDto = createEmpty();
        userDto.id = user.getId();
        userDto.email = user.getEmail();
        userDto.portfolio = user.getPortfolio();
        userDto.slogan = user.getSlogan();
        userDto.content = user.getContent();
        userDto.hopeSession = user.getHopeSession();
        userDto.job = user.getJob();
        userDto.name = user.getName();
        userDto.image = user.getImage();
        userDto.status = user.getStatus();
        userDto.commentCnt = user.getUserComments().size();
        userDto.likeCnt = user.getRespected();
        userDto.skills = user.getSkills().stream().map(UserTech::toTechStack)
                .map(TechStackDto::of).collect(Collectors.toList());

        return userDto;
    }

    //dto를 entity로
    public User asEntity() {
        User user = new User();
        BeanUtils.copyProperties(this, user);
        return user;
    }
}
