package com.projectmatching.app.domain.team.Enum;


public enum TeamStatus {

    ACTIVE("active"),
    INACTIVE("inactive");

    TeamStatus(String statusName){
        this.statusName = statusName;

    }

    private final String statusName;


}
