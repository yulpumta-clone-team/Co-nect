package com.projectmatching.app.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.dto.UserCommentDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.List;

import static com.projectmatching.app.util.StreamUtil.map;


@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class UserDto {

    @Builder.Default
    private Long id = IdGenerator.number();

    private String oauthId;
    private String email;
    private String name;
    private String portfolio;
    private String slogan;
    private String img;
    private String content;//자기소개

    private String hopeSession; //원하는 작업기간
    private String job; //직업
    private String status;
    private int likeCnt;
    private int commentCnt;

    private List<String> skills;


    public static UserDto createEmpty() { return new UserDto();}

    //entity를 dto로
    public static UserDto of(User user){
        UserDto userDto = createEmpty();
        BeanUtils.copyProperties(user, userDto);
        userDto.commentCnt = user.getUserComments().size();
        userDto.likeCnt = user.getRespected();

//        userDto.skills =  map(user.getSkills(),)

        return userDto;
    }

    //dto를 entity로
    public User asEntity(){
        User user = new User();
        BeanUtils.copyProperties(this,user);
        return user;
    }


}
