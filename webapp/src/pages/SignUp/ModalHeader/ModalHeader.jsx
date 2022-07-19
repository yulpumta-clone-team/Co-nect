import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ModalHeader() {
  return (
    <div>
      <ul>
        <div>
          <NavLink to="/signup">Id / password</NavLink>
        </div>
        <div>
          <NavLink to="/signup/nickname">Nickname</NavLink>
        </div>
        <div>
          <NavLink to="/signup/skill">Skill</NavLink>
        </div>
        <div>
          <NavLink to="/signup/img">Img</NavLink>
        </div>
        <div>
          <NavLink to="/signup/session-job">Session / Job</NavLink>
        </div>
        <div>
          <NavLink to="/signup/slogan-portfolio">Slogan / Portfolio</NavLink>
        </div>
        <div>
          <NavLink to="/signup/content">Content</NavLink>
        </div>
      </ul>
    </div>
  );
}
