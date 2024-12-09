import React from 'react'
import ic_cancel from '../assets/ic_close.svg';

const CancelIcon = ({...props}) => {
  return (
    <div>
      <img src={ic_cancel} width={20} height={20} {...props}/>
    </div>
  );
}

export default CancelIcon