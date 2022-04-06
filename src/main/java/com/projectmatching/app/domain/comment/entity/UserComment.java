package com.projectmatching.app.domain.comment.entity;


import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static com.projectmatching.app.constant.ResponseTemplateStatus.ADD_COMMENT_FAILED;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Getter
@Setter
@ToString(callSuper = false)
@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name = "user_comment")
public class UserComment extends BaseTimeEntity {
    @Id
    private Long id;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_id")
    private UserComment parent;

    private String writer;

    //비밀글 여부
    private Boolean secret;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;


    //자식
    @ToString.Exclude
    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private Set<UserComment> comments = new HashSet<>();


    @OneToMany
    @JoinColumn(name="user_comment_liking")
    @ToString.Exclude
    @Builder.Default
    private Set<UserCommentLiking> userCommentLikings = new HashSet<>();


    /**
     * 최상위 댓글 여부 확인
     * @return 최상위 댓글인가 ?
     */
    public boolean isRoot() {
        return isNull(parent);
    }

    /**
     * 상위 댓글 존재 여부 확인
     * @return 상위 댓글이 존재하는가 ?
     */
    public boolean hasParent() {
        return nonNull(parent);
    }

    /**
     * 하위 댓글 존재 여부 확인
     * @return 하위 댓글이 존재하는가 ?
     */
    public boolean hasChildren() {
        return !comments.isEmpty();
    }

    /**
     * 하위 댓글 추가
     */
    public void addComment(UserComment userComment) {
        if (!isRoot()) { //하위 댓글에 또 댓글을 달 수 없음
            throw new ResponeException(ADD_COMMENT_FAILED);
        }
        this.comments.add(userComment);
    }

    /**
     * 댓글을 삭제됨 상태로 처리 Dirty Checking
     */
    public void remove() {
        this.setStatus("REMOVED");
    }


}
