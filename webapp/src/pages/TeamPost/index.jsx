import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import MarkdownViewer from 'components/MdViewer';
import CommentContainer from 'components/ComentContainer';
import { getTeamDetail } from 'apiAction/team';
import { handleFetcher, POST_TYPE } from 'utils';
import { Board, Button } from './style';

function TeamPost() {
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
      const { value, error } = await handleFetcher(getTeamDetail, { id: teamId });
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
      <Link to="./edit" state={targetTeam}>
        <Button>Edit</Button>
      </Link>
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

export default TeamPost;
