import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [inputNumber, setInputNumber] = useState(0);
  const [collatzData, setCollatzData] = useState([]);

  // Function to calculate the 3n+1 sequence
  const calculateCollatz = (num) => {
    let sequence = [num];
    while (num !== 1) {
      if (num % 2 === 0) {
        num = num / 2;
      } else {
        num = 3 * num + 1;
      }
      sequence.push(num);
    }
    return sequence;
  };

  const handleClick = () => {
    if (inputNumber > 0) {
      const result = calculateCollatz(inputNumber);
      setCollatzData(result);
    }
  };

  // Prepare data for the chart
  const chartData = {
    labels: collatzData.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Collatz Sequence',
        data: collatzData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <>
      <h1>3n+1 Collatz Conjecture Simulation</h1>
      <div>
        Pick a number
        <div>
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
          />
          <button onClick={handleClick}>Generate Sequence</button>
        </div>
      </div>

      {/* Display chart if there is data */}
      {collatzData.length > 0 && (
        <div style={{ width: '600px', height: '400px', marginTop: '20px' }}>
          <Line data={chartData} />
        </div>
      )}
    </>
  );
}

export default App;
