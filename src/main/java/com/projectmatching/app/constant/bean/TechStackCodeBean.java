package com.projectmatching.app.constant.bean;

import com.projectmatching.app.domain.techStack.TechCodeRepository;
import com.projectmatching.app.domain.techStack.entity.TechCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class TechStackCodeBean implements InitializingBean{

    private final TechCodeRepository techCodeRepository;

    private List<TechCode> techCodeList;


    @Override
    public void afterPropertiesSet() throws Exception {
        this.techCodeList = techCodeRepository.find();
    }


    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
