export  const actionForGettingData = (result)=>{
    return {
      type: 'ADD_TO_FAVORITES',
    payload:result
    }
  }

  export  const actionForDeletingData = (result)=>{
      return {
        type: 'DELETE_FAVORITE',
      payload:result
      }
    }

  

  