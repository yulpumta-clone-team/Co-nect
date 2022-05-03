import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { getTeamDetail } from 'apiAction/team';
import { POST_TYPE } from 'utils';
import { Board, Button, Box, Box2, Box3 } from './stylep';

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
    dispatch(getTeamDetail(teamId));
  }, [dispatch, teamId]);
  if (!targetTeam) {
    return <Loader />;
  }
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
      <Link to="./edit" state={{ team_name, content, name, img, like_cnt }}>
        <Button>Edit</Button>
      </Link>
      <Board>
        <Box3>{img}</Box3>
        <Box2>
          <MarkdownViewer mdValue={content} />
        </Box2>
        <Box2>
          이름 : {name} / 팀명 : {team_name}
        </Box2>
        <Box2>좋아요 개수 : {like_cnt}</Box2>
        <CommentContainer postType={POST_TYPE.TEAM} postWriter={name} postId={teamId} />
      </Board>
    </div>
  );
}

export default TeamPost;
