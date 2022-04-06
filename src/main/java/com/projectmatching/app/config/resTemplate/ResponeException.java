package com.projectmatching.app.config.resTemplate;

import com.projectmatching.app.constant.ResponseTemplateStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponeException extends RuntimeException{
    private ResponseTemplateStatus responseTemplateStatus;

}
