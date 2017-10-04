import React, { Component } from 'react';
import SearchModal from './SearchModal';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import axios from 'axios';

export default class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile:"",
            cuisine: "",
            blacklist: [],
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
        searchByIngredients: []  //ingredients sent to back
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleGetFilters = this.handleGetFilters.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
    }

    removeIngredient(index){
        let tempArray = this.state.searchByIngredients;
        tempArray.splice(index, 1);
        // console.log(index)
        this.setState({
            searchByIngredients: tempArray
        })
    }

    handleGetFilters(selected, amount){
        let tempModalObject=this.state.modalObject;
        tempModalObject[selected] = amount;
        this.setState({
            modalObject: tempModalObject,
            filterModal: false
        })
        //this works
        // console.log(this.state.modalObject)
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

    handleSearch() {
        let profile ={};
        profile.nutrition_info = this.state.modalObject;
        profile.ingredients = this.state.searchByIngredients;
        profile.cuisine = this.state.cuisine;
        this.props.passSearchParams(profile)
    }

    handleFilter() {
        let filterModal = this.state.filterModal
        this.setState({
            filterModal: !(filterModal)
        })
    }

    


    handleChange(e) {
        this.setState({
            searchInput: e
        })
    }

    componentWillMount(res) {
        axios.get('/api/getProfile').then((res) => {
            this.setState({
                profile: res
            })
        })
    }

    
    render() {


        const ingredientRender = this.state.searchByIngredients && this.state.searchByIngredients.length>0 ?
            this.state.searchByIngredients.map((el, i)=> {
                // console.log(el, i)
            return  <h4 key={el}><span key={i}onClick={(e)=>{this.removeIngredient(e.target.className)}} className={i}>{el}</span></h4>}) : <h4>No ingredients found</h4>
        
            var filterRender =  (obj)=> {
                let array = [];
                for (let key in obj)
                  if(obj[key]){array.push(key)}
                  else 
                  return array.map((item, i)=>{
                      return <h4 onClick={(e)=>{this.removeIngredient(e.target.className)}} className={i}>{item}</h4>
                  })
                  }
        return (
            <div className='SearchPageContainer'>
                <div className='allappbarcomponents'>
                  <AppBar />
                </div>


                <div id='mainSearchContainer'>
                    <div className='searchParamDisplay'>
                    Search By: (Click to Remove)
                    {ingredientRender}{filterRender(this.state.modalObject)}
                    </div>
                    <div className='searchTitle'>
                        Main Ingredient Search
                    </div>
                    <div id='searchButtonContainer' >
                        <input value = {this.state.searchInput} onChange={(e => { this.handleChange(e.target.value) })} className='searchPage input' type='search' placeholder='ex:  chicken' />
                         {/* onclick action to open a new search box when value changes*/}
                        <button onClick={this.handleAdd} className='SearchPage button'>Add Ingredient
                        </button>
                    </div>
                    { this.state.filterModal===true ? <SearchModal handleFilter={this.handleFilter} handleGetFilters={this.handleGetFilters
                    } /> : <button onClick={this.handleFilter} className='SearchPage button'>Filter
                    </button> } 
                    < Link to='/results'><button onClick={this.handleSearch} className='getRecipes button'>Get Recipes
                    </button></Link>
                </div>
            </div>
        )
    }
}