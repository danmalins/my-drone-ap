import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [droneStatus, setDroneStatus] = useState('Landed');
  const [fuelLevel, setFuelLevel] = useState(100);
  const [altitude, setAltitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(0);
  const [weather, setWeather] = useState('Ясно');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (droneStatus === 'Flying') {
      const interval = setInterval(() => {
        setFuelLevel(prev => Math.max(prev - 0.1, 0));
        setAltitude(prev => prev + 1);
        setLatitude(prev => prev + 0.0001);
        setLongitude(prev => prev + 0.0001);
        setSpeed(50 + Math.random() * 10);
        setDirection(prev => (prev + 1) % 360);

        if (Math.random() < 0.01) {
          const newWeather = ['Ясно', 'Облачно', 'Ветрено', 'Дождливо'][Math.floor(Math.random() * 4)];
          setWeather(newWeather);
          addEvent(`Погода изменилась на ${newWeather}`);
        }

        if (fuelLevel <= 0) {
          land();
          addEvent('Аварийная посадка: закончилось топливо');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [droneStatus, fuelLevel]);

  const takeOff = () => {
    setDroneStatus('Flying');
    addEvent('Взлет');
  };

  const land = () => {
    setDroneStatus('Landed');
    setAltitude(0);
    setSpeed(0);
    addEvent('Посадка');
  };

  const addEvent = (event) => {
    setEvents(prev => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev.slice(0, 4)]);
  };


return (
  <div className="app-container">
    <header className="app-header">
      <h1>Тренажер оператора БПЛА</h1>
    </header>
    <main className="app-main">
      <section className="drone-visualization">
        <div className="sky">
          <div 
            className="drone" 
            style={{
              bottom: `${altitude / 10}%`,
              left: `${(longitude % 1) * 100}%`,
              transform: `rotate(${direction}deg)`
            }}
          ></div>
        </div>
      </section>
      <section className="control-panel">
        <div className="status-indicators">
          <p>Статус: <span className={`status-${droneStatus.toLowerCase()}`}>{droneStatus}</span></p>
          <p>Топливо: <progress value={fuelLevel} max="100"></progress> {fuelLevel.toFixed(1)}%</p>
          <p>Высота: {altitude.toFixed(0)} м</p>
          <p>Координаты: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
          <p>Скорость: {speed.toFixed(1)} км/ч</p>
          <p>Направление: {direction}°</p>
          <p>Погода: {weather}</p>
        </div>
        <div className="controls">
          <button onClick={takeOff} disabled={droneStatus === 'Flying' || fuelLevel <= 0}>Взлететь</button>
          <button onClick={land} disabled={droneStatus === 'Landed'}>Приземлиться</button>
        </div>
      </section>
      <section className="event-log">
        <h3>Журнал событий:</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </section>
    </main>
  </div>
);

}

export default App;
