package com.projectmatching.app.domain.team.repository;

import com.projectmatching.app.domain.team.entity.Team;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.projectmatching.app.domain.team.entity.QTeam.team;

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
    public void deleteTeam(Long teamId) {
        queryFactory.update(team)
                .set(team.status, "removed")
                .where(
                        team.id.eq(teamId)
                ).execute();
    }
}
