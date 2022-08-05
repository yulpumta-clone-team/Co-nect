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
    @Column(name = "tech_stack_id")
    private Long id;

    @Column
    private String category;

    @Column
    private String name; //기술 이름

    @Column
    private Long key;


    @OneToMany(mappedBy = "techStack", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private Set<TeamTech> teamTechs = new HashSet<>();

    @OneToMany
    @JoinColumn(name = "user")
    @ToString.Exclude
    @Builder.Default
    private Set<UserTech> userTechs = new HashSet<>();


}
