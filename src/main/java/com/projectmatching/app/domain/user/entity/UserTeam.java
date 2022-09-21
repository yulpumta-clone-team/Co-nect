package com.projectmatching.app.domain.user.entity;


import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name="user_team")
public class UserTeam extends BaseTimeEntity {

    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="team")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user")
    private User user;



    public static UserTeam valueOf(User user, Team team){
        UserTeam userTeam = new UserTeam();
        userTeam.id = IdGenerator.number();
        userTeam.team = team;
        userTeam.user = user;
        return userTeam;
    }

}
