package com.projectmatching.app.domain.team.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.projectmatching.app.domain.team.entity.TeamTech;
import com.projectmatching.app.domain.techStack.dto.TechStackDto;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) //null 이면 생성되지 않음
public class TeamTechDto {

    private Long id;

    private TechStackDto techStack;


    public static TeamTechDto of(TeamTech teamTech){
        TeamTechDto teamTechDto = new TeamTechDto();
        teamTechDto.id = teamTech.getId();
        teamTechDto.setTechStack(TechStackDto.of(teamTech.getTechStack()));
        return teamTechDto;
    }

}
