import React, { Component } from 'react';

class Landing extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        console.log(process.env.REACT_APP_OWNER_NAME)
        return (
        <div>Landing {process.env.REACT_APP_OWNER_NAME}</div>
        )
    }
}

export default Landing;