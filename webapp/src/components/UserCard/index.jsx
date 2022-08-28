import React from 'react';
import PropTypes from 'prop-types';
import { userCardType } from 'types/user.type';
import ProfileImg from 'components/ProfileImg';
import { S3_IMAGE_SERVER_URL } from 'constant/api.constant';
import { userCardParser } from 'service/user.parser';
import useSkillCarousel from 'hooks/useSkillCarousel';
import * as S from './style';

UserCard.propTypes = {
  cardInfo: userCardType.isRequired,
  onClick: PropTypes.func,
};

export default function UserCard({ cardInfo, onClick }) {
  const parsedCardInfo = userCardParser(cardInfo);
  const { name, hopeSession, img, job, skills } = parsedCardInfo;

  const S3Img = S3_IMAGE_SERVER_URL + img;

  const { slideRef, handleClickNextSlide, handleClickPrevSlide } = useSkillCarousel({
    skills,
    viewingSkill: 5,
  });

  return (
    <S.CardWrapper onClick={onClick}>
      <S.CardTop>
        <S.Heart />
      </S.CardTop>
      <S.BackgroundImg>
        <S.UserJob>{job}</S.UserJob>
      </S.BackgroundImg>
      <ProfileImg src={S3Img} />
      <S.UserInfo>
        <S.UserName>{name}</S.UserName>
        <S.TeamBelongBoard>
          현재 소속 여부 <S.TeamBelong />
        </S.TeamBelongBoard>
        <S.HopeSession>
          희망 기간 &nbsp; <S.UserHopeSession>{hopeSession}</S.UserHopeSession>
        </S.HopeSession>
      </S.UserInfo>
      <S.Divider />
      <S.SkillBoard>
        <S.LeftAngle onClick={handleClickPrevSlide} />
        <S.SkillContainer>
          <S.SkillSlide ref={slideRef}>
            {skills && skills.map(({ imageUrl, id }) => <S.SkillImage key={id} src={imageUrl} />)}
          </S.SkillSlide>
        </S.SkillContainer>
        <S.RightAngle onClick={handleClickNextSlide} />
      </S.SkillBoard>
      <S.CountBoard>
        <S.Chat />
        000
        <S.View />
        000
      </S.CountBoard>
    </S.CardWrapper>
  );
}
