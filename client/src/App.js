import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 45px;
  background: green;
  color: white;
  padding-top: 4%;
  margin-top: -2%;
  margin-bottom: 5%;
  padding-bottom: 3%;
`

const StyledContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    width: 80%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background: cornsilk;
    padding: 2% 5%;
`

const ProjectCard = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    width: 43%;
    margin: 3%;
    background: white;
`

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
      <div>
        <StyledHeader>Projects</StyledHeader>
        <StyledContainer>
          {this.state.projects.map(project => {
            return(
              <ProjectCard>
                <strong><p>{project.name}</p></strong>
                <p>{project.description}</p>
              </ProjectCard>
            )
          })}
        </StyledContainer>
      </div>
      
    );
  }
}

export default App;
