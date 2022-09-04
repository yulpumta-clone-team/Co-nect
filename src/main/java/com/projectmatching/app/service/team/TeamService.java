package com.projectmatching.app.service.team;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.liking.repository.TeamLikingRepository;
import com.projectmatching.app.domain.team.dto.TeamDetailResponseDto;
import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.team.repository.TeamTechRepository;
import com.projectmatching.app.domain.techStack.TechStackRepository;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.techStack.provider.TechStackProvider;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.UserTeamRepository;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTeam;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ResponseTemplateStatus.*;
import static org.springframework.beans.BeanUtils.copyProperties;


@RequiredArgsConstructor
@Service
@Transactional
public class TeamService {
    private final TeamRepository teamRepository;
    private final TechStackProvider techStackProvider;
    private final TeamTechRepository teamTechRepository;
    private final UserRepository userRepository;
    private final UserTeamRepository userTeamRepository;
    private final TeamLikingRepository teamLikingRepository;
    private final TechStackRepository techStackRepository;

    //팀 게시글 저장
    public void TeamSave(TeamRequestDto requestDto, UserDetailsImpl userDetails) throws ResponeException {
        User user = userRepository.findById(userDetails.getUserId()).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));
        Team team = Team.valueOf(requestDto,user);
        addTeamTechByTeamRequest(requestDto,team);
        teamRepository.save(team);

    }

    private void addTeamTechByTeamRequest(TeamRequestDto teamRequestDto, Team team){
        techStackProvider.extractTechCodeByKeys(teamRequestDto.getSkills())
                .stream()
                .map(techCode -> TechStack.of(techCode))
                .map(techStack ->{
                            return TeamTech.of(techStack,team);
                        }
                ).forEach(teamTech -> team.getTeamTeches().add(teamTech));
    }


    //팀 게시글 조회
    public List<Team> getTeams(PageRequest pageRequest) throws ResponeException {

        List<Team> teams = teamRepository.getTeams(pageRequest);
        return teams;

    }

    //팀 게시글 상세조회
    public TeamDetailResponseDto getTeam(Long teamId) throws ResponeException {
        com.projectmatching.app.domain.team.entity.Team team = teamRepository.findById(teamId).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));
        try{
            TeamDetailResponseDto teamDetailResponseDto = new TeamDetailResponseDto();
            copyProperties(team, teamDetailResponseDto);
            teamDetailResponseDto.setUser(findTeamUser(team));
//            teamDetailResponseDto.setSkills(findTeamTech(team));
            teamDetailResponseDto.setCommentCnt(team.getTeamComments().size());
            teamDetailResponseDto.setLikeCnt(team.getTeamLikings().size());


            return teamDetailResponseDto;
        }catch (Exception e){
            throw new ResponeException(GET_TEAM_ERROR);
        }
    }


    //팀 게시글 삭제
    public void delete(Long teamId, String email) throws ResponeException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));
        com.projectmatching.app.domain.team.entity.Team team = teamRepository.findById(teamId).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));

        if(checkTeamUser(team, user)==false) throw new ResponeException(PERMISSION_DENIED);

        try{
            teamRepository.deleteTeam(teamId);
        }catch(Exception e){
            throw new ResponeException(DELETE_TEAM_ERROR);
        }
    }

    //팀 게시글 수정
    public void update(Long teamId, TeamRequestDto teamRequestDto, String email) throws ResponeException {
        com.projectmatching.app.domain.team.entity.Team team = teamRepository.findById(teamId).orElseThrow(() -> new ResponeException(NOT_EXIST_TEAM));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponeException(NOT_EXIST_USER));

        if(checkTeamUser(team, user)==false) throw new ResponeException(PERMISSION_DENIED);

        try {
            team.update(teamRequestDto);
            teamTechRepository.deleteAllByTeam_Id(team.getId());

//            List<Long> techs = teamRequestDto.getSkills();
//            for (Long t : techs) {
//                TechStack techStack = techStackRepository.findById(t).orElseThrow(() -> new ResponeException(SAVE_TEAM_ERROR));
//                TeamTech teamTech = TeamTech.builder()
//                        .team(team)
//                        .techStack(techStack)
//                        .build();
//
//                teamTechRepository.save(teamTech);
//            }
            teamRepository.save(team);
        }catch(Exception e){
            throw new ResponeException(UPDATE_TEAM_ERROR);
        }
    }

    //팀 좋아요 누르기
    public void doTeamLiking(UserDetailsImpl userDetails, Long teamId) throws ResponeException {
        try {
            User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(RuntimeException::new);
            com.projectmatching.app.domain.team.entity.Team team = teamRepository.findById(teamId).orElseThrow(RuntimeException::new);

            TeamLiking teamLiking = TeamLiking.builder()
                    .id(IdGenerator.number())
                    .team(team)
                    .user(user)
                    .build();
            teamLikingRepository.save(teamLiking);

        }catch (NullPointerException e){
            throw new ResponeException(TEAM_LIKE_ERROR);
        }
    }

    //팀 좋아요 취소
    public void cancelTeamLiking(UserDetailsImpl userDetails, Long teamId) throws ResponeException{
        try{
            User user = userRepository.findByEmail(userDetails.getEmail()).orElseThrow(RuntimeException::new);
            com.projectmatching.app.domain.team.entity.Team team = teamRepository.findById(teamId).orElseThrow(RuntimeException::new);
            TeamLiking teamLiking = teamLikingRepository.findByUser_IdAndTeam_Id(user.getId(), team.getId()).orElseThrow(NullPointerException::new);

            teamLikingRepository.delete(teamLiking);
        }catch (NullPointerException e){
            throw new ResponeException(LIKING_COMMENT_FAILED);
        }
    }

