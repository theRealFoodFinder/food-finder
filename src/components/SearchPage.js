import React, { Component } from 'react';
import SearchModal from './SearchModal';
import AppBar from './AppBar';
import axios from 'axios';

export default class SearchPage extends Component {

    componentWillMount() {
        axios.get('/api/getProfile').then((res) => {
            // if (!res.data.first || !res.data.last){
            //     this.props.history.push('/')
            // }
            console.log(res)
        }
    )}
    constructor(props) {
        super(props)
        this.state = {
            csseffect: false,
            addingreeffect: false,
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
        this.setState({addingreeffect: true});
        let tempIngredient = this.state.searchInput;
        let tempArray = this.state.searchByIngredients;
        if (tempIngredient){tempArray.push(tempIngredient);
        this.setState({
            searchByIngredients: tempArray,
            searchInput:""
        })}
        else
        alert('Please input an ingredient!')

        setTimeout(_=> {this.setState({addingreeffect: false})
        }, 500);
    }

    handleSearch(e) {
        let profile ={};
        this.setState({csseffect: true});
        profile.nutrition_info = this.state.modalObject;
        profile.ingredients = this.state.searchByIngredients;
        profile.cuisine = this.state.cuisine;
        if (this.state.searchInput){
            this.setState({
                searchByIngredients: this.state.searchByIngredients.push(this.state.searchInput)
            })
        }
        this.props.passSearchParams(profile)


        // console.log(e.target)
        setTimeout(_=> {
            // console.log(this)
            this.props.history.push('/results')
        }, 1000);
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
        // console.log(e)
        if (e === 'brenny' || e === 'easter egg'){
            console.log(this.props)
            this.props.history.push('/secret')
        }
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
                        <button onClick={this.handleAdd} className={this.state.addingreeffect && 'addingredienteffect'} >Add Ingredient
                        </button>
                    </div>
                    { this.state.filterModal===true ? <SearchModal handleFilter={this.handleFilter} handleGetFilters={this.handleGetFilters
                    } /> : <button onClick={this.handleFilter} className='SearchPageButton' id='noAniButton'>Filter
                    </button> }

                    <button onClick={e => this.handleSearch(e)} className={this.state.csseffect && 'dothateffect'} id='SearchPageGetRecipesButton'>Get Recipes
                    </button>

                </div>
            </div>
        )
    }
}