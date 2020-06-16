import React from 'react';
import * as Helpers from '../Helpers';

const StepSequencerSquare = ({ active, value, onClick, id }) => {
  if(document.getElementById(id)){
    let currentSquare = document.getElementById(id);
    (active && Helpers.hasClass(currentSquare, 'filled')) ? 
    currentSquare.classList.add('active') : currentSquare.classList.remove('active');
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 25,
        height: 25,
        margin: 2,
        border: active ? "1px solid lightsalmon" : "1px solid #eee",
      }}
      className="square"
      onClick={onClick}
      id={id}
      active={active}
    >
      {value}
    </div>
  );
};

export default StepSequencerSquare;