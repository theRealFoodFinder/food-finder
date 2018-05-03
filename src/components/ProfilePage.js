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
        this.removeItem = this.removeItem.bind(this);
    }
    //on mount get favs list, set to state
    componentWillUnmount() {
        // console.log(this.state, 'state leaving profile page')
    }


    componentWillMount() {
        axios('/api/getProfile').then(
            (res) => {
                if (!res.data.first || !res.data.last) {
                    this.props.history.push('/')
                } else if (res.data) {
                    // console.log(res.data)
                    this.setState({
                        profile: res.data
                    })
                }
            }
        ).then(
            axios.get('/api/getfavorites').then(
                (res) => {
                    console.log(res.data[0], 'res return')
                //     let favArray = [];
                //     let favIDArray = [];
                res= {data:[{user_favorites:',,dsf,test,123'}]}
                //test data, comment out when working
                    // console.log(res.data[0].user_favorites, 'favs')
                    if (res && res.data && res.data[0] && res.data[0].user_Favorites && res.data[0].user_Favorites.length > 0) {
                        res = res.data[0].user_Favorites.split(',');
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
                }
            )
            ).then(
            axios.get('/api/getBlacklist').then((res) => {
                // console.log(res.data[0].blacklist, 'line63profile')
                if (res && res.data && res.data[0] && res.data[0].blacklist && res.data[0].blacklist.length > 0) {
                    res = res.data[0].blacklist.split(',');
                    while (!res[0]) {
                        res.shift()
                    }
                    this.setState({
                        results: res
                    })
                } else console.log(res, "res from getBlacklist not compatible")
            })).catch((err) => { console.log(err, 'err in blacklist retrieve') })
    }



    //onClick 
    removeItem(index) {
        console.log(index)
        let items = this.state.results;
        let removed = items.splice(index, 1)
        this.setState({
            results: items,
            item: ""
        })
        //needs type add or remove and string seperated by commas
        if (this.state.inputType === "Blacklist") {
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
        if (!this.state.item) { alert('text field must not be blank') };
        let item = this.state.item ? this.state.item : console.log('unknown error for input');
        if (this.state.results) {
            let tempArray = this.state.results
            tempArray.unshift(item);
            this.setState({
                results: tempArray,
                item: ""
            })
            let tempObj = {};
            tempObj = { type: 'add', ingredients: item }
            //type: add, ingredients: "list, of, ingredients"
            axios.post('/api/blacklist', tempObj).then(console.log('Item Added', tempObj)).catch((err) => { console.log(err) });
        }
    }

    render() {
        //header right side of page
        let profileTitle = this.state.inputType === "Blacklist" ? "Blacklist" : this.state.inputType + "  Items";

        //results underneath the header that display blacklist items, or preferred items
        let results = () => {
            if (this.state && this.state.results && this.state.results.length > 0) {
                return this.state.results.map((item, i) => {
                    return <span key={i} className="results">{item}<button value={i} key={i} onClick={(e) => this.removeItem(e.target.value)} className='resultsbutton'>X</button></span>
                })
            } else
                return <p>No Results</p>
        }
        //favorites list retrieved from backend then displayed with recipe name and thumbnail, onclick you will be redirected to recipe, if no results, display an empty message...
        let favorites = this.state.favorites && this.state.favorites.length > 0 ?
            this.state.favorites.map((listItem, i) => {
                console.log(listItem)
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