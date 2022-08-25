package com.projectmatching.app.domain.user.entity;


import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name="user_tech")
public class UserTech {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tech_stack")
    private TechStack techStack;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user")
    private User user;


    public static TechStack of(TechCode techCode){
        TechStack techStack = new TechStack();
        BeanUtils.copyProperties(techCode,techStack);
        return techStack;

    }
    public static UserTech of(TechStack techStack, User user){
        UserTech userTech = new UserTech();
        System.out.println("techStack  !!!! "+techStack.getTechName());
        userTech.setTechStack(techStack);
        userTech.setUser(user);
        return userTech;
    }

}
