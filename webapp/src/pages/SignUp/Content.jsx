import React from 'react';
import MarkdownEditor from 'components/MdEditor';
import PropTypes from 'prop-types';

Content.propTypes = {
  errors: PropTypes.object.isRequired,
  mdcontent: PropTypes.object.isRequired,
  setMdContent: PropTypes.object.isRequired,
};

export default function Content({ mdcontent, setMdContent, errors }) {
  return (
    <div>
      <div>
        <MarkdownEditor mdcontent={mdcontent} setMdContent={setMdContent} />
      </div>
      <span>{errors?.extraError?.message}</span>
      <div>
        <input type="submit" />
      </div>
    </div>
  );
}
