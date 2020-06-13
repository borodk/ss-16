import React from 'react';
import StepSequencerColumn from './StepSequencerColumn';

const StepSequencer = props => {

  return (
    <div id="step-sequencer">
      <div id="container">
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
        <StepSequencerColumn onClick={props.handleClick}/>
      </div>
    </div>
  );
}

export default StepSequencer;