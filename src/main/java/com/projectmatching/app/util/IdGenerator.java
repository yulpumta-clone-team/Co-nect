package com.projectmatching.app.util;

import java.io.Closeable;
import java.io.IOException;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * 랜덤 id 생성용
 */
public final class IdGenerator {
    private static final Random random;
    private static final int DEFAULT_SIZE = 10;


    //클래스 초기화 블럭
    static {
        random = new Random();
    }

    public static long number(int size){
        return Long.parseLong(IntStream.range(0, size)
                .mapToObj(i -> String.valueOf(random.nextInt(size)))
                .collect(Collectors.joining())); // 10자리 숫자 완성
    }

    public static long number(){return number(DEFAULT_SIZE);}

}
