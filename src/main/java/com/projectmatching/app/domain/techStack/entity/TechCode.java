package com.projectmatching.app.domain.techStack.entity;

import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTech;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tech_code")
public class TechCode extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    private int key;

    private String category;

    private String image;

    //기술 이름
    @Column(name = "tech_name")
    private String techName;



    public static TechStack toTechStackEntity(TechCode techCode){
        TechStack techStack = new TechStack();
        BeanUtils.copyProperties(techCode,techStack);
        return techStack;

    }
    public static UserTech toUserTechWithAddedUser(TechCode techCode, User user){
        UserTech userTech = new UserTech();
        userTech.setTechStack(toTechStackEntity(techCode));
        userTech.setUser(user);
        userTech.setId(IdGenerator.number());
        return userTech;
    }


}
