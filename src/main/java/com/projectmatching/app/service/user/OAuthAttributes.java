package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.UserProfile;
import lombok.AllArgsConstructor;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

@AllArgsConstructor
public enum OAuthAttributes {

    GITHUB("github", (attributes) -> {
        return new UserProfile(
                String.valueOf(attributes.get("id")),
                (String) attributes.get("name"),
                (String) attributes.get("email")
        );
    }),
    GOOGLE("google", (attributes) -> {
        return new UserProfile(
                String.valueOf(attributes.get("sub")),
                (String) attributes.get("name"),
                (String) attributes.get("email")
        );
    });

    private final String registrationId;
    private final Function<Map<String,Object>, UserProfile> of; //유저 프로필 객체로 전환

    public static UserProfile extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())//enum 에서 values() 는 enum 안의 모든 값을 return 한다
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new) // 구글, 깃허브 가 아니면 예외 던짐
                .of.apply(attributes);
    }

}
