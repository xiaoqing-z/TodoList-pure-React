import React,{Component} from 'react';

class  Item extends Component{ 
  handelOnclick = ()=>{
    const {handelOnClick,item} =this.props
    handelOnClick(item)


  }
  render(){ 
    const {item} = this.props  
        return(
          <li key={item.id} className={`${item.isClick?"Click":null}`} onClick={this.handelOnclick}>{item.content}</li>
    
        )
    }
  } 

export default Item ;

    
