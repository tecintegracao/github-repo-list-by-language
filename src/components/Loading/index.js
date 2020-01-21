import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css';

function Loading() {
  return (
    <div className='overlay'>
      <div className='loading'>
        <div className='loadingbar'>
          <CircularProgress disableShrink />
        </div>
      </div>
    </div>
  );
}

export default Loading;