//    //좋아요한 팀 게시글 목록 조회
//    public List<Team> getTeamLikingList(UserDetailsImpl userDetails){
//        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
//
//        List<TeamLiking> teamLikings = teamLikingRepository.findTeamLikingByUser_Id(user.getId());
//        List<com.projectmatching.app.domain.team.entity.Team> teams = teamLikings.stream().map(t -> teamRepository.findById(t.getTeam().getId()).orElseThrow(RuntimeException::new)).collect(Collectors.toList());
//
//        return entityToDtoList(teams);
//    }
//
//    public List<Team> entityToDtoList(List<com.projectmatching.app.domain.team.entity.Team> teams){
//        List<Team> responseDto = new ArrayList<>();
//
//        for(com.projectmatching.app.domain.team.entity.Team team : teams){
//            Team teamResponseDto = new Team();
//            copyProperties(team, teamResponseDto);
//            teamResponseDto.setUser(findTeamUser(team));
//            teamResponseDto.setSkills(findTeamTech(team));
//            teamResponseDto.setCommentCnt(team.getTeamComments().size());
//            teamResponseDto.setLikeCnt(team.getTeamLikings().size());
//            responseDto.add(teamResponseDto);
//        }
//        return responseDto;
//    }


    public UserInfo findTeamUser(com.projectmatching.app.domain.team.entity.Team team){
        List<UserTeam> userTeamList = team.getUserTeams().stream().collect(Collectors.toList());
        if(userTeamList.size() != 0) {
            UserTeam findUser = userTeamList.get(0);
            return UserInfo.of(findUser.getUser());
        }
        else return null;
    }

    public List<String> findTeamTech(com.projectmatching.app.domain.team.entity.Team team){
        Set<TeamTech> teamTechSet = team.getTeamTeches();
//        List<String> findTeamTech = new ArrayList<>();
//        for (TeamTech tech : teamTechSet){
//            TechStack t = tech.getTechStack();
//            if(t!=null) findTeamTech.add(t.getName());
//        }
        return null;
    }



    public boolean checkTeamUser(com.projectmatching.app.domain.team.entity.Team team, User user){
        List<UserTeam> userTeamList = team.getUserTeams().stream().collect(Collectors.toList());
        boolean find = false;
        for(UserTeam userTeam : userTeamList){
            if(userTeam.getUser().getId() == user.getId()) find = true;
        }
        return find;
    }
}
