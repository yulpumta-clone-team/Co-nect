package com.projectmatching.app.domain.techStack.entity;

import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.user.entity.UserTech;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tech_stack")
public class TechStack {
    @Id
    private Long techStackId;

    @Column
    private String category;

    @Column
    private String name; //기술 이름



    @OneToMany(mappedBy = "techStack", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private Set<TeamTech> teamTechs = new HashSet<>();

    @OneToMany
    @JoinColumn(name = "user_tech")
    @ToString.Exclude
    @Builder.Default
    private Set<UserTech> userTeches = new HashSet<>();


}
