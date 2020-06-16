import React, { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import StepSequencerSquare from './StepSequencerSquare';
import Button from './Button';

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

const StepSequencer = () => {
  const [ playState, setPlayState ] = useState(Tone.Transport.state);
  const [ currentColumn, setColumn ] = useState(0);
  const [ pattern, updatePattern ] = useState(initialPattern);

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

  // play / stop functions
  const play = useCallback(() => {
    Tone.Transport.toggle();
    setPlayState(Tone.Transport.state);
  }, []);

  const stop = useCallback(() => {
    Tone.Transport.stop();
    setPlayState(Tone.Transport.state);
  }, []);

  function setPattern({ x, y, value }) {
    // update pattern by making a copy and inverting the value
    const patternCopy = [ ...pattern ];
    patternCopy[y][x] = +!value;
    updatePattern(patternCopy);
    
    // set square color
    let currentSquare;
    const squares = document.getElementsByClassName('square');
    (y>0) ? currentSquare = squares[(y*16)+x] : currentSquare = squares[x];
    patternCopy[y][x] ? currentSquare.classList.add('filled') : currentSquare.classList.remove('filled');
  };

  return (
    <>
      <div id="controls">
        <button onClick={() => play()}>Play</button>
        <button onClick={() => stop()}>Stop</button>
      </div>
      <div>
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