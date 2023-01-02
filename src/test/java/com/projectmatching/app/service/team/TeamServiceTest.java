package com.projectmatching.app.service.team;

import com.projectmatching.app.domain.team.repository.TeamRepository;
import com.projectmatching.app.domain.techStack.provider.TechStackProviderImpl;
import com.projectmatching.app.domain.user.UserRepository;
import com.projectmatching.app.service.ServiceTest;
import org.mockito.InjectMocks;
import org.mockito.Mock;


public class TeamServiceTest extends ServiceTest {

    @InjectMocks
    protected TeamService teamService;

    @Mock
    protected UserRepository userRepository;

    @Mock
    protected TeamRepository teamRepository;

    @Mock
    protected  TechStackProviderImpl techStackProvider;


}
