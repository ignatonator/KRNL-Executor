import { useState, useEffect } from 'react'
import {Routes, Route, } from "react-router-dom";
import Header from './components/Header'
import Question from './components/Question'
import Results from './components/Results'
import UserForm from './components/UserForm'
import {UserProvider} from "./components/UserContext";
import './App.css'
const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    "question": "Which natural element resonates with you the most?",
    "options": ["Flames of Fire 🔥", "Waves of Water 🌊", "Ground of Earth 🌍", "Breeze of Air 🌬️"]
  },
  {
    "question": "What kind of environment would you prefer to explore?",
    "options": ["A volcanic terrain 🌋", "A tranquil lake 🌅", "A lush forest 🌲", "A windy mountain peak 🏔️"]
  },
  {
    "question": "Which mythical creature fascinates you the most?",
    "options": ["Phoenix 🐦‍🔥", "Mermaid 🧜‍♀️", "Golem 🪨", "Sylph 🌬️"]
  },
  {
    "question": "What weather do you enjoy the most?",
    "options": ["Warm and sunny ☀️", "Rainy and calm 🌧️", "Cool and grounded 🌤️", "Windy and refreshing 🍃"]
  },
  {
    "question": "If you could control one power, which would it be?",
    "options": ["Fire manipulation 🔥", "Water bending 🌊", "Earth shaping 🪨", "Air control 💨"]
  }
];

const keywords = {
  Fire: "sun",
  Water: "water",
  Earth: "landscape",
  Air: "sky",
};

const elements = {
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  "Flames of Fire 🔥": "Fire",
  "Waves of Water 🌊": "Water",
  "Ground of Earth 🌍": "Earth",
  "Breeze of Air 🌬️": "Air",
  "A volcanic terrain 🌋": "Fire",
  "A tranquil lake 🌅": "Water",
  "A lush forest 🌲": "Earth",
  "A windy mountain peak 🏔️": "Air",
  "Phoenix 🐦‍🔥": "Fire",
  "Mermaid 🧜‍♀️": "Water",
  "Golem 🪨": "Earth",
  "Sylph 🌬️": "Air",
  "Warm and sunny ☀️": "Fire",
  "Rainy and calm 🌧️": "Water",
  "Cool and grounded 🌤️": "Earth",
  "Windy and refreshing 🍃": "Air",
  "Fire manipulation 🔥": "Fire",
  "Water bending 🌊": "Water",
  "Earth shaping 🪨": "Earth",
  "Air control 💨": "Air"
};

function App() {
  const[currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
  const[answers,setAnswers]=useState([]);
  const[userName,setUserName]=useState("");
  const[element,setElement]=useState("");
  const[artwork,setArtwork]=useState(null);
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  }
  useEffect(
      function () {
        if (currentQuestionIndex === questions.length) {
          const selectedElement = determineElement(answers);
          setElement(selectedElement);
          fetchArtwork(keywords[selectedElement]);
        }
      },
      [currentQuestionIndex]
  )
  async function fetchArtwork(requestString) {
    try {

      console.log("Requesting artwork for:", requestString);
      const search = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${requestString}&isOnView=true`);
      const data1 = await search.json();
      const len=data1.objectIDs.length-1;
      const randomIndex=Math.floor(Math.random() * len );
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data1.objectIDs[randomIndex]}`);
      const data = await response.json();
      if (data) {
        setArtwork(data);
      } else {
        setArtwork(null);
      }

    } catch (error) {
      console.error("Error fetching artwork:", error);
      setArtwork(null);
    }
  }
  return (
      <div className='App'>
        <UserProvider value={{name: userName, setName: setUserName}}>
          <Header/>
          <Routes>
            <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit}/>}/>
            <Route
                path="/quiz"
                element={
                  currentQuestionIndex < questions.length ? (
                      <Question question={questions[currentQuestionIndex].question}
                                options={questions[currentQuestionIndex].options} onAnswer={handleAnswer}/>
                  ) : (
                      <Results element={keywords[element]} artwork={artwork}/>
                  )
                }
            />
          </Routes>
        </UserProvider>
      </div>
  )
}

export default App
