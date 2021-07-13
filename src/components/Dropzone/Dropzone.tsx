import { FC } from 'react';
import DropzoneUploader from 'react-dropzone-uploader';
import { useDropzoneStyles } from './useDropzoneStyles';
import { useSnackbar } from 'notistack';

// Components
import InputContent from './InputContent';
import SubmitButtonContent from './SubmitButtonContent';

const Dropzone: FC = (props) => {
  const { enqueueSnackbar } = useSnackbar();

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
  const handleSubmit = (files: any, allFiles: any) => {
    enqueueSnackbar('File/s successfully uploaded', { variant: 'success' });
    console.log(files.map((f: any) => f.meta));
    allFiles.forEach((f: any) => f.remove());
  };

  const classes = useDropzoneStyles();
  return (
    <div className={classes.root}>
      <DropzoneUploader
        {...props}
        // getUploadParams={getUploadParams}
        // onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        // maxFiles={1}
        inputContent={InputContent}
        submitButtonContent={SubmitButtonContent}
      />
    </div>
  );
};

export default Dropzone;
