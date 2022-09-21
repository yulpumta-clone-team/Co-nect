package com.projectmatching.app.service;

import com.projectmatching.app.DemoApplication;
import com.projectmatching.app.domain.user.UserRepository;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@ExtendWith(MockitoExtension.class)
public class ServiceTest {


    protected Integer techStackKeyGenerator(){
        Random random = new Random();
        return Integer.parseInt(IntStream.rangeClosed(1,9).
                mapToObj(i -> String.valueOf(random.nextInt(3)))
                .collect(Collectors.joining())); // 10자리 숫자 완성
    }
}
