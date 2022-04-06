package com.projectmatching.app.domain.liking.entity;

import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name="team_comment_liking")
public class TeamCommentLiking extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user")
    private User user;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="team_comment")
    private TeamComment teamComment;

}
