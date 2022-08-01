import React from 'react';
import MarkdownEditor from 'components/MdEditor';
import PropTypes from 'prop-types';

Content.propTypes = {
  // errors: PropTypes.object.isRequired,
  mdcontent: PropTypes.string.isRequired,
  setMdContent: PropTypes.func.isRequired,
};

export default function Content({ mdcontent, setMdContent }) {
  return (
    <div>
      <div>
        <MarkdownEditor mdValue={mdcontent} setContent={setMdContent} />
      </div>
      <div>
        <input type="submit" />
      </div>
    </div>
  );
}
