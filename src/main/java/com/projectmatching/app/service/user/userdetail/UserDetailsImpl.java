package com.projectmatching.app.service.user.userdetail;

import com.projectmatching.app.domain.user.Role;
import com.projectmatching.app.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

    public UserDetailsImpl(User user){

        this.id = user.getId();
        this.oauthId = user.getOauthId();
        this.role = user.getRole();
        this.email = user.getEmail();
        this.name = user.getName();
        this.pwd = user.getPwd();

    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

        list.add(new SimpleGrantedAuthority(this.role.toString()));

        return list;
    }

    @Override
    public String getPassword() {
        return this.pwd;
    }

    @Override
    public String getUsername() { //유저 이메일
        return this.email;
    }

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
