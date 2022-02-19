import React from 'react'
import {useState,useEffect} from 'react';
import './App.css';
import {actionForGettingData} from '../actions/actions';
import {useDispatch,connect} from 'react-redux';
import {mapStateToProps} from './mapStateToProps';
import {AddFavoriteButton} from './addFavoriteButton/addFavoriteButton'


 export const Search = (prop) => {

const [display,setDisplay] = useState([]);
const dispatch = useDispatch();

//====fetching data====//



  //=====================================//
  useEffect(() => {



  


  });



  const updateCity = async (city) => {

    const cityDets = await prop.getCity(city);
    const weather =  await prop.getWeather(cityDets[0].Key);
  const location = await prop.getLocation(cityDets[0].Key);
  
  return {
    cityDets,
      weather:weather,
      location:location
  
  }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

prop.updateUi(prop.searchInput);




updateCity(prop.searchInput)
.then(data=>{
  prop.updateUi(data);


  })
.catch(err=>console.log(err));
}




    return (


        <div className='Search'>
        <form onSubmit={handleSubmit}>
      <label>
    
        <input
          type="text"
          
          onChange={e => prop.setSearchInput(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" />
    </form>




      </div>
        )
}

export default connect(mapStateToProps)(Search);
