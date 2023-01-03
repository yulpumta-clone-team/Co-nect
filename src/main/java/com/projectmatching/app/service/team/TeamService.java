package com.projectmatching.app.service.team;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.domain.liking.entity.TeamLiking;
import com.projectmatching.app.domain.liking.repository.TeamLikingRepository;
import com.projectmatching.app.domain.team.dto.TeamDto;
import com.projectmatching.app.domain.team.dto.TeamRequestDto;
import com.projectmatching.app.domain.team.dto.TeamSimpleDto;
import com.projectmatching.app.domain.team.entity.Team;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.team.repository.TeamTechRepository;
import com.projectmatching.app.domain.techStack.entity.TechStack;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.UserTeamRepository;
import com.projectmatching.app.domain.user.dto.UserInfo;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.entity.UserTeam;
import com.projectmatching.app.exception.CoNectLogicalException;
import com.projectmatching.app.exception.CoNectNotFoundException;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.projectmatching.app.constant.ResponseTemplateStatus.*;


@RequiredArgsConstructor
@Service
@Slf4j
public class TeamService {
    private final TeamRepository teamRepository;
    private final TechStackProviderImpl techStackProvider;
    private final TeamTechRepository teamTechRepository;
    private final UserRepository userRepository;
    private final TeamLikingRepository teamLikingRepository;


    //팀 게시글 저장
    @Transactional
    public void TeamSave(TeamRequestDto requestDto, UserDetailsImpl userDetails) throws ResponeException {
        User user = userRepository.findById(userDetails.getUserId()).orElseThrow(CoNectNotFoundException::new);
        Team team = Team.valueOf(requestDto, user);
        addTeamTechByTeamRequest(requestDto, team);
        teamRepository.save(team);
    }


    /**
     * teamRequestDto로 team에 스킬 추가
     *
     * @param teamRequestDto
     * @param team
     */
    private void addTeamTechByTeamRequest(TeamRequestDto teamRequestDto, Team team) {
        techStackProvider.extractTechCodeByKeys(teamRequestDto.getSkills())
                .stream()
                .map(TechStack::of)
                .map(techStack -> TeamTech.of(techStack, team))
                .forEach(teamTech -> teamTechRepository.save(teamTech));
    }

    //팀 게시글 조회`
    @Transactional(readOnly = true)
    public List<TeamSimpleDto> getTeamSimples(PageRequest pageRequest) throws ResponeException {
        return teamRepository.getTeams(pageRequest).stream()
                .map(team -> {
                    User user = userRepository.findById(team.getOwnerId()).orElseThrow(() -> new CoNectNotFoundException(NOT_EXIST_USER));
                    return TeamSimpleDto.valueOf(team, user);
                }).collect(Collectors.toList());

    }

    //팀 게시글 상세조회
    @Transactional(readOnly = true)
    public TeamDto getTeam(Long teamId) throws ResponeException {
        Team team = teamRepository.findById(teamId).orElseThrow(CoNectNotFoundException::new);
        User user = userRepository.findById(team.getOwnerId()).orElseThrow(CoNectNotFoundException::new);
        return TeamDto.valueOf(team, user);
    }


    //팀 게시글 삭제
    @Transactional
    public void delete(Long teamId, UserDetailsImpl userDetails) throws ResponeException {
        User user = userRepository.findById(userDetails.getUserId()).orElseThrow(() -> new CoNectNotFoundException(NOT_EXIST_USER));
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CoNectNotFoundException(NOT_EXIST_TEAM));

        if (isTeamOfUser(team, user) == false) throw new CoNectLogicalException(PERMISSION_DENIED);
        teamRepository.deleteTeam(teamId);

    }

    //팀 게시글 수정
    @Transactional
    public void update(Long teamId, TeamRequestDto teamRequestDto, UserDetailsImpl userDetails) throws ResponeException {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CoNectNotFoundException(NOT_EXIST_TEAM));
        User user = userRepository.findById(userDetails.getUserId()).orElseThrow(() -> new CoNectNotFoundException(NOT_EXIST_USER));

        if (isTeamOfUser(team, user) == false) throw new CoNectLogicalException(PERMISSION_DENIED);
        team.updateWith(teamRequestDto);

        //이미 있는것들 비우고 다시 넣음
        team.getTeamTeches().clear();
        addTeamTechByTeamRequest(teamRequestDto, team);

    }


    /**
     * 해당 팀 게시물이 해당 유저가 쓴것인지 체크
     *
     * @param team
     * @param user
     * @return Boolean
     */
    public boolean isTeamOfUser(Team team, User user) {
        if (team.getOwnerId().equals(user.getId())) return true;
        else return false;
    }


    //팀 좋아요 누르기
    public void doTeamLiking(UserDetailsImpl userDetails, Long teamId) throws ResponeException {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(CoNectNotFoundException::new);
        Team team = teamRepository.findById(teamId).orElseThrow(CoNectNotFoundException::new);

        TeamLiking teamLiking = TeamLiking.builder()
                .id(IdGenerator.number())
                .team(team)
                .user(user)
                .build();
        teamLikingRepository.save(teamLiking);

    }

    //팀 좋아요 취소
    public void cancelTeamLiking(UserDetailsImpl userDetails, Long teamId) throws ResponeException {

        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(CoNectNotFoundException::new);
        Team team = teamRepository.findById(teamId).orElseThrow(CoNectNotFoundException::new);
        TeamLiking teamLiking = teamLikingRepository.findByUser_IdAndTeam_Id(user.getId(), team.getId()).orElseThrow(CoNectNotFoundException::new);

        teamLikingRepository.delete(teamLiking);

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


    public UserInfo findTeamUser(com.projectmatching.app.domain.team.entity.Team team) {
        List<UserTeam> userTeamList = team.getUserTeams().stream().collect(Collectors.toList());
        if (userTeamList.size() != 0) {
            UserTeam findUser = userTeamList.get(0);
            return UserInfo.of(findUser.getUser());
        } else return null;
    }

    public List<String> findTeamTech(com.projectmatching.app.domain.team.entity.Team team) {
        Set<TeamTech> teamTechSet = team.getTeamTeches();
//        List<String> findTeamTech = new ArrayList<>();
//        for (TeamTech tech : teamTechSet){
//            TechStack t = tech.getTechStack();
//            if(t!=null) findTeamTech.add(t.getName());
//        }
        return null;
    }


}
