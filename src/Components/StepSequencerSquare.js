import React from 'react';
import * as Helpers from '../Helpers';
import '../App.css';

const StepSequencerSquare = ({ active, value, onClick, id }) => {
  
  if(document.getElementById(id)){
    let currentSquare = document.getElementById(id);
    (active && Helpers.hasClass(currentSquare, 'filled')) ? 
    currentSquare.classList.add('active') : currentSquare.classList.remove('active');
  }
  let activeStyles ={};
  if(active){
    activeStyles.anim8 = "glow 800ms ease-out infinite alternate";
    //activeStyles.bg = "linear-gradient(white, whitesmoke)";
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
        border: "1px solid #eee",
        animation: activeStyles.anim8,
        background: activeStyles.bg,
      }}
      className="square"
      onClick={onClick}
      id={id}
    >
      {value}
    </div>
  );
};

export default StepSequencerSquare;