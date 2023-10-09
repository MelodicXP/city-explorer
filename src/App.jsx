import React from 'react'
import './App.css'
import Header from './components/Header'
import UserForm from './components/UserForm.jsx'
import Footer from './components/Footer'




class App extends React.Component {

  constructor() {
    super(); // Activates React.Component
  }

  
  render() {
    return (
      <>
        <Header />

        <UserForm />
        
        <Footer /> 
      </>
    )
  }
}

export default App
