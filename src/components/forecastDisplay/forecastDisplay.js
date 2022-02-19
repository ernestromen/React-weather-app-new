import React, { useState } from 'react'
import addFavoriteButton, { AddFavoriteButton } from '../addFavoriteButton/addFavoriteButton';
import './forecastDisplay.css';
import { useEffect } from 'react';
import {Search} from '../Search';

export const ForecastDisplay = () => {
  const key = 'GQfG3AS5AFCjvmLCzUcfkSNRAbuZGQM5'; 

// get city info
const getCity = async (city) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const result = await fetch(base+query);
const data = await result.json();
return data;
  };

//=====Getting the weather stats===//
  const getWeather = async(id)=>{
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    
    const response = await fetch(base+query);
    const data = await response.json();
    
    return (data);
    }
  



//===Location key api===//

  const getLocation = async(id)=>{
    const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${id}?apikey=${key}`;
//fucking 503 error    
    const response = await fetch(base+query);
    const data = await response.json();
    
    return data;
    }
const [name,setName]=useState('');
const updateUi =async(data) =>{
  console.log(data.cityDets[0].LocalizedName,'here inside updateui');
  let neededName =  await getCity(data.cityDets[0].LocalizedName);;

  neededName=neededName[0].LocalizedName;
  setName(neededName);

//The main weather display
document.querySelector('.grid-container').innerHTML ='';
document.querySelector('.details').innerHTML =`
<div class="cityName">${data.cityDets[0].EnglishName}</div>
<div class="temp weatherValue">${data.weather[0].Temperature.Metric.Value}</div>
<div class="weatherUnit">${data.weather[0].Temperature.Metric.Unit}</div> 
<div class="weatherUnit">${data.weather[0].WeatherText}</div> 
`;

for(var x=0; x< data.location.DailyForecasts.length; x++){
 

  document.querySelector('.grid-container').innerHTML +=`
<div id=${x+1} class="grid-item tempatureValue">${data.location.DailyForecasts[x].Temperature.Maximum.Value}${data.location.DailyForecasts[x].Temperature.Maximum.Unit}</div>

`;
}
// //Shows weather condtion
for(var z=0; z< data.location.DailyForecasts.length; z++){

  document.querySelector('.grid-container').innerHTML +=`
  <div id=${z+6} class="grid-item weatherDescription">${data.location.DailyForecasts[z].Day.IconPhrase}</div>
`;

}

// //Shows date
for(var y=0; y< data.location.DailyForecasts.length; y++){

  let date = data.location.DailyForecasts[y].Date;
  let filteredDate = date.split('').splice(0,10).join('');
  document.querySelector('.grid-container').innerHTML +=`
  <div id=${y+11} class="grid-item weatherDate">${filteredDate}</div>
`;

}

}




useEffect(()=>{
    const showDefault = async (city) => {

  const cityDets = await getCity(city);
  const weather =  await getWeather(cityDets[0].Key);
const location = await getLocation(cityDets[0].Key);

return {
  cityDets,
    weather:weather,
    location:location

}
};

if(!(searchInput.length >0)){

  showDefault('Tel aviv')
  .then(data=>{
      updateUi(data);


    })
  .catch(err=>console.log(err));
}


});

const [searchInput, setSearchInput]=useState('');









    return (
        <div>
          <Search getCity={getCity} getWeather={getWeather} getLocation={getLocation} updateUi={updateUi}  searchInput={searchInput} setSearchInput={setSearchInput}/>
                <div className="widget">
            <AddFavoriteButton name ={name} />
            <div className="left-panel panel">
                
                <div className="details city"></div>

             
            </div>
            <div className="right-panel panel">
                {/* <img src="https://s5.postimg.cc/lifnombwz/mumbai1.png" alt="" width="160"> */}
            </div>
        </div>
            <div className="grid-container">
            <div className="grid-item ">day 1</div>
            <div className="grid-item ">day 2</div>
            <div className="grid-item ">day 3</div>
            <div className="grid-item ">day 4</div>
            <div className="grid-item ">day 5</div>

            </div>

        </div>
    )
}

