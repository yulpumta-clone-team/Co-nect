import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import PropTypes from 'prop-types';
import * as S from './MarkdownEditor.style';

MarkdownEditor.propTypes = {
  onlyViewer: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  customStyle: PropTypes.array,
};

export default function MarkdownEditor({ onlyViewer, content, customStyle }) {
  const [value, setValue] = useState(content);
  return (
    <S.Container data-color-mode="light" customStyle={customStyle}>
      {onlyViewer ? (
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      ) : (
        <MDEditor value={value} onChange={setValue} />
      )}
    </S.Container>
  );
}
