import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

// Use radium to put hover properties in style
// Styleroot is used for enabling css media query as in Person.js
// import Radium, { StyleRoot } from 'radium';

// needed to do the css thing (style.button``)
import styled from 'styled-components';


// use props.alt defined when <StyledButton> element is made
const StyledButton = styled.button`

  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

class App extends Component {
  
  state = {
    persons: [
      {id: '1', name: 'Max', age: 28},
      {id: '2', name: 'Manu', age: 29},
      {id: '3', name: 'Stephanie', age: 26},
      
    ]
  }




  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    // copy of person to change
    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    // copy of state.persons
    const persons = [...this.state.persons];

    persons[personIndex] = person;

    this.setState( {
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    this.setState({
      doesShow: !this.state.doesShow
    })
  }

  deletePersonHandler = (personId) => {
    // Copy array (avoid mutating)

    const persons = this.state.persons.slice();

    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === personId;
    });
    console.log(personIndex);

    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    const classes = [];

    if(this.state.persons.length <= 2) {
      classes.push('red');
    }

    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }


    let persons = null;

    if(this.state.doesShow) {
      // use key property in person to improve efficiency
      persons = (
        <div>
            {this.state.persons.map((person) => {
              return <Person name={person.name} age={person.age} 
              click={() => this.deletePersonHandler(person.id)} key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
            })}
        </div>
      )
      style.backgroundColor = 'red';
      style[':hover']= {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    return (
      // to use styleroot, wrap in this element
      // <StyleRoot>
        <div className="App">
          <h1>Test</h1>
          <p className={classes.join(' ')}>This is really workin!</p>
          <StyledButton onClick={this.togglePersonsHandler} alt={this.state.doesShow}>
          Switch person</StyledButton>
          {persons}          
        </div>
      // </StyleRoot>
    );
  }
}

export default App;
