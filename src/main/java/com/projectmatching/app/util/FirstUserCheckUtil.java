package com.projectmatching.app.util;

import com.projectmatching.app.domain.user.dto.UserDto;
import com.projectmatching.app.domain.user.dto.UserEssentialDto;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;

@Slf4j
public final class FirstUserCheckUtil {

    /**
     *
     * UserDto로부터 추출한 UserEssentialInfo를 기준으로
     * first login user check
     * @Param UserDto
     * @return 최초 로그인 유저인지
     */
    public static boolean isFirstLoginUser(UserDto userDto) throws IllegalAccessException {
        UserEssentialDto userEssentialDto = UserEssentialDto.extract(userDto);
        if(isEssentialPropertyNull(userEssentialDto))return true;
        else return false;
    }

    /** reflection으로 property null check
     * */
    private static boolean isEssentialPropertyNull(UserEssentialDto userEssentialDto) throws IllegalAccessException {
        for (Field f : userEssentialDto.getClass().getDeclaredFields()) {
            f.setAccessible(true);
            if (f.get(userEssentialDto) == null) return true;
        }
        return false;
    }
}
