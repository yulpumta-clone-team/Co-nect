package com.projectmatching.app.domain.user.dto;

import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@AllArgsConstructor
public class UserProfileDto {

    @Builder.Default
    private Long id = IdGenerator.number();
    private String name;
    private String slogan;
    private String description;
    private String img;
    private String hopeSession;
    private List<String> skills;
    private String job;
    private String status; //현재 상태 (유저가 수동으로 변경, 상태가 Closed 일 경우 인력시장에서 사라짐)
    private String portfolio;


    private int commentCnt;
    private int likeCnt;


    public static UserProfileDto createEmpty(){return new UserProfileDto();}

    //entity를 dto로
    public static UserProfileDto of(User user){
        UserProfileDto userProfileDto = createEmpty();
        BeanUtils.copyProperties(user, userProfileDto);

        userProfileDto.commentCnt = user.getUserComments().size();
        userProfileDto.likeCnt = user.getUserLikings().size();


        return userProfileDto;
    }

    //dto를 entity로
    public User asEntity(){
        User user = new User();
        BeanUtils.copyProperties(this,user);
        return user;

    }

}
