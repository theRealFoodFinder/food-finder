import React, { Component } from 'react'
// import axios from 'axios';




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
        this.handlemenu = this.handlemenu.bind(this);
    }

    handlemenu(){
        //menu display here
    }

    handleFilter(filterModal) {
        filterModal = this.state.filterModal
        this.setState({
            filterModal: !filterModal
        })
    }

    handleSearch() {
        //send data to backend
        // let profile = this.state.profile
        // axios.post('/getRecipes', { profile }).then((res) => {
        //     this.setState({
        //         searchResults: res
        //     })
        // })
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
        // axios.get('/getProfile').then((res) => {
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
                </div>

            </div>
        )
    }
}