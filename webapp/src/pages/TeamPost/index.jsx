import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { getTeamDetail } from 'apiAction/team';
import { POST_TYPE } from 'utils';
import { Board, Button } from './style';

function TeamPost() {
  const { teamId: id } = useParams();
  const teamId = Number(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickback = () => {
    navigate(-1);
  };
  const { targetTeam } = useSelector((state) => state.team);
  useEffect(() => {
    dispatch(getTeamDetail({ id: teamId }));
  }, [dispatch, teamId]);

  if (!targetTeam) {
    return <Loader />;
  }

  console.log('targetTeam', targetTeam);
  const {
    team_id,
    team_name,
    name,
    content,
    session,
    img,
    read,
    job,
    comment_cnt,
    like_cnt,
    createdAt,
    updatedAt,
    comments,
  } = targetTeam;
  return (
    <div>
      <button onClick={onClickback}>back</button>
      <Link to="./edit" state={targetTeam}>
        <Button>Edit</Button>
      </Link>
      <Board>
        <img src={img} alt="게시글" />
        <MarkdownViewer mdValue={content} />
        <div>
          이름 : {name} / 팀명 : {team_name}
        </div>
        <div>좋아요 개수 : {like_cnt}</div>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={name} postId={teamId} />
      </Board>
    </div>
  );
}

export default TeamPost;
