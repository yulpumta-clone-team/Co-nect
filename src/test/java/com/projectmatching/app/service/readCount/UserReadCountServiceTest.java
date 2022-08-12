package com.projectmatching.app.service.readCount;


import com.projectmatching.app.service.ServiceTest;

import com.projectmatching.app.service.user.Impl.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.annotation.Rollback;


@SpringBootTest
public class UserReadCountServiceTest  extends ServiceTest {

    @Autowired
    private UserService userService;


    @DisplayName("Write-Back 구현 테스트")
    @Test
    @Rollback(value = false)
    void TESTING_WRITE_BACK_LOGIC(){

        userService.getUserDetail(26L);
        userService.getUserDetail(26L);
        userService.getUserDetail(31L);
        userService.getUserDetail(32L);
        userService.getUserDetail(30L);
    }


}
