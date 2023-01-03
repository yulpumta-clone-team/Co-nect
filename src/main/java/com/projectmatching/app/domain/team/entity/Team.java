package com.projectmatching.app.domain.team.entity;

import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTeam;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter @Setter
@ToString
@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name="team")
public class Team extends BaseTimeEntity {

    @Id
    private Long id;

    @Column
    private String image;

    @Column
    private String slogan;

    @Column
    private String name;

    @Column
    private String session;

    @Column(name = "readCnt")
    private Long readCnt;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "owner_id")
    private Long ownerId;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    private Set<UserTeam> userTeams = new HashSet<>();

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    private Set<TeamComment> teamComments = new HashSet<>();


    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    private Set<TeamTech> teamTeches = new HashSet<>();


    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL,orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    private Set<TeamLiking> teamLikings = new HashSet<>();

    public void updateWith(TeamRequestDto teamRequestDto){
        this.image = teamRequestDto.getImage();
        this.name = teamRequestDto.getName();
        this.slogan = teamRequestDto.getSlogan();
        this.session = teamRequestDto.getSession();
        this.content = teamRequestDto.getContent();

    }

    public static Team valueOf(TeamRequestDto teamRequestDto, User user){
        Team team = new Team();
        team.userTeams.add(UserTeam.valueOf(user,team));
        team.ownerId = user.getId();
        team.id = IdGenerator.number();
        team.name = teamRequestDto.getName();
        team.content = teamRequestDto.getContent();
        team.image = teamRequestDto.getImage();
        team.slogan = teamRequestDto.getSlogan();
        team.session = teamRequestDto.getSession();
        return team;
    }



}
