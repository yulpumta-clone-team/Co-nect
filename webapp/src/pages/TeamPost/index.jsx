<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
=======
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
>>>>>>> back
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { handleFetcher } from 'utils';
import teamApi from 'api/team';
import { POST_TYPE } from 'constant';
import { Board } from './style';

export default function TeamPost() {
  const { teamId: stringTeamId } = useParams();
  const teamId = Number(stringTeamId);
  const navigate = useNavigate();
  const [targetTeam, setTargetTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  const onClickback = () => {
    navigate(-1);
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const { value, error } = await handleFetcher(teamApi.GET_TEAM_DETAIL, { id: teamId });
      setTargetTeam(value);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading || !targetTeam) {
    return <Loader />;
  }
  const { id, name, content, session, img, read, skills, commentCnt, likeCnt, user } = targetTeam;
  return (
    <div>
      <button onClick={onClickback}>back</button>
      <Board>
        <img src={img} alt="게시글" />
        <MarkdownViewer mdValue={content} />
        <div>
          이름 : {name} / 팀명 : {name}
        </div>
        <div>좋아요 개수 : {likeCnt}</div>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={user.name} postId={teamId} />
      </Board>
    </div>
  );
}
