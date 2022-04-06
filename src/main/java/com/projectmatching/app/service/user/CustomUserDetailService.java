package com.projectmatching.app.service.user;

import com.projectmatching.app.domain.user.entity.User;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.service.user.userdetail.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(( )-> new UsernameNotFoundException("해당 사용자 찾을 수 없습니다."));

        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole())
                .oauthId(user.getOauthId())
                .pwd(user.getPwd())
                .build();

        return userDetails;

    }



}
