import React from 'react';

const Show = ({show, children, className="", style}) => {
  return (
    <div className={show ? className : className + " d-none"} style={style}>
      { children }
    </div>
  );
}

export default Show;