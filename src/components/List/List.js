import React from 'react'
import store from '../../index';
import {connect} from 'react-redux';
import {mapStateToProps} from '../mapStateToProps';
import './List.css';

export const List = () => {
    let listData = '';
     listData = store.getState().items.map(e=>{



return <tr>
<th   scope="row">{e.name}</th>
<th   scope="row">{e.weatherValue}</th>
<th   scope="row">{e.weatherUnit}</th>
<th   scope="row">{e.weatherDescription}</th>
 </tr>
    });

let condition = store.getState().items.length ===0 ? <h1 style={{textAlign:'center',marginTop:'30px',color:'white'}}>Favorite list is empty!</h1> :  <table>
<thead>
<tr>
  <th>Name</th>
  <th>weatherValue</th>
  <th> weatherUnit</th>
  <th>weatherDescription</th>
</tr>
</thead>
<tbody>
{
listData
}
</tbody>
</table>;

    return (
<div >
{condition}
</div>  
  )
}

export default connect(mapStateToProps)(List);

