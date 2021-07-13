import { FC } from 'react';
import DropzoneUploader from 'react-dropzone-uploader';
import { useDropzoneStyles } from './useDropzoneStyles';

// Components
import InputContent from './InputContent';
import SubmitButtonContent from './SubmitButtonContent';

const Dropzone: FC = (props) => {
  // specify upload params and url for your files
  // const getUploadParams = ({ meta }) => {
  //   return { url: "https://httpbin.org/post" };
  // };

  // called every time a file's `status` changes
  // const handleChangeStatus = (fileWithMeta, status) => {
  //   console.log(fileWithMeta, status);
  // };

  // Receives array of files that are done uploading
  // when submit button is clicked
  // const handleSubmit = (files, allFiles) => {
  //   console.log(files.map((f) => f.meta));
  //   allFiles.forEach((f) => f.remove());
  // };
  const classes = useDropzoneStyles();
  return (
    <div className={classes.root}>
      <DropzoneUploader
        {...props}
        // getUploadParams={getUploadParams}
        // onChangeStatus={handleChangeStatus}
        // onSubmit={handleSubmit}
        // maxFiles={1}
        inputContent={InputContent}
        submitButtonContent={SubmitButtonContent}
      />
    </div>
  );
};

export default Dropzone;
