import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ModalHeader() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/signup">Id / password</NavLink>
        </li>
        <li>
          <NavLink to="/signup/nickname">Nickname</NavLink>
        </li>
        <li>
          <NavLink to="/signup/skill">Skill</NavLink>
        </li>
        <li>
          <NavLink to="/signup/img">Img</NavLink>
        </li>
        <li>
          <NavLink to="/signup/session-job">Session / Job</NavLink>
        </li>
        <li>
          <NavLink to="/signup/slogan-portfolio">Slogan / Portfolio</NavLink>
        </li>
        <li>
          <NavLink to="/signup/content">Content</NavLink>
        </li>
      </ul>
    </div>
  );
}
