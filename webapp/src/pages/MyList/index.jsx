import React, { useState } from 'react';
import teamApi from 'api/team.api';
import userApi from 'api/user.api';
import Tabs from 'components/Common/Tabs';
import UserCard from 'components/UserCard';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import { emptyTrigger } from 'constant/service.constant';
import Divider from 'components/Common/Divider';
import { DOMAIN_TYPE, POST_TYPE } from 'constant';
import * as S from './MyList.style';

export default function MyList() {
  const [postType, setPostType] = useState(POST_TYPE.LIKE); // 좋아요 or 읽은 목록
  const [domainType, setDomainType] = useState(DOMAIN_TYPE.USER); // 유저 or 팀

  const isUserList = domainType === DOMAIN_TYPE.USER;
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
    <>
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
      <S.Container>
        <WithInfiniteScroll
          key={`${domainType}-${postType}`} // 자식컴포넌트의 상태를 강제로 reset하기 위한 조치
          CardComponent={CardComponent}
          clickLink={`${clickLink}/`}
          axiosInstance={fetcherObj[domainType][postType]}
          emptyTrigger={emtpyTriggerType}
        />
      </S.Container>
    </>
  );
}

const TAB_TYPE = {
  domain: 'domain',
  post: 'post',
};

const POST_TYPE_TABS = [
  { id: POST_TYPE.LIKE, title: '내가 좋아요 한 글' },
  { id: POST_TYPE.READ, title: '내가 읽은 글' },
];

const DOMAIN_TYPE_TABS = [
  { id: DOMAIN_TYPE.USER, title: '유저' },
  { id: DOMAIN_TYPE.TEAM, title: '팀' },
];
const fetcherObj = {
  [DOMAIN_TYPE.USER]: {
    [POST_TYPE.LIKE]: userApi.GET_USER_LIKES,
    [POST_TYPE.READ]: userApi.GET_USER_READS,
  },
  [DOMAIN_TYPE.TEAM]: {
    [POST_TYPE.LIKE]: teamApi.GET_TEAM_LIKES,
    [POST_TYPE.READ]: teamApi.GET_TEAM_READS,
  },
};
