package com.projectmatching.app.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.liking.dto.UserCommentLikingDto;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.projectmatching.app.util.StreamUtil.mapToSet;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class UserCommentDto {


    @JsonIgnore
    private Long id = IdGenerator.number();

    private String writer;
    private Long userId; //댓글이 속한 글의 id(유저)
    private Long parentId;
    private Boolean secret;
    private String content;


    @Builder.Default
    private List<UserCommentDto> comments = new ArrayList<>();
    @Builder.Default
    private List<UserCommentLikingDto> feelings = new ArrayList<>();


    public static UserCommentDto createEmpty() { return new UserCommentDto();}

    //entity를 dto로
    public static UserCommentDto of(UserComment userComment){
        UserCommentDto userCommentDto = createEmpty();
        BeanUtils.copyProperties(userComment,userCommentDto);
        userCommentDto.userId = userComment.getUser().getId();
        userCommentDto.writer = userComment.getUser().getName();
        //부모가 있다면, 즉 대댓글이라면
        if(userComment.hasParent()){
            userCommentDto.parentId = userComment.getParent().getId();
        }
        if(userComment.hasChildren()){
            userCommentDto.comments = userComment.getComments()
                    .stream().map(UserCommentDto::of).collect(Collectors.toList());
        }

        userCommentDto.feelings = userComment.getUserCommentLikings()
                .stream().map(UserCommentLikingDto::of).collect(Collectors.toList()); //해당 댓글 좋아요한 유저들

        return userCommentDto;
    }

    //dto를 entity로
    public UserComment asEntity(){
        UserComment userComment = new UserComment();
        BeanUtils.copyProperties(this, userComment);
        userComment.setUserCommentLikings(mapToSet(this.feelings,UserCommentLikingDto::asEntity));

        return userComment;

    }

}
