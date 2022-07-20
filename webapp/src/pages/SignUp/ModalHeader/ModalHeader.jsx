import { SIGN_UP_INFO, SIGN_UP } from 'constant/route';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ModalHeader() {
  return (
    <div>
      <ul>
        <div>
          <Link to={SIGN_UP}>Id / password</Link>
        </div>
        <div>
          <Link to={SIGN_UP + SIGN_UP_INFO.NICKNAME}>Nickname</Link>
        </div>
        <div>
          <Link to={SIGN_UP + SIGN_UP_INFO.SKILL}>Skill</Link>
        </div>
        <div>
          <Link to={SIGN_UP + SIGN_UP_INFO.IMG}>Img</Link>
        </div>
        <div>
          <Link to={SIGN_UP + SIGN_UP_INFO.SESSION_JOB}>Session / Job</Link>
        </div>
        <div>
          <Link to={SIGN_UP + SIGN_UP_INFO.SLOGAN_PORTFOLIO}>Slogan / Portfolio</Link>
        </div>
        <div>
          <Link to={SIGN_UP + SIGN_UP_INFO.CONTENT}>Content</Link>
        </div>
      </ul>
    </div>
  );
}
