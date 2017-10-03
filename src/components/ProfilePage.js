import React, { Component } from 'react';
import AppBar from './AppBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType:"",
            results:[],
            item:"",
            favorites:[]
        }
        this.blacklistChange = this.blacklistChange.bind(this);
        this.blacklistClick = this.blacklistClick.bind(this);
        this.preferredChange = this.preferredChange.bind(this);
        this.preferredClick = this.preferredClick.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    
    componentWillMount() {
        axios.get('/api/getFavorites').then((res)=>{
        // let fav=this.state.favorites;
        let favArray=res.split(',')
        this.setState({
            favorites:favArray
        })
        console.log(this.state.favorites)
    })
}
        

    removeItem(index){
        let items = this.state.results;
        items.splice(index, 1)
        this.setState({
            results:items,
            item:""
        })
        //if preferrences is added in at later date setting to sttate to item must me removed
        if (this.state.inputType === "Preferred"){
            axios.put('/api/addToBlacklist', items).then(console.log('preferred item added'));
        }else 
        if (this.state.inputType === "Blacklist"){
            axios.put('/api/removeFromBlacklist', items).then(console.log('blacklist item added'));
        }else 
        {console.log("Unknown inputType on state", this.state)}
    }

    blacklistChange(value){
        axios.get('/api/getBlacklist').then((res)=>{
            this.setState({
                results:res,
                inputType:"Blacklist",
                item:value,
            })
        })
    }
    blacklistClick(){
        if (!this.state.item) {alert('text field must not be blank')};
        let item = this.state.item;
        let tempArray = this.state.results;
        tempArray.unshift(item);
        this.setState({
            inputType:"Blacklist",
            results: tempArray,
            item:""
        })
        axios.put('/api/addToBlacklist').then(alert('Item Added'))
    }
    preferredChange(value){
        //axios get preferred list set to results
        this.setState({
            inputType:"Preferred",
            item:value
        })
    }
    preferredClick(){
        let item = this.state.item;
        let tempArray = this.state.results;
        tempArray.unshift(item);
        this.setState({
            inputType:"Preferred",
            results: tempArray,
            item:""
        })

        // axios.put('/api/preferredlist').then(alert('Item Added'))
    }
    
    render() {
        let profileTitle = !this.state.inputType ? "Welcome" : this.state.inputType + "  Items";
        let results = !this.state.results ? "No Results" :
        this.state.results.map((item, i)=>{
            return <div key={i} className="results">{item}<button key={i} onClick={(e)=>this.removeItem(e.target.key)}className='resultsbutton'>X</button></div>
        })

        let favorites = this.state.favorites && this.state.favorites.length>0 ? 
            this.state.favorites.map((listItem, i)=>{
                <div key={i}>
                <Link to='/details'><div key={i} className='imgDiv' >
                        <div onClick={(e)=> {this.handleFavIcon(listItem.recipe_id)}} className='favicon' >&#9829;</div>
                        <img alt={i}  key={listItem.recipe_id} onClick={()=>this.toggleDetailedView(listItem.recipe_id)} src={listItem.hero_photo_url}></img>
                    </div></Link>
                    <h3 className='resultsTitle'>{listItem.title}</h3>
                </div>
            }) : "Sorry no favorites to display";
        
        return (
            <div className='profilePageContainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>
                <div className='profileMainContainer'>
                    <span className='inputContainer'>
                        <input value={this.state.item} onChange={(e)=>{this.blacklistChange(e.target.value)}} className='profileinput input'type="text"/>
                        <button onClick={this.blacklistClick} className='profileinput input button'>Dislikes / Allergies</button>
                        {/*These are optional features not incorporated, like blacklist but 2nd tier search for ingredients*/}
                        {/* <input  onChange={(e)=>{this.preferredChange(e.target.value)}} className='profileinput input'type="text"/>
                        <button onClick={this.preferredClick} className='profileinput input button'>Add Preferred Ingredient</button> */}
                        {/* <input  className='profileinput input'type="text"/>
                        <button className='profileinput input button'></button> */}
                    </span>
                    <span className='rightSide'>
                        {profileTitle}
                        <div className='resultText'>{results}</div>
                        <span className='profilefavorites'>
                            {favorites}
                        </span>
                    </span>
                </div>
            </div>
        );
    }
}

export default ProfilePage;