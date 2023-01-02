package com.projectmatching.app.config.handler;

import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.exception.CoNectLogicalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.projectmatching.app.constant.ServiceConstant.*;
import static com.projectmatching.app.util.InMemoryUtil.readCntMap;

@RequiredArgsConstructor
@Slf4j
@Component
public class UserReadCntUpdateHandler {
    private final UserRepository userRepository;


    /**
     *
     * 파라미터로 받은 유저 카드를 조회할때 해당 유저의 조회 정보를 따로 캐싱하여 저장함
     * @param user
     */
    @TransactionalEventListener
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateUserReadCnt(User user){
        AddUserReadCntInfoToMap(user); //유저 조회수 정보를 임시 저장함

        if(readCntMap.size() == MAX_USER_READ_CNT_SIZE){
            log.info("Updating User Read Cnt : Triggered by MAX_USER_READ_CNT_SIZE");
            for (Long aLong : readCntMap.keySet()) {
                //조회수 업데이트
                User forUpdatedUser = userRepository.findById(aLong).orElseThrow(CoNectLogicalException::new);
                forUpdatedUser.updatingReadCnt(readCntMap.get(aLong));
                userRepository.save(forUpdatedUser);

            }
            readCntMap.clear();
        }


    }

    private void AddUserReadCntInfoToMap(User user){
        readCntMap.compute(user.getId(),(key,val) -> (val == null) ? 1 : val + 1); //처음 조회된 유저라면 1로 삽입 , 아니라면  조회수 +1 해서 메모리에 임시 저장
    }
}
