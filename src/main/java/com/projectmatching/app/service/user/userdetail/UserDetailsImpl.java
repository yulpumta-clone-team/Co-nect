package com.projectmatching.app.service.user.userdetail;

import com.projectmatching.app.domain.user.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@Builder
@Configuration
//시큐리티에서는 UserDetails를 이용해 유저정보를 관리함
public class UserDetailsImpl implements UserDetails {

    private Long id;
    private String oauthId;
    private Role role;
    private String email;
    private String name;
    private String pwd;



    public UserDetailsImpl(Long id, String oauthId, Role role, String email, String name, String pwd) {
        this.id = id;
        this.oauthId = oauthId;
        this.role = role;
        this.email = email;
        this.name = name;
        this.pwd = pwd;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.pwd;
    }

    @Override
    public String getUsername() { //유저 이메일
        return this.email;
    }

    public String getUserEmail(){
        return this.email;
    } //유저 이메일
    public String getUserRealName(){
        return this.name;
    } //유저 닉네임

    public Long getUserId(){return this.id;}



    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
