package com.projectmatching.app.domain.user.entity;


import com.projectmatching.app.domain.techStack.entity.TechStack;
import lombok.*;

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



}
