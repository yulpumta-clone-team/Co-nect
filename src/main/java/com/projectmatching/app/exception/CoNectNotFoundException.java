package com.projectmatching.app.exception;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;


public class CoNectNotFoundException extends ResponeException {
    public CoNectNotFoundException(ResponseTemplateStatus status) {
        super(status);
    }
}
