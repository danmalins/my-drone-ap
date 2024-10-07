import React, { useState, useEffect } from 'react';
import './Simulator.css';

function Simulator() {
  const [currentExercise, setCurrentExercise] = useState(1);
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
  const [isExerciseOneComplete, setIsExerciseOneComplete] = useState(false);
  const [isExerciseTwoComplete, setIsExerciseTwoComplete] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 0 });
  const [tankPosition, setTankPosition] = useState({ x: 50, y: 0 });
  const [basePosition, setBasePosition] = useState({ x: 100, y: 0 });
  const [bombDropped, setBombDropped] = useState(false);
  const [bombAnimation, setBombAnimation] = useState(false);
  const [explosionAnimation, setExplosionAnimation] = useState(false);
  const [returningToBase, setReturningToBase] = useState(false);
  const [isOverBase, setIsOverBase] = useState(false);
  

  useEffect(() => {
    if (currentExercise === 1) {
      initializeExerciseOne();
    } else {
      initializeExerciseTwo();
    }
  }, [currentExercise]);

  const initializeExerciseOne = () => {
    setCircles([
      { id: 0, x: 10, y: 100, collected: false },
      { id: 1, x: 30, y: 150, collected: false },
      { id: 2, x: 50, y: 200, collected: false },
      { id: 3, x: 70, y: 150, collected: false },
      { id: 4, x: 90, y: 100, collected: false }
    ]);
    setObstacles([...Array(5)].map(() => ({
      type: 'tree',
      style: { left: `${Math.random() * 90}%` }
    })));
    setLatitude(0);
    setLongitude(0);
    setAltitude(0);
    setDirection(0);
    setSpeed(0);
    setFuelLevel(100);
    setDroneStatus('Landed');
    setBombDropped(false);
    setReturningToBase(false);
  };

  const initializeExerciseTwo = () => {
    setTargetPosition({ x: 80, y: 150 });
    setBasePosition({ x: 10, y: 10 });
    setLatitude(basePosition.x);
    setLongitude(basePosition.y);
    setAltitude(0);
    setDirection(0);
    setSpeed(0);
    setFuelLevel(100);
    setDroneStatus('Landed');
    setBombDropped(false);
    setReturningToBase(false);
    setObstacles([]);
    setCircles([]);
  };

  const switchExercise = (exerciseNumber) => {
    setCurrentExercise(exerciseNumber);
    resetExercise();
  };

  const resetExercise = () => {
    setDroneStatus('Landed');
    setAltitude(0);
    setLongitude(0);
    setLatitude(0);
    setSpeed(0);
    setDirection(0);
    setFuelLevel(100);
    setBombDropped(false);
    setReturningToBase(false);
    setIsOverBase(false);
    setEvents([]);
    
    if (currentExercise === 1) {
      setIsExerciseOneComplete(false);
      setCollectedCircles(0);
      // Ресет кружків та перешкод
    } else {
      setIsExerciseTwoComplete(false);
      // Ресет позицій танка та бази, якщо потрібно
    }
  };

  useEffect(() => {
    if (droneStatus === 'Flying') {
      const interval = setInterval(() => {
        setFuelLevel(prev => Math.max(prev - 0.02, 0));
        
        const radians = direction * Math.PI / 180;
        setLatitude(prev => prev + Math.cos(radians) * speed / 500);
        setLongitude(prev => {
          const newLong = prev + Math.sin(radians) * speed / 500;
          return ((newLong % 100) + 100) % 100;
        });

        if (currentExercise === 1) {
          checkCircleCollision();
        } else {
          checkTargetReached();
        }

        if (fuelLevel <= 0) {
          land();
          addEvent('Аварійна посадка: закінчилось паливо');
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [droneStatus, fuelLevel, speed, direction, longitude, altitude, circles, currentExercise]);

  const checkCircleCollision = () => {
    circles.forEach((circle, index) => {
      if (!circle.collected &&
          Math.abs(circle.x - longitude) < 3 &&
          Math.abs(circle.y - altitude) < 3) {
        const updatedCircles = [...circles];
        updatedCircles[index].collected = true;
        setCircles(updatedCircles);
        setCollectedCircles(prev => prev + 1);
        addEvent(`Досягнуто точку ${index + 1}`);
      }
    });
  };

  const checkTargetReached = () => {
    if (!bombDropped && 
        Math.abs(targetPosition.x - longitude) < 5 &&
        Math.abs(targetPosition.y - altitude) < 5) {
      addEvent('Ціль досягнуто. Скиньте бомбу!');
    }

    if (returningToBase &&
        Math.abs(basePosition.x - longitude) < 5 &&
        Math.abs(basePosition.y - altitude) < 5) {
      land();
      setIsExerciseTwoComplete(true);
      addEvent('Повернення на базу. Вправу завершено!');
    }
  };

  useEffect(() => {
    if (currentExercise === 1 && collectedCircles === circles.length && circles.length > 0) {
      setIsExerciseOneComplete(true);
      addEvent('Вправу 1 виконано!');
    }
  }, [collectedCircles, circles, currentExercise]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (droneStatus !== 'Flying') return;
      
      event.preventDefault();

      switch(event.key.toLowerCase()) {
        case 'w':
          setAltitude(prev => Math.min(prev + 10, 1000));
          addEvent('Збільшення висоти');
          break;
        case 's':
          setAltitude(prev => Math.max(prev - 10, 0));
          addEvent('Зменшення висоти');
          break;
        case 'a':
          setDirection(prev => (prev - 10 + 360) % 360);
          addEvent('Поворот ліворуч');
          break;
        case 'd':
          setDirection(prev => (prev + 10) % 360);
          addEvent('Поворот праворуч');
          break;
        case 'arrowup':
          setSpeed(prev => Math.min(prev + 5, 100));
          addEvent('Збільшення швидкості');
          break;
        case 'arrowdown':
          setSpeed(prev => Math.max(prev - 5, 0));
          addEvent('Зменшення швидкості');
          break;
        case ' ':
          if (currentExercise === 2 && !bombDropped) {
            dropBomb();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [droneStatus, altitude, speed, currentExercise, bombDropped]);

  const takeOff = () => {
    setDroneStatus('Flying');
    addEvent('Взліт');
  };

  const land = () => {
    setDroneStatus('Landed');
    setAltitude(0);
    setSpeed(0);
    addEvent('Посадка');
  };

  const dropBomb = () => {
    if (Math.abs(targetPosition.x - longitude) < 5 && Math.abs(targetPosition.y - altitude) < 5) {
      setBombAnimation(true);
      setTimeout(() => {
        setBombAnimation(false);
        setExplosionAnimation(true);
        setTimeout(() => {
          setExplosionAnimation(false);
        }, 1000);
      }, 1000);
      setBombDropped(true);
      setReturningToBase(true);
      addEvent('Бомбу скинуто! Повертайтесь на базу.');
    } else {
      addEvent('Ви не можете скинути бомбу тут. Наблизьтесь до цілі.');
    }
  };

  const addEvent = (event) => {
    setEvents(prev => [`${new Date().toLocaleTimeString()}: ${event}`, ...prev.slice(0, 4)]);
  };

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
        Вітаємо! Вправу {currentExercise} пройдено!
        {currentExercise === 1 && (
          <button onClick={() => setCurrentExercise(2)}>Перейти до наступної вправи</button>
        )}
      </div>
    );
  };

  return (
    <div className="simulator-container">
      <div className="simulator-main">
        <section className="drone-visualization">
          <div className="sky">
            <AltitudeScale />
            <div 
              className="drone" 
              style={{
                bottom: `${(altitude / 250) * 80}%`,
                left: `${longitude}%`,
                transform: `rotate(${direction}deg)`
              }}
            ></div>
            {currentExercise === 1 && circles.map((circle) => (
              <div
                key={circle.id}
                className={`circle ${circle.collected ? 'circle-collected' : 'circle-uncollected'}`}
                style={{
                  bottom: `${(circle.y / 250) * 80}%`,
                  left: `${circle.x}%`
                }}
              ></div>
            ))}
            {currentExercise === 1 && obstacles.map((obstacle, index) => (
              <div
                key={index}
                className={`obstacle ${obstacle.type}`}
                style={obstacle.style}
              />
            ))}
             {bombAnimation && <div className="bomb"></div>}
            {currentExercise === 2 && (
              <>
                <div 
                  className="target" 
                  style={{
                    bottom: `${(targetPosition.y / 250) * 80}%`, 
                    left: `${targetPosition.x}%`
                  }}
                ></div>
                 <div 
                className="tank"
                style={{
                  bottom: `${(targetPosition.y / 600) * 80}%`, 
                  left: `${targetPosition.x}%`
                }}
              >
                <div className="tank-body"></div>
                <div className="tank-turret"></div>
                <div className="tank-gun"></div>
                {explosionAnimation && <div className="explosion"></div>}
              </div>
                <div 
                  className="base" 
                  style={{
                    bottom: `${(basePosition.y / 250) * 80}%`, 
                    left: `${basePosition.x}%`
                  }}
                ></div>
              </>
            )}
          </div>
          <div className="ground"></div>
        </section>
        <aside className="simulator-sidebar">
          <section className="control-panel">
            <div className="status-indicators">
              <p>Вправа: {currentExercise}</p>
              <p>Статус: <span className={`status-${droneStatus.toLowerCase()}`}>{droneStatus}</span></p>
              <p>Паливо: <progress value={fuelLevel} max="100"></progress> {fuelLevel.toFixed(1)}%</p>
              <p>Координати: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
              <p>Швидкість: {speed.toFixed(1)} км/ч</p>
              <p>Направлення: {direction}°</p>
            </div>
            <div className="controls">
              <button onClick={takeOff} disabled={droneStatus === 'Flying' || fuelLevel <= 0}>Взліт</button>
              <button onClick={land} disabled={droneStatus === 'Landed'}>Приземлення</button>
              {currentExercise === 2 && (
                <button onClick={dropBomb} disabled={droneStatus !== 'Flying' || bombDropped}>Скинути бомбу</button>
              )}
            </div>
            <div className="exercise-selector">
              <button onClick={() => switchExercise(1)} disabled={currentExercise === 1}>Вправа 1</button>
              <button onClick={() => switchExercise(2)} disabled={currentExercise === 2}>Вправа 2</button>
            </div>
          </section>
          <section className='task'>
            <h5>
              {currentExercise === 1 ? ( "Для успішного виконання вам необхідно зібрати усі червоні кружки дроном та приземлитись. Користуйтесь знаннями здобутими в теорії та тестах. w - вгору, a - вліво, d - вправо, s - вниз. arrowup - набираємо швидкість, arrowdown - скидаємо швидкість."
              ) : (
                "Для успішного виконання другої вправи вам необхідно долетіти до цілі (танка), скинути на нього бомбу та повернутися на базу. Використовуйте ті самі клавіші керування, що і в першій вправі. Для скидання бомби натисніть кнопку 'Скинути бомбу', коли будете над ціллю."
              )}
              </h5>
          </section>
          <section className="event-log">
            <h3>Журнал подій:</h3>
            <ul>
              {events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      <CompletionMessage isComplete={currentExercise === 1 ? isExerciseOneComplete : isExerciseTwoComplete} 
      exercise={currentExercise}/>
    </div>
  );
}

export default Simulator;