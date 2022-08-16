package com.projectmatching.app.domain.cache;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReadCnt {

    private Long id; //유저 및 팀 id
    private Integer count; //조회수 카운팅
}
