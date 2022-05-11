package com.projectmatching.app.domain.user.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@Builder
public class UserInfo {

    private String name;
    private String id;
    private String img;

    public String getByField(String field){
        switch (field){
            case "name": {
                return this.getName();

            }
            case "id":{
                return this.getId();

            }
            case "img":{
                return this.getImg();
            }
        }
        return null;
    }

}
