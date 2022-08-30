import '@toast-ui/editor/dist/toastui-editor.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Viewer } from '@toast-ui/react-editor';

MarkdownViewer.propTypes = {
  mdValue: PropTypes.string.isRequired,
};

export default function MarkdownViewer({ mdValue }) {
  return <Viewer initialValue={mdValue} />;
}
