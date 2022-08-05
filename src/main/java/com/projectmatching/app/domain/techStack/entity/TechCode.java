package com.projectmatching.app.domain.techStack.entity;

import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.user.entity.UserTech;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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
    private String techName;





}
