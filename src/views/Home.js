import React, { Component } from 'react';
import { withAuthorization } from '../components/Session';
import { graphql } from 'react-apollo'; 
import { testQuery } from '../components/Queries';
import { compose } from 'recompose';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        console.log(this.props.data)
        return (
            <div>
                <h3>Home</h3>
                <p>{this.props.data.hello}</p>
            </div>
        )
    }
}

const condition = authUser => !!authUser

const enhance = compose(
    withAuthorization(condition),
    graphql(testQuery)
)

export default enhance(Home);