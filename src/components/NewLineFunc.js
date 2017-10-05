import React, { Component } from 'react';

class NewLineFunc extends Component{
    render(){
        const output = newLineFormating(this.props.string)

        return(
            <div>
                {output}
            </div>
        )
    }
}

function newLineFormating(str) {
    return str.split(/\n/g).map((c,i)=>c===""? <br key={i}/> : <p key={i}>{c}</p>);
}

export default NewLineFunc;