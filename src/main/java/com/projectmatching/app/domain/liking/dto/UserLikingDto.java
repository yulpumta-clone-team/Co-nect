package com.projectmatching.app.domain.liking.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.liking.entity.UserLiking;
import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserLikingDto {

    private Long id = IdGenerator.number();
    private UserDto fromUser;
    private UserDto toUser;



    //새로 추가하기 위해
    public UserLiking asEntity(User from , User to){
        UserLiking userLiking = new UserLiking();
        userLiking.setId(IdGenerator.number());
        to.setRespected(to.getRespected()+1);
        userLiking.setFromUser(from);
        userLiking.setToUser(to);

        return userLiking;
    }


    public UserLiking asEntity(){
        UserLiking userLiking = new UserLiking();
        userLiking.setFromUser(fromUser.asEntity());
        userLiking.setToUser(toUser.asEntity());
        return userLiking;
    }


    public static UserLikingDto of(UserLiking userLiking){
        UserLikingDto userLikingDto = new UserLikingDto();
        BeanUtils.copyProperties(userLiking,userLikingDto);
        userLikingDto.fromUser = UserDto.of(userLiking.getFromUser());
        userLikingDto.toUser = UserDto.of(userLiking.getToUser());
        return userLikingDto;

    }

}
