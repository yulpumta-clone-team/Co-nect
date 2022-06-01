package com.projectmatching.app.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectmatching.app.DemoApplication;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@SpringBootTest(classes = DemoApplication.class)
@AutoConfigureMockMvc
public abstract class ControllerTest {
    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setUp() {
        mockMvc = webAppContextSetup(webApplicationContext).addFilter(((request, response, chain) -> {
            request.setCharacterEncoding("utf-8");
            response.setCharacterEncoding("utf-8");
            chain.doFilter(request, response);
        })).build();
    }
}
