import React, { Component } from 'react'
// import axios from 'axios';
import SearchModal from './SearchModal'



export default class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: "",
            profile: {
                cuisine: "",
                blacklist: "",
            },

        //     user_preferences: {
        //         cuisine(country of origin),
        //         mainIngredient: '',
        //         moreIngredients: [],
        //         nutrition_info: [
        //         calories, (range)
        //         total_fat, (range)
        //         sodium, (range)
        //         carbs, (range)
        //         sugar, (range)
        //         protein (range)
        //     ]
        // }
            filterModal: false,
            searchResults: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handlemenu = this.handlemenu.bind(this);
    }

    handlemenu(){
        //menu display javascript
    }

    handleFilter(filterModal) {
        filterModal = this.state.filterModal
        this.setState({
            filterModal: !filterModal
        })
    }

    handleSearch() {
       
        // let profile = this.state.profile

        //delete for testing only
        let res = [{ 
            "Title": "Teriyaki Chicken", 
            "Cuisine": "Japanese", 
            
            },
            {
                "Title": "Orange Chicken", 
                "Cuisine": "Greek", 

            }
        ]
               //delete for testing only
               console.log(res)
               
        
        // axios.post('/api/getRecipes', { profile }).then((res) => {
            this.setState({
                searchResults: res
            // })
        })
        console.log(this.state.searchInput)

    }
    handleChange(e) {
        this.setState({
            searchInput: e
        })
        console.log(this.state.searchInput)
    }


    //getting profile info from backend to put on state to prefill filters
    componentWillMount(res) {
        // axios.get('/api/getProfile').then((res) => {
        //     this.setState({
        //         profile: res
        //     })
            console.log('from willmount')
        // })

    }

    render() {




        return (
            <div className='SearchPageContainer'>
                <div onClick={this.handlemenu} className='menubutton'></div>


                <div id='mainSearchContainer'>
                    <div className='searchTitle'>
                        Main Ingredient Search
                    </div>
                    <div id='searchButtonContainer' >
                        <button onClick={this.handleFilter} className='SearchPage button'>Filter
                        </button>
                        <input onChange={(e => { this.handleChange(e.target.value) })} className='searchPage input' type='search' placeholder='ex:  chicken' /> {/* onclick action to open a new search box when value changes*/}
                        <button onClick={this.handleSearch} className='SearchPage button'>Submit
                        </button>
                    </div>
                    <SearchModal />
                </div>
                {/* <SearchModal /> */}
            </div>
        )
    }
}