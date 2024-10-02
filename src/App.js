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
  const [obstacles, setObstacles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [collectedCircles, setCollectedCircles] = useState(0);
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);

  useEffect(() => {
    const newCircles = [
      { id: 0, x: 10, y: 100, collected: false },
      { id: 1, x: 30, y: 150, collected: false },
      { id: 2, x: 50, y: 200, collected: false },
      { id: 3, x: 70, y: 150, collected: false },
      { id: 4, x: 90, y: 100, collected: false }
    ];
    setCircles(newCircles);
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      circles.forEach((circle, index) => {
        if (!circle.collected &&
            Math.abs(circle.x - longitude) < 5 &&
            Math.abs(circle.y - altitude) < 10) {
          const updatedCircles = [...circles];
          updatedCircles[index].collected = true;
          setCircles(updatedCircles);
          setCollectedCircles(prev => prev + 1);
        }
      });
    };
  
    checkCollision();
  
  }, [longitude, altitude, circles]);

  useEffect(() => {
    if (collectedCircles === circles.length && circles.length > 0) {
      setIsExerciseComplete(true);
      addEvent('Упражнение завершено! Все кружки собраны.');
    }
  }, [collectedCircles, circles]);

  useEffect(() => {
    // Генерируем случайные препятствия при монтировании компонента
    const newObstacles = [];
    for (let i = 0; i < 5; i++) {
      newObstacles.push({
        type: 'tree',
        style: {
          left: `${Math.random() * 90}%`,
        }
      });
    }
    setObstacles(newObstacles);
  }, []);

  useEffect(() => {
    if (droneStatus === 'Flying') {
      const interval = setInterval(() => {
        setFuelLevel(prev => Math.max(prev - 0.02, 0)); // Уменьшаем расход топлива
        
        // Остальная логика движения дрона
        const radians = direction * Math.PI / 180;
        setLatitude(prev => prev + Math.cos(radians) * speed / 1000);
        setLongitude(prev => {
          const newLong = prev + Math.sin(radians) * speed / 1000;
          return ((newLong % 100) + 100) % 100;
        });
  
        // Проверка столкновений с кружками
        circles.forEach((circle, index) => {
          if (!circle.collected &&
              Math.abs(circle.x - longitude) < 3 &&
              Math.abs(circle.y - altitude) < 3) {
            const updatedCircles = [...circles];
            updatedCircles[index].collected = true;
            setCircles(updatedCircles);
            setCollectedCircles(prev => prev + 1);
            addEvent(`Собран кружок ${index + 1}`);
          }
        });
  
        if (fuelLevel <= 0) {
          land();
          addEvent('Аварийная посадка: закончилось топливо');
        }
      }, 50);
  
      return () => clearInterval(interval);
    }
  }, [droneStatus, fuelLevel, speed, direction, longitude, altitude, circles]);

  // Обновляем эффект для проверки завершения упражнения
useEffect(() => {
  if (collectedCircles === circles.length && circles.length > 0) {
    setIsExerciseComplete(true);
    addEvent('Упражнение завершено! Все кружки собраны.');
  }
}, [collectedCircles, circles]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (droneStatus !== 'Flying') return;
      
      event.preventDefault(); // Предотвращаем прокрутку страницы

      switch(event.key.toLowerCase()) {
        case 'w':
          setAltitude(prev => Math.min(prev + 10, 1000));
          addEvent('Увеличение высоты');
          break;
        case 's':
          setAltitude(prev => Math.max(prev - 10, 0));
          addEvent('Снижение высоты');
          break;
        case 'a':
          setDirection(prev => (prev - 10 + 360) % 360);
          addEvent('Поворот влево');
          break;
        case 'd':
          setDirection(prev => (prev + 10) % 360);
          addEvent('Поворот вправо');
          break;
        case 'arrowup':
          setSpeed(prev => Math.min(prev + 5, 100));
          addEvent('Увеличение скорости');
          break;
        case 'arrowdown':
          setSpeed(prev => Math.max(prev - 5, 0));
          addEvent('Уменьшение скорости');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [droneStatus, altitude, speed]);

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

  const Obstacle = ({ type, style }) => (
    <div className={`obstacle ${type}`} style={style}></div>
  );

  const addEvent = (event) => {
    setEvents(prev => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev.slice(0, 4)]);
  };

  const Tree = () => (
    <div className="absolute w-8 h-12" style={{bottom: '25%'}}>
      <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-green-700"></div>
      <div className="w-2 h-4 bg-brown-600 mx-auto"></div>
    </div>
  );

  const AltitudeScale = () => {
    const marks = [250, 200, 150, 100, 50];
    return (
      <div className="altitude-scale">
        {marks.map(mark => (
          <div key={mark} className="altitude-mark">{mark}м</div>
        ))}
      </div>
    );
  };

  const CompletionMessage = ({ isComplete }) => {
    if (!isComplete) return null;
    
    return (
      <div className="completion-message">
        Поздравляем! Вы собрали все кружки!
      </div>
    );
  };

return (
  <div className="app-container">
      <header className="app-header">
        <h1>Тренажер оператора БПЛА</h1>
      </header>
      <main className="app-main">
      <section className="drone-visualization">
      <AltitudeScale />
      <div 
        className="drone" 
        style={{
          bottom: `${(altitude / 200) * 75}%`,
          left: `${longitude}%`,
          transform: `rotate(${direction}deg)`
        }}
      ></div>
          {circles.map((circle) => (
      <div
        key={circle.id}
        className={`circle ${circle.collected ? 'circle-collected' : 'circle-uncollected'}`}
        style={{
          bottom: `${(circle.y / 200) * 80}%`,
          left: `${circle.x}%`
        }}
      ></div>
      ))}
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className={`obstacle ${obstacle.type}`}
          style={obstacle.style}
        />
      ))}
     <div className="ground"></div>
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
      <CompletionMessage isComplete={isExerciseComplete} />
    </main>
  </div>
);

}

export default App;
