import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "Що таке дрон?",
      options: [
        "Пілотований літальний апарат",
        "Безпілотний літальний апарат",
        "Наземний транспортний засіб",
        "Підводний апарат"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "Який компонент дрону відповідає за підйомну силу?",
      options: ["Двигун", "Крила", "Камера", "Акумулятор"],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Яка основна функція пропелерів?",
      options: ["Забезпечення зв'язку", "Забезпечення тяги", "Зйомка відео", "Навігація"],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "Який тип дрону здатний здійснювати вертикальний зліт і посадку?",
      options: ["Літаковий", "Мультикоптер", "Планер", "Конвертоплан"],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Яка функція джойстика J3 на контролері SIYI MK32?",
      options: ["Керування креном", "Керування тангажем", "Контроль висоти польоту", "Керування рисканням"],
      correctAnswer: 2
    },
    {
      id: 6,
      question: "Який тип дрону найбільш економічний за паливом і має великий радіус дії?",
      options: ["Мультикоптер", "Вертолітний тип", "Фіксоване крило", "Конвертиплан"],
      correctAnswer: 2
    },
    {
      id: 7,
      question: "Яке основне завдання виконання польотів БПЛА?",
      options: ["Розваги", "Повітряна розвідка", "Доставка вантажів", "Аерофотозйомка"],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "Який український БПЛА використовується для рятувальних операцій?",
      options: ["Лелека-100", "Spectator-М1", "Фурія", "Punisher"],
      correctAnswer: 3
    },
    {
      id: 9,
      question: "Що потрібно зробити перед польотом дрону?",
      options: [
        "Зарядити акумулятор після польоту",
        "Перевірити заряд акумулятора та наявність пошкоджень",
        "Увімкнути двигуни на повну потужність",
        "Встановити максимальну висоту польоту"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      question: "Яка послідовність дій при посадці дрону?",
      options: [
        "Швидко знизити висоту, вимкнути двигуни до торкання землі",
        "Повільно знижувати висоту, уникати різких рухів, вимкнути двигуни після торкання землі",
        "Збільшити швидкість, різко знизити висоту, вимкнути двигуни",
        "Вимкнути двигуни у повітрі, дозволити дрону впасти на землю"
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleSubmit = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleRetry = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="quiz-page">
    <div className="quiz-container">
      <h1>Перевірка знань</h1>
      <p>Дайте відповіді на наступні запитання:</p>
      {questions.map(question => (
        <div key={question.id} className="question">
          <p>{question.question}</p>
          {question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={index}
                checked={answers[question.id] === index}
                onChange={() => handleAnswerChange(question.id, index)}
                disabled={showResults}
              />
              {option}
            </label>
          ))}
          {showResults && (
            <p className={answers[question.id] === question.correctAnswer ? "correct" : "incorrect"}>
              {answers[question.id] === question.correctAnswer ? "Правильно!" : "Неправильно. Правильна відповідь: " + question.options[question.correctAnswer]}
            </p>
          )}
        </div>
      ))}
      {!showResults && (
        <button onClick={handleSubmit}>Перевірити відповіді</button>
      )}
      {showResults && (
        <div className="results">
          <h2>Ваш результат: {score} з {questions.length}</h2>
          {score >= 9 ? (
              <Link to="/simulator" className="button">Перейти до тренажеру</Link>
            ) : (
              <button onClick={handleRetry} className="button">Пройти тест знову</button>
            )}
          </div>
        )}
        </div>
      <footer className="quiz-footer">
          <p>&copy; 2024 Тренажер оператора БПЛА. Всі права захищені.</p>
        </footer>
    </div>
  );
};

export default Quiz;