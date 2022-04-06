import React from 'react';
import PropTypes from 'prop-types';
import { CheckBoxGroupContainer } from './style';

function CheckBox({ checked, setChecked, likeOrder, setLikeOrder }) {
  const handleToggle = ({ id, name, type }) => {
    const groupId = Math.floor(id / 100);
    const isGroup = id % 100 === 0;
    const currentIndex = checked.indexOf(id);
    let newChecked = [...checked];
    if (isGroup) {
      if (currentIndex === -1) {
        checkList[groupId - 1].forEach((element) => newChecked.push(element.id));
      } else {
        newChecked = [...checked].filter((targetId) => Math.floor(targetId / 100) !== groupId);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (currentIndex === -1) {
        newChecked.push(id);
      } else {
        newChecked.splice(currentIndex, 1);
      }
    }
    setChecked([...new Set(newChecked)]);
  };

  const handleOrderCheckBox = (type) => {
    if (type === 'like') {
      setLikeOrder((prev) => !prev);
    }
  };

  const renderCheckBoxGroupContainer = (list, idx) => (
    <CheckBoxGroupContainer key={idx}>
      {list.map(({ id, name, type }) => (
        <li key={id}>
          <input
            type="checkbox"
            name={name}
            id={id}
            onChange={() => handleToggle({ id, name, type })}
            checked={checked.indexOf(id) !== -1}
          />
          <span>{name}</span>
        </li>
      ))}
    </CheckBoxGroupContainer>
  );

  return (
    <ul>
      {checkList.map((group, idx) => renderCheckBoxGroupContainer(group, idx))}
      <li>
        <input type="checkbox" onChange={() => handleOrderCheckBox('like')} />
        <span>좋아요순</span>
      </li>
    </ul>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.array.isRequired,
  setChecked: PropTypes.func.isRequired,
  likeOrder: PropTypes.bool.isRequired,
  setLikeOrder: PropTypes.func.isRequired,
};

export default CheckBox;

const checkList = [
  [
    { id: 100, name: 'front', type: 'front' },
    { id: 101, name: 'react', type: 'front' },
    { id: 102, name: 'js', type: 'front' },
    { id: 103, name: 'ts', type: 'front' },
    { id: 104, name: 'vue', type: 'front' },
  ],
  [
    { id: 200, name: 'back', type: 'back' },
    { id: 201, name: 'nodejs', type: 'back' },
    { id: 202, name: 'java', type: 'back' },
    { id: 203, name: 'spring', type: 'back' },
  ],
  [
    { id: 300, name: 'design', type: 'design' },
    { id: 301, name: 'xd', type: 'design' },
    { id: 302, name: 'figma', type: 'design' },
  ],
];
