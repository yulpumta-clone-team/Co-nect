import React, { useEffect, useState } from 'react';
import teamApi from 'api/team.api';
import userApi from 'api/user.api';
import Tabs from 'components/Common/Tabs';
import UserCard from 'components/UserCard';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import { emptyTrigger } from 'constant/service.constant';
import Divider from 'components/Common/Divider';
import * as S from './MyList.style';

export default function MyList() {
  const [postType, setPostType] = useState(LIKES_ID); // 좋아요 or 읽은 목록
  const [domainType, setDomainType] = useState(USER_ID); // 유저 or 팀

  const isUserList = domainType === USER_ID;
  const CardComponent = isUserList ? UserCard : TeamCard;
  const clickLink = isUserList ? ROUTE.USER : ROUTE.TEAM;
  const emtpyTriggerType = isUserList ? emptyTrigger.user : emptyTrigger.team;

  const onClickTab = (type, id) => {
    if (type === TAB_TYPE.domain) {
      setDomainType(id);
    } else {
      setPostType(id);
    }
  };

  return (
    <S.Container>
      <S.SessionContainer>
        <Tabs
          type={TAB_TYPE.domain}
          tabs={DOMAIN_TYPE_TABS}
          activeId={domainType}
          onClickTab={onClickTab}
        />
        <Divider />
        <Tabs
          type={TAB_TYPE.post}
          tabs={POST_TYPE_TABS}
          activeId={postType}
          onClickTab={onClickTab}
        />
      </S.SessionContainer>
      <WithInfiniteScroll
        key={`${domainType}-${postType}`} // 자식컴포넌트의 상태를 강제로 reset하기 위한 조치
        CardComponent={CardComponent}
        clickLink={clickLink}
        axiosInstance={fetcherObj[domainType][postType]}
        emptyTrigger={emtpyTriggerType}
      />
    </S.Container>
  );
}

const TAB_TYPE = {
  domain: 'domain',
  post: 'post',
};

const LIKES_ID = 'LIKE';
const READS_ID = 'READ';
const USER_ID = 'USER';
const TEAM_ID = 'TEAM';

const POST_TYPE_TABS = [
  { id: LIKES_ID, title: '내가 좋아요 한 글' },
  { id: READS_ID, title: '내가 읽은 글' },
];

const DOMAIN_TYPE_TABS = [
  { id: USER_ID, title: '유저' },
  { id: TEAM_ID, title: '팀' },
];
const fetcherObj = {
  [USER_ID]: {
    [LIKES_ID]: userApi.GET_USER_LIKES,
    [READS_ID]: userApi.GET_USER_READS,
  },
  [TEAM_ID]: {
    [LIKES_ID]: teamApi.GET_TEAM_LIKES,
    [READS_ID]: teamApi.GET_TEAM_READS,
  },
};

const INIT_FETCHER = fetcherObj[USER_ID][LIKES_ID];
