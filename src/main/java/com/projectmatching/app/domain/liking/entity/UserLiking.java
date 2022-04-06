package com.projectmatching.app.domain.liking.entity;


import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name="user_liking")
public class UserLiking extends BaseTimeEntity {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="from_id")
    @ToString.Exclude
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id")
    @ToString.Exclude
    private User toUser;


}
