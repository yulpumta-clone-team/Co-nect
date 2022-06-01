package com.projectmatching.app.service.history.Impl;

import com.projectmatching.app.domain.history.UserHisotryRepository;
import com.projectmatching.app.domain.history.entity.UserHistory;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.dto.UserProfileDto;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.history.UserHistoryService;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import com.projectmatching.app.util.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserHistoryServiceImpl implements UserHistoryService {
    private final UserRepository userRepository;
    private final UserHisotryRepository userHisotryRepository;


    @Override
    public Long savedUserHistory(UserDetailsImpl userDetails,Long visitedUserId) {
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
        UserHistory userHistory = UserHistory.builder()
                .id(IdGenerator.number())
                .visited(visitedUserId)
                .user(user)
                .build();
        return userHisotryRepository.save(userHistory).getId();
    }

    @Override
    public List<UserProfileDto> getUserHistory(UserDetailsImpl userDetails) {
        User user = userRepository.findByName(userDetails.getUserRealName()).orElseThrow(RuntimeException::new);
        List<UserHistory> userHistories = userHisotryRepository.findUserHistoryByUser(user);
        List<UserProfileDto> userProfileDtoList =  userHistories.stream().map(h-> userRepository.findById(h.getVisited()).orElseThrow(NullPointerException::new))
                .map(u->UserProfileDto.of(u)).collect(Collectors.toList());

        return userProfileDtoList;
    }
}
