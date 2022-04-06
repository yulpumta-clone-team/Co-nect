package com.projectmatching.app.service.team;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.comment.entity.TeamComment;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.liking.repository.TeamLikingRepository;
import com.projectmatching.app.domain.comment.dto.TeamCommentDto;
import com.projectmatching.app.domain.team.dto.TeamDetailResponseDto;
import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.dto.TeamResponseDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.team.repository.TeamTechRepository;
import com.projectmatching.app.domain.techStack.TechStackRepository;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.UserTeamRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTeam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.projectmatching.app.constant.ResponseTemplateStatus.*;


@RequiredArgsConstructor
@Service
@Transactional
public class TeamService {
    private final TeamRepository teamRepository;
    private final TechStackRepository techStackRepository;
    private final TeamTechRepository teamTechRepository;
    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;
    private final TeamLikingRepository teamLikingRepository;

    public Long save(TeamRequestDto requestDto, String email) throws ResponeException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));
        try {
            Team team = Team.builder()
                    .name(requestDto.getName())
                    .session(requestDto.getSession())
                    .img(requestDto.getImg())
                    .content(requestDto.getContent())
                    .read(0L)
                    .build();

            Long teamId = teamRepository.save(team).getId();

            List<String> techs = requestDto.getTechs();
            for (String t : techs){
                TechStack techStack = techStackRepository.findByName(t).orElseThrow(() -> new ResponeException(SAVE_TEAM_ERROR));
                TeamTech teamTech = TeamTech.builder()
                        .team(team)
                        .techStack(techStack)
                        .build();

                teamTechRepository.save(teamTech);
            }

            UserTeam userTeam = UserTeam.builder()
                    .user(user)
                    .team(team)
                    .build();

            userTeamRepository.save(userTeam);

            return teamId;

        }catch (Exception e){
            throw new ResponeException(SAVE_TEAM_ERROR);
        }
    }

    public List<TeamResponseDto> getTeams(PageRequest pageRequest) throws ResponeException {

        try {
            List<Team> teams = teamRepository.getTeams(pageRequest);
            List<TeamResponseDto> responseDtos = new ArrayList<>();

            for(Team team : teams){
                TeamResponseDto teamResponseDto = new TeamResponseDto();
                BeanUtils.copyProperties(team, teamResponseDto);
                teamResponseDto.setUserId(findTeamUser(team));
                teamResponseDto.setSkills(findTeamTech(team));
                teamResponseDto.setCommentCnt(team.getTeamComments().size());
                teamResponseDto.setLikeCnt(team.getTeamLikings().size());

                if(team.getStatus()=="NA") {
                    teamResponseDto.setStatus(Boolean.FALSE);
                } else{
                    teamResponseDto.setStatus(Boolean.TRUE);
                }

                responseDtos.add(teamResponseDto);
            }
            return responseDtos;

        }catch (Exception e){
            throw new ResponeException(GET_TEAMS_ERROR);
        }
    }

    public TeamDetailResponseDto getTeam(Long team_id) throws ResponeException {
        Team team = teamRepository.findById(team_id).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));
        try{
            TeamDetailResponseDto teamResponseDto = new TeamDetailResponseDto();
            BeanUtils.copyProperties(team, teamResponseDto);
            teamResponseDto.setUserId(findTeamUser(team));
            teamResponseDto.setSkills(findTeamTech(team));
            teamResponseDto.setTeamComments(findTeamComment(team));
            teamResponseDto.setCommentCnt(team.getTeamComments().size());
            teamResponseDto.setLikeCnt(team.getTeamLikings().size());

            if(team.getStatus()=="NA") {
                teamResponseDto.setStatus(Boolean.FALSE);
            } else{
                teamResponseDto.setStatus(Boolean.TRUE);
            }

            return teamResponseDto;
        }catch (Exception e){
            throw new ResponeException(GET_TEAM_ERROR);
        }
    }

    public Long findTeamUser(Team team){
        List<UserTeam> userTeamList = team.getUserTeams().stream().collect(Collectors.toList());
        if(userTeamList.size() != 0) {
            UserTeam findUser = userTeamList.get(0);
            return findUser.getUser().getId();
        }
        else return null;
    }

    public List<String> findTeamTech(Team team){
        Set<TeamTech> teamTechSet = team.getTeamTeches();
        List<String> findTeamTech = new ArrayList<>();
        for (TeamTech tech : teamTechSet){
            TechStack t = tech.getTechStack();
            if(t!=null) findTeamTech.add(t.getName());
        }
        return findTeamTech;
    }

    public List<TeamCommentDto> findTeamComment(Team team){
        List<TeamCommentDto> findComment = team.getTeamComments().stream().
                map(teamComment -> TeamCommentDto.of(teamComment)).collect(Collectors.toList());
        return findComment;
    }

    public void delete(Long team_id, String email) throws ResponeException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));
        Team team = teamRepository.findById(team_id).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));

        if(checkTeamUser(team, user)==false) throw new ResponeException(PERMISSION_DENIED);

        try{
            teamRepository.deleteTeam(team_id);
        }catch(Exception e){
            throw new ResponeException(DELETE_TEAM_ERROR);
        }
    }

    public void update(Long team_id, TeamRequestDto teamRequestDto, String email) throws ResponeException {
        Team team = teamRepository.findById(team_id).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));

        if(checkTeamUser(team, user)==false) throw new ResponeException(PERMISSION_DENIED);

        try {
            team.update(teamRequestDto);
            teamTechRepository.deleteAllByTeam_Id(team.getId());

            List<String> techs = teamRequestDto.getTechs();
            for (String t : techs) {
                TechStack techStack = techStackRepository.findByName(t).orElseThrow(() -> new ResponeException(SAVE_TEAM_ERROR));
                TeamTech teamTech = TeamTech.builder()
                        .team(team)
                        .techStack(techStack)
                        .build();

                teamTechRepository.save(teamTech);
            }
            teamRepository.save(team);
        }catch(Exception e){
            throw new ResponeException(UPDATE_TEAM_ERROR);
        }
    }

    public boolean checkTeamUser(Team team, User user){
        List<UserTeam> userTeamList = team.getUserTeams().stream().collect(Collectors.toList());
        boolean find = false;
        for(UserTeam userTeam : userTeamList){
            if(userTeam.getUser().getId() == user.getId()) find = true;
        }
        return find;
    }

    public Boolean teamLike(Long team_id, String email) throws ResponeException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));
        Team team = teamRepository.findById(team_id).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));
        try {
            Boolean check = teamLikingRepository.existsByUser_IdAndTeam_Id(user.getId(), team.getId());
            if (check == false) {
                TeamLiking teamLiking = TeamLiking.builder()
                        .user(user)
                        .team(team)
                        .build();
                teamLikingRepository.save(teamLiking);
                return true;
            } else {
                teamLikingRepository.deleteByUser_IdAndTeam_Id(user.getId(), team.getId());
                return false;
            }
        }catch(Exception e){
            throw new ResponeException(TEAM_LIKE_ERROR);
        }
    }
}
