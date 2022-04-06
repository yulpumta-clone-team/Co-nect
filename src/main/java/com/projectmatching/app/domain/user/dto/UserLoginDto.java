package com.projectmatching.app.domain.user.dto;

import com.projectmatching.app.config.resTemplate.ResponeException;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import com.projectmatching.app.domain.Validatable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import static com.projectmatching.app.constant.ServiceConstant.REGEX_EMAIL;

/**
 * Validate 검사 필요한 dto
 */
@Getter @Setter
@NoArgsConstructor
public class UserLoginDto implements Validatable {

    @Email
    private String email;

    @NotEmpty
    private  String pwd;


    //로그인 요청 형식 검증
    @Override
    public void validate() throws ResponeException {
         if(!REGEX_EMAIL.matcher(this.email).matches()){
             throw new ResponeException(ResponseTemplateStatus.EMAIL_FORM_INVALID);
         }

    }
}
