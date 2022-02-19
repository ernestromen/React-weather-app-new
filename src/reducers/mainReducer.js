
const initialState ={
    items:[]
  };
export default function mainReducer(state = initialState, action) {


if(action.type ==='ADD_TO_FAVORITES'){
  let arr = state;


  arr.items[arr.items.length] = action.payload;

  return {
  ...state,
  items:[...arr.items]
  
  }


}else if(action.type==='DELETE_FAVORITE'){
  let arr = state.items.filter(product=>{
    if(action.payload.name !== product.name ){
      return true;
    }else{
      return false;
    }
  });
  
  
    
      return{
        ...state,
        items:arr
      }

}
return state;

}