import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import PropTypes from 'prop-types';
import * as S from './MarkdownEditor.style';

MarkdownEditor.propTypes = {
  name: PropTypes.string, // viewer모드일때는 필요 없음
  onlyViewer: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func, // viewer모드일때는 필요 없음
  placeholder: PropTypes.string, // viewer모드일때는 필요 없음
  label: PropTypes.string,
  customStyle: PropTypes.array,
};

export default function MarkdownEditor({
  name,
  onlyViewer,
  content,
  onChange,
  placeholder,
  label,
  customStyle,
}) {
  const onChangeValue = (value1, event) => {
    onChange(event);
  };
  return (
    <S.Container data-color-mode="light" customStyle={customStyle}>
      {label && <S.Label>{label}</S.Label>}
      {onlyViewer ? (
        <MDEditor.Markdown
          source={content}
          style={{ whiteSpace: 'pre-wrap' }}
          textareaProps={{
            placeholder,
          }}
        />
      ) : (
        <MDEditor
          value={content}
          onChange={onChangeValue}
          textareaProps={{
            placeholder,
            name,
          }}
        />
      )}
    </S.Container>
  );
}
