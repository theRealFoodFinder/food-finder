import React, { Component } from 'react'
import SearchModal from './SearchModal';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom'
import AppBar from './AppBar'

export default class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        cuisine: "",
        blacklist: "",
        filterModal: false,
        modalObject: {
            "calories": "",
            "carbs":'',
            "protein":'',
            "sodium": '',
            "sugar":'',
            "total_fat": "",
        }, 
        searchInput: "",  //ingredient to add
        searchResults: [],  //recipes from back
        searchByIngredients: []  //ingredients sent to back
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        // this.filterRender = this.filterRender.bind(this);
        this.handleGetFilters = this.handleGetFilters.bind(this);
    }

    handleGetFilters(selected, amount){
        let tempModalObject=this.state.modalObject;
        tempModalObject[selected] = amount;
        this.setState({
            modalObject: tempModalObject,
            filterModal: false
        })
        
    }

    handleAdd(){
        let tempIngredient = this.state.searchInput;
        let tempArray = this.state.searchByIngredients;
        if (tempIngredient){tempArray.push(tempIngredient);
        this.setState({
            searchByIngredients: tempArray,
            searchInput:""
        })}
        else 
        alert('Please input an ingredient!')
    }

    handleFilter() {
        let filterModal = this.state.filterModal
        this.setState({
            filterModal: !(filterModal)
        })
        // console.log('filter on state', this.state.filterModal)
    }

    

    handleSearch() {
        let profile ={};
        profile.nutrition_info = this.state.modalObject;
        profile.ingredients = this.state.searchByIngredients;
        profile.cuisine = this.state.cuisine;
        this.props.passSearchParams(profile)
    }

    handleChange(e) {
        this.setState({
            searchInput: e
        })
    }


    //getting profile info from backend to put on state to prefill filters when we need profile info
    // componentWillMount(res) {
        // axios.get('/api/getProfile').then((res) => {
        //     this.setState({
        //         profile: res
        //     })
        // })
    // }

    
    render() {




        const ingredientRender = this.state.searchByIngredients.map((el, i)=> {
            return  <h4 key={i}>{el}</h4>})
            
         const filterRender = ()=> {
                // let filters = this.state.modalObject;
                // return (filters.map((el, i)=> {
                //  return   <h4 key={i}>{el}</h4>}))
            }
                // console.log(this.props, 'props on search')
        return (
            <div className='SearchPageContainer'>
                <div className='allappbarcomponents'>
                  <AppBar />
                </div>


                <div id='mainSearchContainer'>
                    <div className='searchParamDisplay'>
                    Search By:
                    {ingredientRender}{filterRender}
                    </div>


                    <div className='searchTitle'>
                        Main Ingredient Search
                    </div>
                    <div id='searchButtonContainer' >
                        <button onClick={this.handleFilter} className='SearchPage button'>Filter
                        </button>

                        <input value = {this.state.searchInput} onChange={(e => { this.handleChange(e.target.value) })} className='searchPage input' type='search' placeholder='ex:  chicken' />
                         {/* onclick action to open a new search box when value changes*/}

                        <button onClick={this.handleAdd} className='SearchPage button'>Add Ingredient
                        </button>


                    </div>
                    { this.state.filterModal===true ? <SearchModal handleGetFilters={this.handleGetFilters
                    } /> : "" } 
                    
                    < Link to='/results'><button onClick={this.handleSearch} className='getRecipes button'>Get Recipes
                    </button></Link>
                </div>
            </div>
        )
    }
}