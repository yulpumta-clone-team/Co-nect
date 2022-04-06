package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.dto.TeamResponseDto;
import com.projectmatching.app.domain.team.entity.QTeam;
import com.projectmatching.app.domain.team.entity.QTeamTech;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.projectmatching.app.domain.team.entity.QTeam.team;
import static com.projectmatching.app.domain.team.entity.QTeamTech.teamTech;
import static com.projectmatching.app.domain.user.entity.QUser.user;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

@Repository
@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepositoryCustom{

    private final JPAQueryFactory queryFactory;


    @Override
    public List<Team> getTeams(PageRequest pageRequest) {
        return queryFactory.selectFrom(team)
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(team.createdAt.desc())
                .fetch();
    }

    @Override
    public void deleteTeam(Long team_id) {
        queryFactory.update(team)
                .set(team.status, "NA")
                .where(
                        team.id.eq(team_id)
                ).execute();
    }
}
