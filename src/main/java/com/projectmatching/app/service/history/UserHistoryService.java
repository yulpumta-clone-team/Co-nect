package com.projectmatching.app.service.history;


import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserHistoryService {

    //유저 상세 카드 조회 이력 저장 서비스
    Long savedUserHistory(UserDetailsImpl userDetails,Long visitedUserId);

    //유저 상세 카드 조회 이력 열람 서비스
    List<UserProfileDto> getUserHistory(UserDetailsImpl userDetails);

}
