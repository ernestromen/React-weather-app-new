import React, { useEffect } from 'react'
import './addFavoriteButton.css';
import {mapStateToProps} from '../mapStateToProps';
import {useDispatch,connect} from 'react-redux';
import { actionForGettingData,actionForDeletingData } from '../../actions/actions';
import store from '../../index';


 export const AddFavoriteButton = (prop)=> {

    useEffect(() => {
 
if(prop.name){
if(store.getState().items.length >0){

let arr = store.getState().items;
for(var x= 0; x < arr.length; x++){
if(arr[x].name ===prop.name){
    document.querySelector('.fa-heart').classList.remove("far");
        document.querySelector('.fa-heart').classList.add("fas"); 
        break;
}else{
    document.querySelector('.fa-heart').classList.remove("fas");
    document.querySelector('.fa-heart').classList.add("far"); 
}
}

}
};
      });

    const dispatch = useDispatch();

const changeFavoriteButtonIcon = () =>{

    const element = document.querySelector('.fa-heart');
    let neededDataFromWeatherDisplay = document.querySelector('.fa-heart').parentNode.parentNode.children[1].children[0].children;
    var arr = Array.prototype.slice.call(neededDataFromWeatherDisplay);
    let ob={name:'',weatherValue:'',weatherUnit:'',weatherDescription:''};
   ob['name']= arr[0].innerHTML;
   ob['weatherValue']= arr[1].innerHTML;
   ob['weatherUnit']= arr[2].innerHTML;
   ob['weatherDescription']= arr[3].innerHTML;
   ob['isFavorite']= true;
    if(element.classList.contains("far")){
        element.classList.remove("far");
        element.classList.add("fas"); 
 
let nameOfFavoriteCity = document.querySelector('.cityName').innerHTML;
let count = 0;
store.getState().items.map(e=>{
if(e.name ===nameOfFavoriteCity){
    count++;
}
});
if(count >1){
alert('cant add duplicate cities')

}else if(count==0 ||count<1){
    dispatch(actionForGettingData(ob));
}

    }else{
        element.classList.remove("fas");
        element.classList.add("far");
 
        dispatch(actionForDeletingData(ob));


    }

 
}





    return (
        <div>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>

        <i onClick={(changeFavoriteButtonIcon)}
         class='far fa-heart'></i>
         
              </div>
    )
}

export default connect(mapStateToProps)(AddFavoriteButton);
