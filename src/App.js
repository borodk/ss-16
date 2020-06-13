import React from 'react';
import * as Tone from 'tone';
import Button from './Components/Button';
import './App.css';
import StepSequencer from './Components/StepSequencer';

const play = () => {
  const synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease('C4', '8n');
}

const stop = () => {
  alert('stop');
}

function App() {
  return (
    <div className="App">
      <h1>step sequencer</h1>
      <Button buttonText="play" handleClick={play}/>
      <Button buttonText="stop" handleClick={stop}/>
      <StepSequencer/>
    </div>
  );
}

export default App;
