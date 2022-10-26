package com.projectmatching.app.exception;

import com.projectmatching.app.constant.ResponseTemplateStatus;

public class CoNectLogicalException extends CoNectRuntimeException{

    public CoNectLogicalException(){
        super(ResponseTemplateStatus.LOGICAL_ERROR);
    }


    public CoNectLogicalException(ResponseTemplateStatus responseTemplateStatus){
        super(responseTemplateStatus);
    }



}
