package com.projectmatching.app.domain.techStack.entity;

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
public class TechCode {

    @Id
    @GeneratedValue
    private Long id;

    private int key;

    private String value;



}
