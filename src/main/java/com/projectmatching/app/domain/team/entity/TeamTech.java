package com.projectmatching.app.domain.team.entity;

import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.entity.TechStack;

import com.projectmatching.app.domain.user.entity.UserTech;
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
@Table(name="team_tech")
public class TeamTech extends BaseTimeEntity {

    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="tech_id")
    private TechStack techStack;


    public static TeamTech valueOf(TechStack techStack, Team team){
        TeamTech teamTech = new TeamTech();
        teamTech.id = IdGenerator.number();
        teamTech.team = team;
        teamTech.techStack = techStack;

        return teamTech;
    }

    public static TeamTech of(TechStack techStack, Team team) {
        TeamTech teamTech = new TeamTech();
        teamTech.setTechStack(techStack);
        teamTech.setTeam(team);
        teamTech.setId(IdGenerator.number());
        return teamTech;
    }
}
