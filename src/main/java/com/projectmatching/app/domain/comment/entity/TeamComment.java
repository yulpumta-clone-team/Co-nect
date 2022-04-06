package com.projectmatching.app.domain.comment.entity;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.liking.entity.TeamCommentLiking;
import com.projectmatching.app.domain.team.entity.Team;
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
@Table(name = "team_comment")
public class TeamComment extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_id")
    private TeamComment parent;

    private String writer;

    private Boolean secret;

    private String content;

    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="team_id")
    private Team team;


    @ToString.Exclude
    @OneToMany(mappedBy = "parent")
    @Builder.Default
    private Set<TeamComment> comments = new HashSet<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "teamComment", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<TeamCommentLiking> teamCommentLikings = new HashSet<>();

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
    public void addComment(TeamComment teamComment) {
        if (!isRoot()) { //하위 댓글에 또 댓글을 달 수 없음
            throw new ResponeException(ADD_COMMENT_FAILED);
        }
        this.comments.add(teamComment);
    }

    /**
     * 댓글을 삭제됨 상태로 처리 Dirty Checking
     */
    public void remove() {
        this.setStatus("REMOVED");
    }

}
