//package com.projectmatching.app.domain.team.dto;
//
//import com.projectmatching.app.domain.user.dto.UserInfo;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//import org.springframework.beans.BeanUtils;
//
//import java.util.List;
//
//@Getter
//@Setter
//@RequiredArgsConstructor
//@AllArgsConstructor
//public class Team {
//
//    private Long id;
//    private UserInfo user;
//    private String session;
//    private List<String> skills;
//
//    private String status;
//    private Long readCnt;
//    private int commentCnt;
//    private int likeCnt;
//
//
//
//    public static Team createEmpty(){return new Team();}
//
//    //entity를 dto로
//    public static Team of(com.projectmatching.app.domain.team.entity.Team team){
//        Team teamResponseDto = createEmpty();
//        BeanUtils.copyProperties(team, teamResponseDto);
//
//        teamResponseDto.commentCnt = team.getTeamComments().size();
//        teamResponseDto.likeCnt = team.getTeamLikings().size();
//
//
//        return teamResponseDto;
//    }
//
//    //dto를 entity로
//    public com.projectmatching.app.domain.team.entity.Team asEntity(){
//        com.projectmatching.app.domain.team.entity.Team team = new com.projectmatching.app.domain.team.entity.Team();
//        BeanUtils.copyProperties(this,team);
//        return team;
//    }
//}
