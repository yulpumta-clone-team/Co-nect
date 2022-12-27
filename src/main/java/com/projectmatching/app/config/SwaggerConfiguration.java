package com.projectmatching.app.config;

import com.google.common.collect.Lists;
import com.projectmatching.app.constant.JwtConstant;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .pathMapping("/")
                .securitySchemes(Arrays.asList(createTokenParameter(),createRefreshTokenParameter()))
                .securityContexts(Collections.singletonList(securityContext()))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.projectmatching.app.controller"))
                .paths(PathSelectors.ant("/**"))
                .build()
                .ignoredParameterTypes(AuthenticationPrincipal.class)
                .apiInfo(new ApiInfoBuilder()
                        .title("Co-nect API")
                        .version("v2")
                        .build());
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Lists.newArrayList(
                new SecurityReference(JwtConstant.HEADER_NAME, authorizationScopes)
        ,       new SecurityReference(JwtConstant.REFRESH_TOKEN_HEADER_NAME,authorizationScopes));
    }

    private SecurityScheme createTokenParameter() {
        return new ApiKey(JwtConstant.HEADER_NAME, JwtConstant.HEADER_NAME, "header");
    }

    private SecurityScheme createRefreshTokenParameter() {
        return new ApiKey(JwtConstant.REFRESH_TOKEN_HEADER_NAME, JwtConstant.REFRESH_TOKEN_HEADER_NAME, "header");
    }

}
