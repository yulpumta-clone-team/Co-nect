import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

function MarkdownViewer({ mdValue }) {
  const [initialValue, setInitialValue] = useState(mdValue);
  return <Viewer initialValue={initialValue} />;
}

MarkdownViewer.propTypes = {
  mdValue: PropTypes.string.isRequired,
};

export default MarkdownViewer;
