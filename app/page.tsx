"use client"

import { useState } from "react";

const Game: React.FC=()=>{
  const [secretNumber] = useState(Math.floor(Math.random() * 101))
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")


// Custom exceptions
class ValueTooHighError extends Error {
    constructor(message = "The value entered is too high!") {
        super(message);
        this.name = "ValueTooHighError";
    }
}

class ValueTooLowError extends Error {
    constructor(message = "The value entered is too low!") {
        super(message);
        this.name = "ValueTooLowError";
    }
}

const handleNumberClick = (num: string) => setGuess((prev) => prev + num);
  const handleClear = () => setGuess("");

  const handleSubmit = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("Please enter a valid number.");
      setGuess("");
      return;
    }

    try {
        if (isNaN(num)) {
            setMessage("Please enter a valid number.");
            return;
        }

        if (num < secretNumber) {
            throw new ValueTooLowError();
          
        }
        else if (num > secretNumber) {
            throw new ValueTooHighError();
            
        }
        else {
            setMessage(`You got it right! The number was ${num}. Total attempts: ${attempts + 1}`);
            }
    } catch (error) {
        if (error instanceof ValueTooHighError || error instanceof ValueTooLowError) {
            setMessage(`${error.message}`);
        } else {
            setMessage(`Unexpected error: ${error}`);
        }
    }finally{
        setAttempts((prev) => prev + 1);
        setGuess("");
    }
}

const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

return(
  <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-4 border-8 border-purple-400 rounded-3xl shadow-2xl">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700 mb-6 text-center">🎯 Guess Game</h1>

    <p className="w-full text-center text-gray-700 mb-4 px-3 py-2 rounded-lg bg-yellow-50 shadow-sm">🎯 Guess the <span className="text-red-600 font-semibold">secret number</span> between 0 and 100. Click the numbers below to enter your guess, then press "Submit Guess". Try to get it right in as few attempts as possible</p>
    <div className="max-w-md flex flex-col items-center justify-center">
      <p className="w-full text-lg sm:text-xl font-semibold mb-2 text-center text-green-600"
      > Current guess: <span className="font-mono text-gray-800">{guess || "-"}</span>
      </p>

      <p className="w-full text-center font-bold mb-2 px-2 py-2 rounded-lg bg-purple-100 text-purple-700 shadow-lg">Attempts: {attempts}</p>
    </div>
    
    <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-4 w-full max-w-xs">
      {numbers.map((num)=>(
        <button 
        key={num} 
        onClick={()=>handleNumberClick(num)}
        className="bg-pink-400 text-white font-bold py-3 sm:py-3 rounded-lg shadow-lg hover:bg-pink-500 transition transform hover:scale-105 text-lg sm:text-xl"
        >{num}
        </button>
      ))}

      <div className="col-span-5 grid grid-cols-2 gap-2 sm:gap-4">
      
      <button onClick={handleSubmit}
      className="col-span-3 bg-green-400 text-white font-bold py-4 sm:py-5 rounded-lg shadow-lg hover:bg-green-500 transition transform hover:scale-105 text-lg sm:text-xl"
      >Submit Guess
      </button>
      </div>
      
    </div>
    <p className={`w-full text-base sm:text-lg font-semibold mb-0 text-center px-3 py-2 rounded-lg shadow ${
    message.includes("right")
      ? "bg-green-100 text-green-700"
      : message.includes("🔴")
      ? "bg-red-100 text-red-600"
      : message.includes("🔵")
      ? "bg-blue-100 text-blue-600"
      : "bg-yellow-50 text-gray-700"
  }`}> {message}</p>
  </div>
)
}
export default Game;