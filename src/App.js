import React, { useState } from 'react';
import * as Tone from 'tone';
import Button from './Components/Button';
import InputWithLabel from './Components/InputWithLabel';
import './App.css';
import StepSequencer from './Components/StepSequencer';


function hasClass(element, className) {
  return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

var synth = new Tone.Synth().toMaster();

// the notes
var noteNames = ["F#", "E", "C#", "A"];


var columns = document.getElementsByClassName("column");
var loop = new Tone.Sequence(function(time, col){
  for(var c in columns) {
    var currentColumn = columns[c];
    var rows = currentColumn.children;
    for(var r in rows) {
      var currentRow = rows[r];
      if(hasClass(currentRow, 'filled')) {
        /*var vel = Math.random() * 0.5 + 0.5;
        keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);*/
        console.log(noteNames[r]);
      }
    }
  }
  //set the column on the correct draw frame
  Tone.Draw.schedule(function(){
    document.querySelector("#step-sequencer").setAttribute("highlight", col);
    var highlighted = document.querySelector("#step-sequencer").getAttribute("highlight");
    var prevColumn;
    if(col == 0) {
      prevColumn = 15;
    } else {
      prevColumn = col - 1;
    }
    if((highlighted == col) && (prevColumn >= 0)) {
      columns[prevColumn].classList.remove("highlight");
      columns[col].classList.add("highlight");
    }

  }, time);
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

Tone.Transport.on("stop", () => {
  setTimeout(() => {
    document.querySelector("#step-sequencer #container").setAttribute("highlight", "-1");
    document.querySelector(".highlight").classList.remove("highlight");
  }, 100);
});

const play = () => {
  Tone.Transport.start();
}

const stop = () => {
  Tone.Transport.stop();
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
      <div id="controls">
      <InputWithLabel
          id="bpm"
          value={bpm}
          isFocused
          onInputChange={handleBpmInput}
        >
          <strong>BPM:</strong>
        </InputWithLabel>
        <Button buttonText="play" handleClick={play}/>
        <Button buttonText="stop" handleClick={stop}/>
      </div>
      <StepSequencer/>
    </div>
  );
}

export default App;
