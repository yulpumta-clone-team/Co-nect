package com.projectmatching.app.service.history.Impl;

import com.projectmatching.app.domain.history.TeamHistoryRepository;
import com.projectmatching.app.domain.history.entity.TeamHistory;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.history.TeamHistoryService;
import com.projectmatching.app.service.team.TeamService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamHistoryServiceImpl implements TeamHistoryService {

    private final UserRepository userRepository;
    private final TeamHistoryRepository teamHistoryRepository;
    private final TeamRepository teamRepository;
    private final TeamService teamService;

    @Override
    public Long savedTeamHistory(UserDetailsImpl userDetails, Long visitedTeamId) {
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
        TeamHistory teamHistory = TeamHistory.builder()
                .id(IdGenerator.number())
                .visited(visitedTeamId)
                .user(user)
                .build();

        return teamHistoryRepository.save(teamHistory).getId();
    }
//
//    @Override
//    public List<Team> getTeamHistory(UserDetailsImpl userDetails) {
//        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
//
//        List<TeamHistory> teamHistories = teamHistoryRepository.findTeamHistoriesByUser(user);
//        List<com.projectmatching.app.domain.team.entity.Team> teams = teamHistories.stream().map(h -> teamRepository.findById(h.getVisited()).orElseThrow(NullPointerException::new)).collect(Collectors.toList());
//        return teamService.entityToDtoList(teams);
//    }


    @Override
    public List<Team> getTeamHistory(UserDetailsImpl userDetails) {
        return null;
    }
}
