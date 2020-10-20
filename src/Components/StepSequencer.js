import React, { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import StepSequencerSquare from './StepSequencerSquare';
import InputWithLabel from './InputWithLabel';
import ThemeSelect from './ThemeSelect';

const notes = [
  "C2",
  "C#2",
  "D2",
  "D#2",
  "E2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C2"
];

const initialPattern = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

const octaves = [
  {
    label: "-4",
    value: "-4"
  },
  {
    label: "-3",
    value: "-3"
  },
  {
    label: "-2",
    value: "-2"
  },
  {
    label: "-1",
    value: "-1"
  },
  {
    label: "0",
    value: "0"
  },
  {
    label: "1",
    value: "1"
  },
  {
    label: "2",
    value: "2"
  },
  {
    label: "3",
    value: "3"
  },
  {
    label: "4",
    value: "4"
  },
  {
    label: "5",
    value: "5"
  },
  {
    label: "6",
    value: "6"
  },
  {
    label: "7",
    value: "7"
  },
  {
    label: "8",
    value: "8"
  },
  {
    label: "9",
    value: "9"
  },
  {
    label: "10",
    value: "10"
  },
  {
    label: "11",
    value: "11"
  },
];

// create new synth instrument
const synth = new Tone.PolySynth().toMaster();

let distortionEffect = new Tone.Distortion(1).toMaster();
let pingPongDelayEffect = new Tone.PingPongDelay("4n", 0.2).toMaster();

const StepSequencer = () => {
  const [currentColumn, setColumn] = useState(0);
  const [pattern, updatePattern] = useState(initialPattern);
  const [bpm, setBpm] = useState(120);
  const [distortion, setDistortion] = useState(false);
  const [pingPongDelay, setPingPongDelay] = useState(false);
  const [octave, setOctave] = useState("0");

  useEffect(
    () => {
      const loop = new Tone.Sequence(
        (time, col) => {
          // update current column for animation
          setColumn(col);

          // loop
          pattern.map((row, noteIndex) => {
            // if column is active
            if (row[col]) {
              // play note from row
              synth.triggerAttackRelease(notes[noteIndex], "8n", time);
            }
          })
        },
        [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ],
        "16n"
      ).start(0);
      return () => loop.dispose();
    },
    [ pattern ] // update when pattern changes
  )

  // set BPM
  const handleBpmInput = useCallback((event) => {
    let value = event.target.value;
    setBpm(value);
    Tone.Transport.bpm.value = value;
  }, []);

  // play / stop functions
  const play = useCallback(() => {
    Tone.Transport.toggle();
  }, []);

  const stop = useCallback(() => {
    Tone.Transport.stop();
  }, []);

  // distortion on / off
  function handleDistorion() {
    setDistortion(!distortion);
    if(!distortion){
      synth.connect(distortionEffect);
    } else {
      synth.disconnect(distortionEffect);
    }
  }

  // ping pong delay on / off
  function handlePingPongDelay() {
    setPingPongDelay(!pingPongDelay);
    if(!pingPongDelay){
      synth.connect(pingPongDelayEffect);
    } else {
      synth.disconnect(pingPongDelayEffect);
    }
  }

  function OctaveDropDown() {
    const [octaveOptions] = React.useState(octaves);
    return (
      <>
        <label><strong>Octave:</strong></label>
        <select value={octave} onChange={handleOctaveInput}>
          {octaveOptions.map(({ label, value }) => (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          ))}
        </select>
      </>
    );
  }

  function handleOctaveInput(e){
    let value = e.currentTarget.value;
    let negative;
    setOctave(value);
    for(let i=0; i<notes.length; i++){
      // need 2 remove 2 chars if number is negative
      let note = notes[i];
      if(note.includes("-")) { negative = true }
      if(negative) {
        notes[i] = note.substring(0, note.length - 2) + value;
      } else {
        notes[i] = note.substring(0, note.length - 1) + value;
      }
    }
  }

  // update pattern
  function setPattern({ x, y, value }) {
    // copy pattern and invert the value
    const patternCopy = [ ...pattern ];
    patternCopy[y][x] = +!value;
    updatePattern(patternCopy);
    
    // set square color to 'on' or 'off' state
    let currentSquare;
    const squares = document.getElementsByClassName('square');
    (y>0) ? currentSquare = squares[(y*16)+x] : currentSquare = squares[x];
    patternCopy[y][x] ? currentSquare.classList.add('filled') : currentSquare.classList.remove('filled');
  };

  return (
    <>
      <div id="controls">
        <ThemeSelect/>
        <InputWithLabel
          id="bpm"
          value={bpm}
          isFocused
          onInputChange={handleBpmInput}
        >
          <strong>BPM:</strong>
        </InputWithLabel>
        <OctaveDropDown/>
        <button onClick={() => play()}>Play</button>
        <button onClick={() => stop()}>Stop</button>
        <label htmlFor='distortion-check-box'><input type="checkbox" checked={distortion} onChange={handleDistorion}></input>Distortion</label>
        <label htmlFor='pingpong-delay-check-box'><input type="checkbox" checked={pingPongDelay} onChange={handlePingPongDelay}></input>Ping Pong Delay</label>
      </div>
      <div id="step-sequencer">
        {pattern.map((row, y) => (
          <>
          <label className="row-label">{notes[y]}</label>
          <div key={y} style={{ display: "flex", justifyContent: "center" }}>
            {row.map((value, x) => (
              <StepSequencerSquare
                key={x}
                active={currentColumn === x}
                selected={value}
                onClick={() => setPattern({ x, y, value })}
                id={x.toString()+'-'+y.toString() }
              />
            ))}
          </div>
          </>
        ))}
      </div>
    </>
  );
};

export default StepSequencer