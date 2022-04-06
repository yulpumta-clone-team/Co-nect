package com.projectmatching.app.util;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public final class StreamUtil {

    public static <R, T> List<R> map(List<T> list, Function<T, R> function) {
        return list.stream()
                .map(function)
                .collect(Collectors.toList());
    }

    public static <R, T> List<R> map(Set<T> list, Function<T, R> function) {
        return list.stream()
                .map(function)
                .collect(Collectors.toList());
    }

    public static <R, T> List<R> map(Set<T> list, Predicate<? super T> predicate, Function<T, R> function) {
        return list.stream()
                .filter(predicate)
                .map(function)
                .collect(Collectors.toList());
    }

    /**
     * dto 에서 entity로 바꾸기 위해
     */
    public static <R,T> Set<R> mapToSet(List<T> list,Function<T,R> function){
        return list.stream()
                .map(function)
                .collect(Collectors.toSet());
    }

    public static <R, T> List<R> map(Set<T> list, Function<T, R> function, Comparator<? super R> comparator) {
        return list.stream()
                .map(function)
                .sorted(comparator)
                .collect(Collectors.toList());
    }

}
