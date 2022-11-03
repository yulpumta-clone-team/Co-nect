package com.projectmatching.app.domain.comment.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.liking.dto.UserCommentLikingDto;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.dto.UserInfoDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.util.IdGenerator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.beans.BeanUtils;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import java.time.LocalDateTime;
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
@ApiModel
public class UserCommentDto extends UserInfoDto {

    @Builder.Default
    private Long id = IdGenerator.number();

    @ApiModelProperty(value = "해당 댓글이 속한 유저 게시물의 id")
    @JsonIgnore
    private Long userId; //댓글이 속한 글의 id(유저)

    @JsonIgnore
    private String writer;

    @ApiModelProperty(value = "해당 댓글이 속한 댓글 id, 즉 부모 아이디가 없으면 일반 댓글, 있으면 대댓글")
    private Long parentId;

    @ApiModelProperty(value = "댓글 비밀 여부")
    private Boolean secret;

    @ApiModelProperty(value = "댓글 내용")
    private String content;


    //대댓글
    @ApiModelProperty(value = "대댓글")
    @Builder.Default
    private List<UserCommentDto> replies = new ArrayList<>();

    @ApiModelProperty(value = "해당 댓글 좋아요한 유저 정보")
    @Builder.Default
    private List<UserCommentLikingDto> feelings = new ArrayList<>();


    @ApiModelProperty(value = "최종 업데이트 시간")
    private LocalDateTime updatedAt;


    public static UserCommentDto createEmpty() { return new UserCommentDto();}

    //entity를 dto로
    public static UserCommentDto of(UserComment userComment){
        UserCommentDto userCommentDto = createEmpty();
        BeanUtils.copyProperties(userComment,userCommentDto);
        userCommentDto.userId = userComment.getUser().getId();

        //부모가 있다면, 즉 대댓글이라면
        if(userComment.hasParent()){
            userCommentDto.parentId = userComment.getParent().getId();
        }
        if(userComment.hasChildren()){
            userCommentDto.replies = userComment.getComments()
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
