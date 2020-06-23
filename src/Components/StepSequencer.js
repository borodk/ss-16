import React, { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import StepSequencerSquare from './StepSequencerSquare';
import InputWithLabel from './InputWithLabel';
import ThemeSelect from './ThemeSelect';

const notes = [
  "C2",
  "D2",
  "E2",
  "F2",
  "G2",
  "A2",
  "B2",
  "C3"
];

const initialPattern = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

// create new synth instrument
const synth = new Tone.MonoSynth().toMaster();

let distortionEffect = new Tone.Distortion(1).toMaster();

const StepSequencer = () => {
  const [currentColumn, setColumn] = useState(0);
  const [pattern, updatePattern] = useState(initialPattern);
  const [bpm, setBpm] = useState(120);
  const [distortion, setDistortion] = useState(false);

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
    console.log('play');
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
        <button onClick={() => play()}>Play</button>
        <button onClick={() => stop()}>Stop</button>
        <label for='distortion-check-box'><input type="checkbox" checked={distortion} onChange={handleDistorion}></input>Distortion</label>
      </div>
      <div id="step-sequencer">
        {pattern.map((row, y) => (
          <>
          <label class="row-label">{notes[y]}</label>
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