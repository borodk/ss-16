import React, { useState } from 'react';

const Button = props  => {
  return (
    <button onClick={props.handleClick}>
      {props.buttonText}
    </button>
  );
}

export default Button;