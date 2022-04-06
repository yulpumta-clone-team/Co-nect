import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';

function MarkdownEditor({ mdValue, setContent }) {
  console.log(mdValue);
  const editorRef = useRef(null);
  const onChangeEditorTextHandler = () => {
    // const result = editorRef.current?.getInstance().getMarkdown();
    setContent(editorRef.current?.getInstance().getMarkdown());
    console.log(editorRef.current?.getInstance().getMarkdown());
  };
  return (
    <>
      <div>
        <Editor
          initialValue={mdValue}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut
          ref={editorRef}
          onChange={onChangeEditorTextHandler}
        />
      </div>
      {/* <button onClick={handleSubmit}>버튼</button>
      <Viewer initialValue={mdValue} /> */}
    </>
  );
}

MarkdownEditor.propTypes = {
  mdValue: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default React.memo(MarkdownEditor);
