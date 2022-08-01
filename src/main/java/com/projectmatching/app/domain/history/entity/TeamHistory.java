package com.projectmatching.app.domain.history.entity;

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
@Table(name="team_history")
public class TeamHistory {
    @Id
    @GeneratedValue
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user")
    private User user;


    //내가 조회한 팀의 아이디
    private Long visited;
}
