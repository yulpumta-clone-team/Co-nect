package com.projectmatching.app;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.projectmatching.app.constant.TechStackConstant;
import com.projectmatching.app.constant.bean.TechStackCodeBean;
import com.projectmatching.app.domain.cache.CacheType;
import com.projectmatching.app.domain.cache.readCount.ReadCount;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

//teset
@EnableJpaAuditing
@EnableSwagger2
@EnableCaching
@SpringBootApplication
public class DemoApplication {


    static private ReadCount readCount;
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);


    }



}
