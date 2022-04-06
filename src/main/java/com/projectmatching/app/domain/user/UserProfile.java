package com.projectmatching.app.domain.user;

import com.projectmatching.app.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
public class UserProfile {
    private final String oauthId;
    private final String name;
    private final String email;

    public User toUser() {
        return new User(oauthId, name, email, Role.USER);
    }


}
