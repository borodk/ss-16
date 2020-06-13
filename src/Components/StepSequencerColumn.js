import React from 'react';
import StepSequencerRow from './StepSequencerRow';

const StepSequencerColumn = props => {

  return (
    <div className="column">
      <StepSequencerRow/>
      <StepSequencerRow/>
      <StepSequencerRow/>
      <StepSequencerRow/>
    </div>
  );
}

export default StepSequencerColumn;