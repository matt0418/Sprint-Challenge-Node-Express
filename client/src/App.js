import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'


class App extends Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    axios
      .get(`http://localhost:4000/api/projects/`)
      .then(res => {
        console.log(res)
        this.setState({
          projects: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })

  }

  render() {
    return (
      <div className="App">
        {this.state.projects.map(project => {
          return(
            <div>
              <strong><p>{project.name}</p></strong>
              <p>{project.description}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
