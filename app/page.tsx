"use client"

import { useState } from "react";
import speak from "@/utils/speak";

const Game: React.FC=()=>{
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 101))
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")
  const [guesslog, setGuesslog] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);


const handleNumberClick = (num: string) => setGuess((prev) => prev + num);
 
  const handleSubmit = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("Please enter a valid number.");
      speak("Please enter a valid number.");
      setGuess("");
      return;
    }

    setGuesslog((prev) => [...prev, num]);
    setError(null);

    try {
        if (num < secretNumber) {
           speak("The value entered is too low, try again!");
            throw new Error("The value entered is too low, try again!");
           
          
        }
        else if (num > secretNumber) {
            speak("The value entered is too high, try again!");
             throw new Error("The value entered is too high, try again!");
                  
        }
        else {
            setMessage(`You got it right! The number was ${num}. Total attempts: ${attempts + 1}`);
            speak(`Congratulations! You got it right! The number was ${num}`);
            }
            setGuess("")
            setGuesslog([])


    } catch (error) {
        if (error instanceof Error) {
            setMessage(`${error.message}`);
        } else {
            setMessage(`Unexpected error: ${error}`);
        }
    }finally{
        setAttempts((prev) => prev + 1);
        setGuess("");
    }
}

 // New Game handler
  const startNewGame = () => {
    const newSecret = Math.floor(Math.random() * 101);
    setSecretNumber(newSecret);
    setGuesslog([]);
    setGuess("");
    setAttempts(0);
    setMessage("");
    speak("New game started! Try to guess the new number.");
  };


const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

return(
  <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-4 rounded-3xl shadow-2xl">
    <div className="max-w-md flex flex-col items-center justify-center border-8 border-purple-400 rounded-3xl bg-white p-6 shadow-lg mb-6 w-full">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700 mb-6 text-center">🎯 Guess Game</h1>

    <p className="max-w-md w-full text-center text-gray-700 mb-4 px-3 py-2 rounded-lg bg-yellow-50 shadow-sm">🎯 Guess the <span className="text-red-600 font-semibold">secret number</span> between 0 and 100. Try to get it right in as few attempts as possible, good luck!</p>
    <div className="mb-4 w-full max-w-xs">      
      <div className="flex flex-col items-center mb-2 gap-2">
        {/* New game */}
        <button 
        onClick={startNewGame}
        className="mt-2 bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-500 transition transform hover:scale-105"
        >New Game
    </button>

        <p className="w-full text-sm sm:text-lg mb-2 text-center text-blue-800 font-sans mt-5">
            Current Guess: <span className="font-mono text-purple-700 border border-gray-200 px-4 py-2">{guess || "-"}</span>
        </p>

      
      </div>

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

{/* Log guessed numbers */}
     <p className="text-lg sm:text-sm font-semibold mb-2 text-center text-gray-700">Guessed Numbers</p>
    <div className="flex items-center justify-center gap-2 mb-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
       {guesslog.length === 0 ? (
      <span className="text-gray-400 italic col-span-full text-center">No guesses yet</span>
      ) : (
      guesslog.map((g, idx) => (
      <span
        key={idx}
        className="px-3 py-2 bg-purple-200 text-purple-800 rounded-lg shadow font-mono text-center"
      >
        {g}
      </span>
    ))
  )}
    </div>
    </div>
  </div>
)
}
export default Game;