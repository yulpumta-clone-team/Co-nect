package com.projectmatching.app.domain.user.dto;

import com.projectmatching.app.domain.techStack.dto.TechStackDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTech;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {

    @Builder.Default
    private Long id = IdGenerator.number();
    private String name;
    private String image;
    private List<TechStackDto> skills;
    private String job;
    private String status; //현재 상태 (유저가 수동으로 변경, 상태가 Closed 일 경우 인력시장에서 사라짐)


    private int readCnt;
    private int commentCnt;
    private int likeCnt;


    public static UserProfileDto createEmpty(){return new UserProfileDto();}

    //entity를 dto로
    public static UserProfileDto of(User user){
        UserProfileDto userProfileDto = createEmpty();
        BeanUtils.copyProperties(user, userProfileDto);
        userProfileDto.skills = user.getSkills().stream().map(UserTech::toTechStack)
                .map(TechStackDto::of).collect(Collectors.toList());

        userProfileDto.commentCnt = user.getUserComments().size();
        userProfileDto.likeCnt = user.getUserLikings().size();
        userProfileDto.readCnt = user.getReadCnt();

        return userProfileDto;
    }

    //dto를 entity로
    public User asEntity(){
        User user = new User();
        BeanUtils.copyProperties(this,user);
        return user;

    }

}
