import { FC, Fragment } from 'react';
import { CloudUpload } from 'mdi-material-ui';

const InputContent: FC = () => {
  return (
    // Arbitrary key to fix warning
    <Fragment key='rdu-custom-label'>
      <CloudUpload style={{ fontSize: '6rem' }} />
      {/* Arbitrary max width */}
      <span style={{ maxWidth: 230, textAlign: 'center' }}>
        Drag and drop file here or click here to browse files
      </span>
    </Fragment>
  );
};

export default InputContent;
