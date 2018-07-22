import React, { Component } from 'react';
import AppBar from './AppBar';
import axios from 'axios';
// import { Link } from 'react-router-dom';


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //inputType spacifies blacklist or preferred
            inputType: "blacklist",
            //results changes from preferred to blacklist and is displayed in 'results'
            blacklist: [],
            //item is inputted through input box
            item: "",
            //favorites array comes in through backend and displayed
            favorites: [],
            favoritesID: [],
            profile: {}
        }
        this.blacklistChange = this.blacklistChange.bind(this);
        this.blacklistClick = this.blacklistClick.bind(this);
        this.removeBlacklistItem = this.removeBlacklistItem.bind(this);
    }
    //on mount get favs list, set to state
    componentWillUnmount() {
        // console.log(this.state, 'state leaving profile page')
    }



    getBlackList(){
        axios.get('/api/getBlacklist').then((res) => {
            console.log(res)
            if (res && res.data && res.data[0] && res.data[0].blacklist && res.data[0].blacklist.length > 0) {
                res = res.data[0].blacklist.split(',');
                while (!res[0]) {
                    res.shift()
                }
                this.setState({
                    blacklist: res
                })
            } else console.log(res, "res from getBlacklist not compatible")
        }).catch((err) => { console.log(err, 'err in blacklist retrieve') })
    }

    getFavorites(){
        axios.get(`/api/getFavorites`)
            .then((res) => {
                if (res && res.data && res.data[0] && res.data[0].user_favorites && res.data[0].user_favorites.length > 0) {
                    res = res.data[0].user_favorites.split(',');
                    while (!res[0]) {
                        res.shift()
                        console.log('loop')
                    }
                    this.setState({
                        favorites: res
                    })
                    console.log(this.state.favorites)
                }
                else console.log("res from getBlacklist not compatible")
                this.setState({
                    favorites: res
                })
            })
            .catch(err=>console.log(err))
    }

    componentWillMount() {
        axios('/api/getProfile')
            .then(
                (res) => {
                    if (!res.data.first || !res.data.last) {
                        this.props.history.push('/')
                    } else if (res.data) {
                        this.setState({
                            profile: res.data
                        })
                    }
                }
            )
            .then(this.getFavorites())
            .then(this.getBlackList());
    }



    //onClick
    removeBlacklistItem(index) {
        console.log(index)
        let type = this.state.inputType;
        let items = this.state[type];
        let removed = items.splice(index, 1)
        this.setState({
            [type]: items,
            item: ""
        })
        //needs type add or remove and string seperated by commas
        if (this.state.inputType === "blacklist") {
            let tempArray = { type: "remove", ingredients: removed };
            axios.post('/api/blacklist', tempArray).then(console.log('blacklist item removed')).catch((err) => { console.log(err) })
        } else { console.log("Unknown inputType on state", this.state) }
    }

    blacklistChange(value) {
        this.setState({
            item: value,
        })
    }

    blacklistClick() {
        let item;
        if (this.state.item) {
            item = this.state.item ? this.state.item : console.log('unknown error for input');

            if (this.state.blacklist) {
                let tempArray = this.state.blacklist
                tempArray.unshift(item);
                this.setState({
                    blacklist: tempArray,
                    item: ""
                })
                let addItem = { type: 'add', ingredients: item }
                //type: add, ingredients: "list, of, ingredients"
                axios.post('http://localhost:3005/api/blacklist', addItem)
                    .then(console.log('Item Added', addItem))
                    .catch((err) => { console.log(err) });
            }
        } else {
            alert('text field must not be blank')
        }
    }

    render() {
        //header right side of page
        let profileTitle = this.state.inputType === "Blacklist" ? "Blacklist" : this.state.inputType + "  Items";

        //results underneath the header that display blacklist items, or preferred items
        let results = () => {
            if (this.state && this.state.blacklist && this.state.blacklist.length > 0) {
                return this.state.blacklist.map((item, i) => {
                    return <span key={i} className="blacklist">{item}<button value={i} key={i} onClick={(e) => this.removeBlacklistItem(e.target.value)} className='blacklistbutton'>X</button></span>
                })
            } else
                return <p>No Results</p>
        }
        //favorites list retrieved from backend then displayed with recipe name and thumbnail, onclick you will be redirected to recipe, if no results, display an empty message...
        let favorites = this.state.favorites && this.state.favorites.length > 0 ?
            this.state.favorites.map((listItem, i) => {
                return <div key={listItem + i}>
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
                <div className='background'>

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
            </div>
        );
    }
}

export default ProfilePage;