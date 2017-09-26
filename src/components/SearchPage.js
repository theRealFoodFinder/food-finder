import React, { Component } from 'react'
import axios from 'axios';




export default class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: "",
            profile: {},
            filterModal: false,
            searchResults: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleFilter(filterModal) {
        filterModal = this.state.filterModal
        // this.setState({
        //     filterModal: !filterModal
        // })
    }

    handleSearch() {
        //send data to backend
        let profile = this.state.profile
        axios.post('/getRecipes', { profile }).then((res) => {
            this.setState({
                searchResults: res
            })
        })

    }
    handleChange(e) {
        this.setState({
            searchInput: e
        })
        console.log(this.state.searchInput)
    }


    //getting profile info from backend to put on state to prefill filters
    componentWillMount(res) {
        // axios.get('/getPreferences').then((res) => {
        //     this.setState({
        //         profile: res
        //     })
        //     console.log(res, 'res from willmount')
        // })

    }

    render() {




        return (
            <div className='SearchPageContainer'>
                <div className='menubutton'></div>


                <div className='mainSearchContainer'>
                    <div className='searchTitle'>
                        Main Ingredients Search
                    </div>
                    <div className='searchButtonContainer' >
                        <button onClick={this.handleFilter} className='SearchPage button'>Filter
                        </button>
                        <input onChange={(e => { this.handleChange(e.target.value) })} className='searchPage input' type='search' placeholder='ex)chicken' /> {/* onclick action to open a new search box when value changes*/}
                        <button onClick={this.handleSearch} className='SearchPage button'>Submit
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}