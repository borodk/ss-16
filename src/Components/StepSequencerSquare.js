import React from 'react';

const StepSequencerSquare = ({ active, value, onClick }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 25,
      height: 25,
      margin: 2,
      border: active ? "1px solid lightsalmon" : "1px solid #eee"
    }}
    className="square"
    onClick={onClick}
  >
    {value}
  </div>
);

export default StepSequencerSquare;