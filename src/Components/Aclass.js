import React, { Component } from 'react';

class Three extends Component {

  handelOnClick = () => {
    const { clickAll, clickProcessing, clickDone, currentA } = this.props
    switch (currentA) {
      case 'All':
        clickAll();
        break
      case 'Processing':
        clickProcessing();
        break
      case 'Done':
        clickDone();
        break
    }
  }

  render() {
    const { currentA, className } = this.props
    return (
      <a className={className} onClick={this.handelOnClick} >{currentA}</a>
    );
  }
};


export default Three;


