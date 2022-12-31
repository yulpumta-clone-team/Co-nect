package com.projectmatching.app.domain.user.entity;


import com.projectmatching.app.domain.techStack.entity.TechCode;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.util.IdGenerator;
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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="tech_stack")
    private TechStack techStack;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="user")
    private User user;


    public static UserTech of(TechStack techStack, User user){
        UserTech userTech = new UserTech();
        userTech.setTechStack(techStack);
        userTech.setUser(user);
        userTech.setId(IdGenerator.number());
        return userTech;
    }

    public static TechStack toTechStack(UserTech userTech){
        return userTech.getTechStack();
    }


}
