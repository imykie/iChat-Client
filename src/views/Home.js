import React, { Component } from 'react';
import { withAuthorization } from '../components/Session';
import { testQuery } from '../components/Queries';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        return (
            <div>Home</div>
        )
    }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(Home);