import React, { Component } from 'react';
import AppBar from './AppBar';
import axios from 'axios';
// import { Link } from 'react-router-dom';


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //inputtype spacifies blacklist or preferred
            inputType: "Blacklist",
            //results changes from preferred to blacklist and is displayed in 'results'
            results: [],
            //item is inputted through input box
            item: "",
            //favorites array comes in through backend and displayed
            favorites: [],
            favoritesID: [],
            profile: {}
        }
        this.blacklistChange = this.blacklistChange.bind(this);
        this.blacklistClick = this.blacklistClick.bind(this);
        this.preferredChange = this.preferredChange.bind(this);
        this.preferredClick = this.preferredClick.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    //on mount get favs list, set to state
componentWillUnmount() {
    
}


    componentWillMount() {
        axios('/api/getProfile').then((res) => {
            if (!res.data.first || !res.data.last) {
                this.props.history.push('/')
            } else if (res.data){
                console.log(res.data)
            this.setState({
                profile: res.data
            })}
        }
        )
        axios.get('http://localhost:3005/api/getfavorites').then((res) => {
            let favArray = [];
            let favIDArray = [];
            if (res && res.data && res.data.length > 0) {
                for (let i = 0; i < res.data.length; i++) {
                    favArray.push(res.data[i].title)
                    favIDArray.push(res.data[i].recipe_id)
                }
                this.setState({
                    favorites: favArray,
                    favoritesID: favIDArray
                })
            }
        }).catch((err)=>{console.log(err)})
        axios.get('http://localhost:3005/api/getBlacklist').then((res) => {
            if (res && res.data && res.data.length > 0) {
                this.setState({
                    results: res.data
                })
            }
        }).catch((err)=>{console.log(err)})
    }



    //onClick 
    removeItem(index) {
        let items = this.state.results;
        let removed = items.splice(index, 1)
        this.setState({
            results: items,
            item: ""
        })
        // if (this.state.inputType === "Preferred") {
            //     axios.put('/api/blacklist', items).then(console.log('preferred item removed'));
            // } else
            //needs type add or remove and string seperated by commas
            if (this.state.inputType === "Blacklist") {
                let tempArray = {items:"remove",ingredients:removed};
                axios.put('/api/blacklist', tempArray).then(console.log('blacklist item removed')).catch((err)=>{console.log(err)})
            } else { console.log("Unknown inputType on state", this.state) }
    }

    blacklistChange(value) {
        if (typeof value === 'string') {
            this.setState({
                inputType: "Blacklist",
                item: value,
            })
        }
        axios.get('/api/getBlacklist').then((res) => {
            if (res.data) {
                this.setState({
                    results: res.data,
                })
            }
        }).catch((err)=>{console.log(err)})
    }

    blacklistClick() {
        if (!this.state.item) { alert('text field must not be blank') };
        let item = this.state.item;
        if (this.state.results) {
            let tempArray = this.state.results
            tempArray.unshift(item);
            this.setState({
                inputType: "Blacklist",
                results: tempArray,
                item: ""
            })
            axios.put('/api/addToBlacklist').then(console.log('Item Added')).catch((err)=>{console.log(err)});
        }
    }

    preferredChange(value) {
        if (typeof value === 'string') {
            axios.put('/api/addToBlacklist').catch((err)=>{console.log(err)});
            this.setState({
                inputType: "Preferred",
                item: value
            })
        }
    }

    preferredClick() {
        if (this.state.results && this.state.item) {
            let item = this.state.item;
            let tempArray = this.state.results;
            tempArray.unshift(item);
            this.setState({
                inputType: "Preferred",
                results: tempArray,
                item: ""
            })
            axios.put('/api/preferredlist').then(alert('Item Added')).catch((err)=>{console.log(err)})
        }
    }

    render() {
        //header right side of page
        let profileTitle = this.state.inputType === "Blacklist" ? "Blacklist" : this.state.inputType + "  Items";

        //results underneath the header that display blacklist items, or preferred items
        let results =()=>{
            if (this.state && this.state.results && this.state.results.length > 0) {
                return this.state.results.map((item, i) => {
                    return <span key={i} className="results">{item}<button key={i} onClick={(e) => this.removeItem(e.target.key)} className='resultsbutton'>X</button></span>
                })
            } else
                return <p>No Results</p>
        }
        //favorites list retrieved from backend then displayed on left side of screen with recipe name and thumbnail, onclick you will be redirected to recipe, if no results, display an empty message...
        let favorites = this.state.favorites && this.state.favorites.length > 0 ?
            this.state.favorites.map((listItem, i) => {
                console.log(listItem)
                return <div>
                    {/* <Link to='/details'><div key={i} className='imgDiv' >
                            <div onClick={(e)=> {this.handleFavIcon(listItem.recipe_id)}} className='favicon' >
                                &#9829;
                            </div>
                            <img alt={i}  key={listItem.recipe_id} onClick={()=>this.toggleDetailedView(listItem.recipe_id)} src={listItem.hero_photo_url}></img>
                            </div></Link> */}
                    <a href="/recipe">
                        <li key={this.state.favoritesID[i]} className='resultsTitle'>
                            ◦ {listItem}
                        </li>
                    </a>
                </div>
            }) : <p>Sorry no favorites to display</p>

        return (

            <div className='profilePageContainer'>

                <div className='allappbarcomponents'>
                    <AppBar />
                </div>

                <div className='MainProfilePageContainer'>

                    <div id='welcome'>
                        <div className='welcomebacktitle'>
                            Welcome back {this.state.profile.first}!
                </div>

                        <div className='profilefavorites'>
                            <div className='favoriteTitle'>
                                Your Favorites
                        </div>
                            <div className='favoriteBody'>
                                {favorites}
                            </div>
                        </div>

                        <div className='blacklist'>

                            <div className='blacklistinput'>
                                {profileTitle} :
                        <input placeholder=' ex: gluten' value={this.state.item} onChange={(e) => { this.blacklistChange(e.target.value) }} className='profileinput input' type="text" />
                            </div>

                            <div className='dislikebutton'>
                                <button onClick={this.blacklistClick} className='dislikeAllergyButton'>Dislikes / Allergies</button>
                            </div>
                            {/*These are optional features not incorporated, like blacklist but 2nd tier search for ingredients*/}
                            {/* <input  onChange={(e)=>{this.preferredChange(e.target.value)}} className='profileinput input'type="text"/>
                        <button onClick={this.preferredClick} className='profileinput input button'>Add Preferred Ingredient</button> */}
                            {/* <input  className='profileinput input'type="text"/>
                        <button className='profileinput input button'></button> */}
                        </div>

                        <div className='resultText'>
                            <div>
                                {results()}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default ProfilePage;