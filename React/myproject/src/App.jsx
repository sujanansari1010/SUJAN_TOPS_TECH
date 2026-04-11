import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
 
 let num=6;  
  let fact=1;

  for (let i=1; i<=num; i++) {
    fact = fact*i;
  }

  return (
    <>
      <h1>Number : {num}</h1>
      <h1>Factorial : {fact}</h1>
      
    </>
  )
}

export default App
