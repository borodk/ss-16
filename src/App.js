import React, {useState} from 'react';
import Button from './Components/Button';
import InputWithLabel from './Components/InputWithLabel';
import './App.css';
import StepSequencer from './Components/StepSequencer';
import * as Tone from 'tone';


function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function App() {

  const [bpm, setBpm] = useState(120);

  const handleBpmInput = event => {
    let value = event.target.value;
    setBpm(value);
    Tone.Transport.bpm.value = value;
  };

  return (
    <div className="App">
      <h1>step sequencer</h1>
      <InputWithLabel
          id="bpm"
          value={bpm}
          isFocused
          onInputChange={handleBpmInput}
        >
          <strong>BPM:</strong>
        </InputWithLabel>
      <StepSequencer/>
    </div>
  );
}

export default App;
