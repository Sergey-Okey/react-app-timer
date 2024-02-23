// Update the App.js file

import React, { useState, useEffect } from 'react';
import './App.css';

const Counter = () => {
	const [count, setCount] = useState(0);

	const handleKeyPress = (event) => {
		if (event.key === 'ArrowUp') {
			setCount(count + 1);
		} else if (event.key === 'ArrowDown') {
			setCount(count - 1);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [count]);

	return (
		<div className="counter">
			<h2>Counter: {count}</h2>
			<button onClick={() => setCount(count + 1)}>Увеличить</button>
			<button onClick={() => setCount(count - 1)}>Уменьшить</button>
		</div>
	);
};

const Timer = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let intervalId;

		if (isRunning) {
			intervalId = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [isRunning]);

	const handleToggleTimer = () => {
		setIsRunning((prevIsRunning) => !prevIsRunning);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Space') {
			handleToggleTimer();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [isRunning]);

	return (
		<div className={`timer ${isRunning ? 'running' : ''}`}>
			<h2>Timer: {time} seconds</h2>
			<button onClick={handleToggleTimer}>
				{isRunning ? 'Пауза' : 'Запуск'}
			</button>
			{time >= 10 && <p>Time is up!</p>}
		</div>
	);
};

const App = () => {
	return (
		<div className="app">
			<Counter />
			<Timer />
		</div>
	);
};

export default App;
