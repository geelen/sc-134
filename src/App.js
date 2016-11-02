import React, { Component } from 'react';
import logo from './logo.svg';

import styled, { keyframes, css } from 'styled-components'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Outer = styled.div`
  text-align: center;
`

const Header = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`

const Logo = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 80px;
  ${ props => props.sneaky && css`
    &:hover {
      animation-play-state: paused;
    }
  `}
`

const Intro = styled.p`
  font-size: large;
`

const Box = styled.div`
  margin: 2rem auto;
  width: 360px;
  height: 360px;
  background: hsl(
    ${props => props.hue}, 
    ${props => 50 + props.luminosity / 2}%, 
    ${props => props.luminosity}%
  );
`

class App extends Component {
  state = {
    hue: 0, luminosity: 0
  }
  mouseMove = (e) => {
    const { pageX, pageY } = e
    const { left, top } = this.elem.getBoundingClientRect()
    this.setState({
      hue: Math.round(pageX - left - window.scrollX),
      luminosity: Math.round(100 * (pageY - top - window.scrollY) / 360)
    })
  }

  render() {
    return (
      <Outer>
        <Header>
          <Logo src={logo} alt="logo" />
          <Logo sneaky src={logo} alt="logo" />
          <h2>Welcome to React</h2>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
        <Box innerRef={elem => this.elem = elem}
             hue={this.state.hue}
             luminosity={this.state.luminosity}
             onMouseMove={this.mouseMove}/>
      </Outer>
    );
  }
}

export default App;
