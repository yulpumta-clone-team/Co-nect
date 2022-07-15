import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { handleFetcher } from 'utils';
import authApi from 'api/auth';
import MarkdownEditor from 'components/MdEditor';
import { useNavigate } from 'react-router-dom';

export default function Content() {
  const [mdcontent, setMdContent] = useState('');
  const navigate = useNavigate();
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const onValid = async (submitData) => {
    const signUpInfo = {
      content: mdcontent,
    };
    // TODO: input validation 추가해야 함.
    const { error, isError } = await handleFetcher(authApi.POST_SIGN_UP, signUpInfo);
    if (isError) {
      console.log(error);
      return;
    }
    navigate('/login');
  };
  return (
    <>
      <div>
        <MarkdownEditor mdValue={mdcontent} setContent={setMdContent} />
      </div>
      <span>{errors?.extraError?.message}</span>
    </>
  );
}
