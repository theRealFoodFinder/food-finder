import React, { Component } from 'react'
// import axios from 'axios';
import SearchModal from './SearchModal';
import Sidebar from './Sidebar';
import axios from 'axios';



export default class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        cuisine: "",
        blacklist: "",
        filterModal: true,
        searchInput: "",  //ingredient to add
        searchResults: [],  //recipes from back
        filterResults: [],
        searchByIngredients: []  //ingredients sent to back
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.filterRender = this.filterRender.bind(this);
    }

    handleAdd(){
        let tempIngredient = this.state.searchInput;
        let tempArray = this.state.searchByIngredients;
        tempArray.push(tempIngredient);
        this.setState({
            searchByIngredients: tempArray,
            searchInput:""
        })
        console.log(this.state.searchByIngredients)
    }

    handleFilter(filterModal) {
        filterModal = this.state.filterModal
        this.setState({
            filterModal: !filterModal
        })
    }

    handleSearch() {
        let profile ={};
        profile.nutrition_info = this.state.filterResults;
        profile.ingredients = this.state.searchByIngredients;
        profile.cuisine = this.state.cuisine;
        axios.post('/getRecipe', {profile}).then((res)=>{

        }).catch((error)=>{
            console.log(error)
        })
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

    filterRender (filters){
        return (filters.map((el, i)=> {
         return   <h4 key={i}>{el}</h4>}))
    }

    render() {
const ingredientRender = this.state.searchByIngredients.map((el, i)=> {
  return  <h4 key={i}>{el}</h4>})
    console.log(this.state.fintermodel)


        return (
            <div className='SearchPageContainer'>
            <Sidebar />
                <div onClick={this.handlemenu} className='menubutton'></div>


                <div id='mainSearchContainer'>
                    <div className='searchParamDisplay'>
                    Search By:
                    {ingredientRender}{}
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
                    { !this.state.filterModal ? <div></div>  :props => <SearchModal {...props} profile={this.state.profile}/>}
                    
                    <button onClick={this.handleSearch} className='getRecipes button'>Get Recipes
                    </button>
                </div>
            </div>
        )
    }
}