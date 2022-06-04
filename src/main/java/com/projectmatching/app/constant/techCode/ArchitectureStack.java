package com.projectmatching.app.constant.techCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ArchitectureStack {

    GIT(500,"git"),
    DOCKER(501,"docker"),
    KUBERNETES(502,"kubernetes"),
    AWS(503,"aws"),
    JEST(504,"jest"),
    CYPRESS(505,"cypress");

    private final int key;
    private final String value;
}
