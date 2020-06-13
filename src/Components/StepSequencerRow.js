import React, {useState, useEffect} from 'react';

function StepSequencerColumn() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className={isOn ? 'row filled' : 'row'} onClick={() => setIsOn(!isOn)}></div>
  );
}

export default StepSequencerColumn;