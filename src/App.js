import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

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

  deletePersonHandler = (personIndex) => {
    // Copy array (avoid mutating)
    const persons = this.state.persons.slice();

    persons.splice(personIndex,1);
    this.setState(this.state.persons: persons);
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.doesShow) {
      // use key property in person to improve efficiency
      persons = (
        <div>
            {this.state.persons.map((person) => {
              return <Person name={person.name} age={person.age} 
              click={this.deletePersonHandler} key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
            })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Test</h1>
        <button
         style={style} 
         onClick={this.togglePersonsHandler}>Switch person</button>
        {persons}          
      </div>
    );
  }
}

export default App;
