package com.projectmatching.app.controller;

import com.projectmatching.app.config.resTemplate.ResponseTemplate;
import com.projectmatching.app.constant.ResponseTemplateStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
//
//@Controller
//@RequestMapping(value = "/error")
//@RequiredArgsConstructor
//@ApiIgnore
//public class ErrorControllerImpl implements ErrorController {
//
//    private final HttpServletResponse response;
//
//    @RequestMapping
//    public ResponseEntity<ResponseTemplate<Void>> handle(){
//        HttpStatus httpStatus = HttpStatus.valueOf(response.getStatus());
//        return ResponseEntity
//                .status(httpStatus)
//                .body(ResponseTemplate.error(ResponseTemplateStatus.LOGICAL_ERROR));
//    }
//
//
//}
