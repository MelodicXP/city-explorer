import React from 'react';

class Header extends React.Component {

  constructor(props) {

    super(props); // Activates React.Component
    
  }

  render() {

    return (
      <header>
        <h1>City Explorer</h1>
      </header>
    )
  }

}

export default Header;