import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import PropTypes from 'prop-types';
import * as S from './MarkdownEditor.style';

MarkdownEditor.propTypes = {
  onlyViewer: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function MarkdownEditor({ onlyViewer, content, placeholder, label, customStyle }) {
  const [value, setValue] = useState(content);
  return (
    <S.Container data-color-mode="light" customStyle={customStyle}>
      {label && <S.Label>{label}</S.Label>}
      {onlyViewer ? (
        <MDEditor.Markdown
          source={value}
          style={{ whiteSpace: 'pre-wrap' }}
          textareaProps={{
            placeholder,
          }}
        />
      ) : (
        <MDEditor
          value={value}
          onChange={setValue}
          textareaProps={{
            placeholder,
          }}
        />
      )}
    </S.Container>
  );
}
