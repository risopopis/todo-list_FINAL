import React, { Component } from "react";
import PropTypes from 'prop-types'
import { min } from "date-fns/esm";
import classNames from "classnames";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.props.sec,
      timerActive: this.props.timerActive,
      minuts: this.props.min 
    };
  }

  // componentDidUpdate(prevProps, prevState){
  //   const {timerActive} = this.state
  //   if (timerActive && prevState !== this.state) {
  //     this.setState({
  //       timerActive: !timerActive
  //     })
  //   }
  // }

  timerSwitch(){
    const {timerActive} = this.state
    this.setState({ timerActive: !timerActive });
     setInterval(() => {
      this.timerSec();
    }, 10)
   
  }

  timerSec() {
    let { seconds, timerActive } = this.state;
    if (seconds > 0 && timerActive) {
      setTimeout(() => {
        this.setState({
          seconds: seconds - 1
      })}, 1000)
    }
  }

  render() {
    let { seconds, minuts, timerActive } = this.state;
    return (
      <div>
        {seconds ? (
          <div>
            <button
            className="icon-play" 
              onClick={() =>
              this.timerSwitch()
              }
            >
        </button>
            <span>{minuts} min and {seconds} sec </span>
          </div>
        ) : minuts>=1 ? 
        (this.setState({seconds: seconds + 60,
          minuts: minuts-1, 
          })) : (
          <span> время вышло!</span>
        )}
            <button className="icon-pause" onClick={()=>{
              this.setState({
                timerActive: !timerActive
              })
            }
            }
               ></button>
      </div>
    );
  }
}


Timer.propTypes ={
  min: PropTypes.number,
  sec: PropTypes.number,
  timerActive: PropTypes.bool
}