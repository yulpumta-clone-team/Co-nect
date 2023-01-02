import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './ToastNotification.style';
import MessageIcon from './MessageIcon';

ToastNotification.propTypes = {
  toastList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  col: PropTypes.string.isRequired,
  row: PropTypes.string.isRequired,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
  deleteCallback: PropTypes.func.isRequired,
};

export default function ToastNotification({
  toastList,
  col,
  row,
  autoDelete = true,
  autoDeleteTime = 2000,
  deleteCallback,
}) {
  const timeId = useRef(null);
  const [list, setList] = useState(toastList);
  const position = `${col}-${row}`;
  useEffect(() => {
    setList(toastList);
  }, [toastList]);

  useEffect(() => {
    timeId.current = setInterval(() => {
      if (autoDelete && list.length) {
        deleteCallback(list[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(timeId.current);
    };
  }, [toastList, autoDelete, autoDeleteTime, list, deleteCallback]);

  return (
    <S.Container positionType={position} startPoint={row}>
      {list.map(({ id, type, description }) => (
        <S.Notification key={id} type={type} positionType={position} startPoint={row}>
          <S.Image>
            <MessageIcon type={type} />
          </S.Image>
          <S.Info>
            <h3>{type}</h3>
            <p>{description}</p>
          </S.Info>
          <button type="button" onClick={() => deleteCallback(id)}>
            X
          </button>
        </S.Notification>
      ))}
    </S.Container>
  );
}
