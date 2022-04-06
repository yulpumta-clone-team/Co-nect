package com.projectmatching.app.domain.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
@Setter
public class Paging extends PageRequest {
    public Paging(int page, int offset, Sort sort) {
        super(page, offset, sort);
    }

    public Paging(int page, int offset) {
        super(page, offset, Sort.unsorted());
    }



}
