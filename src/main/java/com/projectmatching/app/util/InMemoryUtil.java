package com.projectmatching.app.util;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryUtil {
    static public Map<Long, Integer> readCntMap = new ConcurrentHashMap<>();

}
