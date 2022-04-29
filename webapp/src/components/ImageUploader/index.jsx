/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_S3_BUCKET },
  region: process.env.REACT_APP_REGION,
});

function ImageUploader() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = useCallback((event) => {
    const Imagefile = event.target.files[0];
    setSelectedFile(Imagefile);
  }, []);
  const uploadImageFile = useCallback(() => {
    const params = {
      ACL: 'public-read',
      Body: selectedFile,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: selectedFile.name,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  }, [selectedFile]);

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input id="editicon" type="file" accept="image/*" onChange={handleFileInput} />
      <label htmlFor="editicon">Upload Image</label>
      <button onClick={uploadImageFile}>Upload to s3</button>
    </div>
  );
}

export default ImageUploader;
