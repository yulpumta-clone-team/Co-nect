import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';

MarkdownEditor.propTypes = {
  mdValue: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

function MarkdownEditor({ mdValue, setContent }) {
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
      onChange={onChangeEditorTextHandler}
    />
  );
}

export default React.memo(MarkdownEditor);
