package com.projectmatching.app.domain.user.entity;

import com.projectmatching.app.domain.BaseTimeEntity;
import com.projectmatching.app.domain.comment.entity.UserComment;
import com.projectmatching.app.domain.history.entity.UserHistory;
import com.projectmatching.app.domain.liking.entity.UserCommentLiking;
import com.projectmatching.app.domain.liking.entity.UserLiking;
import com.projectmatching.app.domain.techStack.dto.TechStackDto;
import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.dto.UserEssentialDto;
import com.projectmatching.app.util.IdGenerator;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter @Setter
@Entity
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@Table(name="user")
public class User extends BaseTimeEntity {

    @Id
    private Long id;


    private String oauthId;

    @Enumerated(EnumType.STRING)
    private Role role;


    private String email;

    private String name;

    private String pwd;

    private String image;

    private String portfolio;

    private String slogan;

    @Column(columnDefinition = "TEXT")
    private String content;


    @Column(name = "hope_session")
    private String hopeSession;


    private String job;

    @Column(columnDefinition = "INT")
    private int respected;

    @Column(name = "read_cnt", columnDefinition = "BIGINT")
    private int readCnt;

    @Column(name = "team_exist", columnDefinition = "TINYINT")
    private boolean isTeamExist;
    /**
     * 내가 좋아요한 유저 목록
     */
    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private Set<UserLiking> userLikings = new HashSet<>();


    /**
     * 나를 좋아요한 유저 목록
     */
    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private Set<UserLiking> whoLikedMe = new HashSet<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @Builder.Default
    private Set<UserCommentLiking> userCommentLikings = new HashSet<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    private Set<UserComment> userComments = new HashSet<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @ToString.Exclude
    @Builder.Default
    private Set<UserTech> skills = new HashSet<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private Set<UserHistory> userHistories = new HashSet<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<UserTeam> userTeams = new HashSet<>();


    public User(String oauthId, String name, String email, Role role) {
        this.id = IdGenerator.number();
        this.oauthId = oauthId;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public String getRolekey() {
        return this.role.getKey();
    }


    public User update(String email) {
        this.email = email;
        return this;
    }


    public void updateEssentialInfo(UserEssentialDto userEssentialDto) {
        this.name = userEssentialDto.getName();
        this.slogan = userEssentialDto.getSlogan();
        this.job = userEssentialDto.getJob();
        this.image = userEssentialDto.getImage();
        this.content = userEssentialDto.getContent();
        this.portfolio = userEssentialDto.getPortfolio();
        this.hopeSession = userEssentialDto.getHope_session();
    }

    /**
     * plusCount 만큼 조회수 증가
     *
     * @Param plusCount : 증가할 조회수
     */
    public void updatingReadCnt(int plusCount) {
        this.readCnt += plusCount;

    }
}