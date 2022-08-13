package com.projectmatching.app.service.readCount;


import com.projectmatching.app.config.handler.UserReadCntUpdateHandler;
import com.projectmatching.app.constant.ServiceConstant;
import com.projectmatching.app.domain.user.QUserRepository;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.service.ServiceTest;

import com.projectmatching.app.service.user.Impl.UserService;
import com.projectmatching.app.util.IdGenerator;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.annotation.Commit;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;

import static com.projectmatching.app.util.InMemoryUtil.readCntMap;
import static org.mockito.Mockito.*;


@SpringBootTest
public class UserReadCountServiceTest  extends ServiceTest {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserReadCntUpdateHandler userReadCntUpdateHandler;


    @DisplayName("유저 조회수 카운팅 로직 성공 테스트")
    @Test
    @Transactional//롤백되도록
    void GIVEN_USER_THEN_COUNTING_LOGIC_EXECUTE_TEST(){

        User user = User.builder()
                .id(1L)
                .email("123@naver.com")
                .pwd("1245u12uf!@#kjdfidfiadf")
                .build();

        userRepository.save(user);


        userReadCntUpdateHandler.updateUserReadCnt(user);

        //인메모리에 유저 조회수 정보 들어갔는지 확인
        Assertions.assertEquals(1,readCntMap.size());


    }




    private User GenUser(){
        User user = User.builder()
                .id(IdGenerator.number())
                .email("123@naver.com")
                .pwd("1245u12uf!@#kjdfidfiadf")
                .build();
        return user;
    }
}
