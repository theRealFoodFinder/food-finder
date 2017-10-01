import React, { Component } from 'react';
import Sidebar from './Sidebar';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    
    
    

   
        

    render() {
        console.log('this.props', this.props)
        
        let renderHistory;
        if (this.props.historyLog && this.props.historyLog.length>0){
            console.log('this.props', this.props)
            let id, title;
            renderHistory = this.props.historyLog.map((item, i) => {
                id = item.recipe_id;
                title = item.title;
                return <div className="historyItem" key={id}>{title}</div>
            })
        }
        
    
        return (
            <div>
            <Sidebar />
                History Page
                {renderHistory}
            </div>
        );
    }
}

export default History;