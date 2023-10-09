import React from 'react';


class Explorer extends React.Component {
  
  constructor (props) {

    super(props); // Activates React.Component
    

  }

  render () {

     // Write props passed in from parent in one line, instead of 'this.props' everytime used
     let { displayName, latitude, longitude } = this.props

    return (
      <>
        <main>
          <ul>
            <li>{displayName}</li>
            <li>{latitude}</li>
            <li>{longitude}</li>
          </ul>
        </main>
      </>
    );

  }
}

export default Explorer;