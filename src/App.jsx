import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import UserForm from './components/UserForm.jsx'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <Header />

      <UserForm />
      
      <Footer /> 
    </>
  )
}

export default App
