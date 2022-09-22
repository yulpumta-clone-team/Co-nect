package com.projectmatching.app.domain.techStack.entity;

import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.user.entity.UserTech;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

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
    private Long id;

    @Column(columnDefinition = "BIGINT",name = "`key`")
    private Integer key;

    private String category;

    private String techName; //기술 이름


    private String image;


    @OneToMany(mappedBy = "techStack", cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private Set<TeamTech> teamTechs = new HashSet<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private Set<UserTech> userTechs = new HashSet<>();




    public static TechStack of(TechCode techCode){
        TechStack techStack = new TechStack();
        BeanUtils.copyProperties(techCode,techStack);
        techStack.id = IdGenerator.number();
        techStack.key = techCode.getKeys();
        techStack.setId(IdGenerator.number());
        return techStack;

    }
}
