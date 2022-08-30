import '@toast-ui/editor/dist/toastui-editor.css';
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor, Viewer } from '@toast-ui/react-editor';

MarkdownEditor.propTypes = {
  mdValue: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  height: PropTypes.string,
};

export default function MarkdownEditor({ mdValue, setContent, height = '300px' }) {
  const editorRef = useRef(null);
  const onChangeEditorTextHandler = useCallback(() => {
    setContent(editorRef.current?.getInstance().getMarkdown());
  }, [setContent]);
  return (
    <Editor
      initialValue={mdValue}
      initialEditType="markdown"
      useCommandShortcut
      ref={editorRef}
      height={height}
      onChange={onChangeEditorTextHandler}
    />
  );
}
