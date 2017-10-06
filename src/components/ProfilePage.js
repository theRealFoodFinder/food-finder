import React, { Component } from 'react';
import AppBar from './AppBar';
import axios from 'axios';
// import { Link } from 'react-router-dom';


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //inputtype spacifies blacklist or preferred
            inputType:"",
            //results changes from preferred to blacklist and is displayed in 'results'
            results:[],
            //item is inputted through input box
            item:"",
            //favorites array comes in through backend and displayed
            favorites:[],
            favoritesID: []
        }
        this.blacklistChange = this.blacklistChange.bind(this);
        this.blacklistClick = this.blacklistClick.bind(this);
        this.preferredChange = this.preferredChange.bind(this);
        this.preferredClick = this.preferredClick.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    //on mount get favs list, set to state
    componentWillMount() {
        axios.get('http://localhost:3005/api/getfavorites').then((res)=>{
        let favArray = [];
        let favIDArray = []
       for (let i=0; i < res.data.length; i++){
           favArray.push(res.data[i].title)
           favIDArray.push(res.data[i].recipe_id)
       }
        this.setState({
            favorites:favArray,
            favoritesID:favIDArray
        })
    })
    axios.get('http://localhost:3005/api/getBlacklist').then((res)=>{
        console.log(res)
    })
}
        
//onClick 
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
        this.setState({
            inputType:"Blacklist",
            item:value,
        })
        axios.get('/api/getBlacklist').then((res)=>{
            this.setState({
                results:res,
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
        //header right side of page
        let profileTitle = !this.state.inputType ? "Welcome" : this.state.inputType + "  Items";
        //results underneath the header that states welcome, blacklist items, or preferred items
        let results = !this.state.results ? "No Results" :
        this.state.results.map((item, i)=>{
            return <div key={i} className="results">{item}<button key={i} onClick={(e)=>this.removeItem(e.target.key)}className='resultsbutton'>X</button></div>
        })
        //favorites list retrieved from backend then displayed on left side of screen with recipe name and thumbnail, onclick you will be redirected to recipe, if no results, display an empty message...
        let favorites = this.state.favorites && this.state.favorites.length>0 ? 
            this.state.favorites.map((listItem, i)=>{
                console.log(listItem)
               return   <div>
                            {/* <Link to='/details'><div key={i} className='imgDiv' >
                            <div onClick={(e)=> {this.handleFavIcon(listItem.recipe_id)}} className='favicon' >
                                &#9829;
                            </div>
                            <img alt={i}  key={listItem.recipe_id} onClick={()=>this.toggleDetailedView(listItem.recipe_id)} src={listItem.hero_photo_url}></img>
                            </div></Link> */}
                            <a href="/recipe">
                                <h3 key={this.state.favoritesID[i]} className='resultsTitle'>
                                    {listItem}
                                </h3>
                            </a>
                         </div>
            }) : <p>Sorry no favorites to display</p>
        
        return (
            <div className='profilePageContainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>
                <div className='profileMainContainer'>
                    <div className='profileleftSide'>
                    <span className='profilefavorites'>
                        <span>
                            Favorites
                        </span>
                        {favorites}
                    </span>
                    <span className='inputContainer'>
                        <input value={this.state.item} onChange={(e)=>{this.blacklistChange(e.target.value)}} className='profileinput input'type="text"/>
                        <button onClick={this.blacklistClick} className='profileinput input button'>Dislikes / Allergies</button>
                        {/*These are optional features not incorporated, like blacklist but 2nd tier search for ingredients*/}
                        {/* <input  onChange={(e)=>{this.preferredChange(e.target.value)}} className='profileinput input'type="text"/>
                        <button onClick={this.preferredClick} className='profileinput input button'>Add Preferred Ingredient</button> */}
                        {/* <input  className='profileinput input'type="text"/>
                        <button className='profileinput input button'></button> */}
                    </span>
                    </div>
                    <span className='rightSide'>
                        {profileTitle}
                        <div className='resultText'>
                            {results}
                        </div>
                    </span>
                </div>
            </div>
        );
    }
}

export default ProfilePage;