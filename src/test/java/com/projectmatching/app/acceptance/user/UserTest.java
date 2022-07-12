package com.projectmatching.app.acceptance.user;


import com.projectmatching.app.acceptance.AcceptanceTest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static io.restassured.RestAssured.*;

public class UserTest extends AcceptanceTest {


    @Test
    void getMemberList(){
        given().
                accept(MediaType.APPLICATION_JSON_VALUE).
        when().
                get("/user?lastPage=0").
                then().statusCode(200);
    }
}
