import React from 'react';
import PropTypes from 'prop-types';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

function MarkdownViewer({ mdValue }) {
  return <Viewer initialValue={mdValue} />;
}

MarkdownViewer.propTypes = {
  mdValue: PropTypes.string.isRequired,
};

export default MarkdownViewer;
