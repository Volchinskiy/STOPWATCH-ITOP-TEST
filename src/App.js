import './App.css';

import React, { useEffect, useState } from 'react';
import {interval,Subject,} from 'rxjs';
import {takeUntil,} from 'rxjs/operators';

function App() {
  const [time, setTime] = useState(0);
  const [isTimerOn, setTimerOn] = useState(false);
  const [startStopBtn, setStartStopBtn] = useState();

  const handleClick = () => {
    setTimerOn(!isTimerOn);
  };

  const handleWait = () => {
    if (time !== 0) {
      setTimerOn(false);
    }
  };

  const handleReset = () => {
    setTime(0);
    setTimerOn(false);
  };

  useEffect(() => {
    if (isTimerOn) {
      setStartStopBtn('Stop');
    } else {
      setStartStopBtn('Start');
    }

    const timeSubject$ = new Subject();
    interval(1000)
      .pipe(takeUntil(timeSubject$))
      .subscribe(() => {
        if (isTimerOn) {
          setTime((val) => val + 1);
        }
      });

    return () => {
      timeSubject$.next();
      timeSubject$.complete();
    };
  }, [isTimerOn]);

  return (
    <section className="App">
      <div className="Stopwatch">
          <div className="Stopwatch-left-side">
            <div className="Display">
              <div>{(time / 100) < 10 && <span>0</span>}{Math.trunc(time / 3600)}</div>

              <div>:</div>

              <div>{(time / 100) < 10 && <span>0</span>}{Math.trunc(time / 60) % 60}</div>

              <div>:</div>

              <div>{(time % 60) < 10 && <span>0</span>}{time % 60}</div>
            </div>
          </div>

          <div className="Stopwatch-right-side">
            
              <div className="Btn-wrapper">
                <button className={isTimerOn ? 'Stop-Btn' : ''} onClick={handleClick} id="start-stop" >{startStopBtn}</button>
              </div>

              <div className="Btn-wrapper">
                <button className="Wait-Btn" onDoubleClick={handleWait} id="wait">Wait</button>
              </div>

              <div className="Btn-wrapper">
                <button className="Reset-Btn" onClick={handleReset}>Reset</button>
              </div>

          </div>    
        </div>
    </section>
  );
}

export default App;