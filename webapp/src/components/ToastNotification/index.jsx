import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import checkIcon from 'assets/icons/check.svg';
import errorIcon from 'assets/icons/error.svg';
import infoIcon from 'assets/icons/info.svg';
import warningIcon from 'assets/icons/warning.svg';
import * as S from './ToastNotification.style';

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
  autoDelete: PropTypes.bool.isRequired,
  autoDeleteTime: PropTypes.number.isRequired,
  deleteCallback: PropTypes.func.isRequired,
};

export default function ToastNotification({
  toastList,
  col,
  row,
  autoDelete,
  autoDeleteTime,
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
            <img src={MESSAGE_ICON[type]} alt="icon" />
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

const MESSAGE_ICON = {
  Success: checkIcon,
  Error: errorIcon,
  Warning: warningIcon,
  Info: infoIcon,
};
