import React from 'react';

export default function nickname() {
  return (
    <>
      <div>
        <MarkdownEditor mdValue={mdcontent} setContent={setMdContent} />
      </div>
      <span>{errors?.extraError?.message}</span>
    </>
  );
}
