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
    private Long id;

    @Column(columnDefinition = "BIGINT")
    private Integer keys;

    private String category;
    //기술 이름
    @Column(name = "tech_name")
    private String techName;

    private String image;








}
