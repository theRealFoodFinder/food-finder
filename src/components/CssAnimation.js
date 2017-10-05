import React, { Component } from 'react';


class CssAnimation extends Component {
    constructor(props){
        super(props);
        this.state={
             csseffect: false
      }
      this.handleSearch=this.handleSearch.bind(this)
    }

handleSearch(){
    console.log(this.props);
    this.setState({csseffect: !this.state.csseffect});
    setTimeout(_=> {
        this.props.history.push('/results')
    }, 1000);
}

    render() {
        return (
            <div>
                    <button className={this.state.csseffect && 'dothateffect'} onClick={this.handleSearch}>Visit Recipe</button>
            </div>
        );
    }
}

export default CssAnimation;