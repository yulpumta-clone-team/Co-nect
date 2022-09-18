import React from 'react';
import { teamDetailType } from 'types/team.type';

EditTeamPostDetail.propTypes = {
  targetTeam: teamDetailType,
};

export default function EditTeamPostDetail({ targetTeam }) {
  console.log('targetTeam', targetTeam);
  return <div>EditTeamPostDetail</div>;
}
