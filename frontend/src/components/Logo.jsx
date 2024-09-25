import * as React from 'react';

function Logo({width = '80px'}) {
  return (
    <div className={`max-w-[${width}]`}><img src='/logo.png' alt='Logo Campus-Cloud'/></div>
    
  )
}

export default Logo