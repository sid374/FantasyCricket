import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSquadsFetchData } from '../Actions/FetchSquadActions'
import { addPlayerToTeam, removePlayerFromTeam } from '../Actions/TeamActions'
import Spinner from 'react-spinkit'
import { Link } from 'react-router'


const SeriesList = (props) => {
    return (
        <div style={{float: 'left', margin: '10px'}}>
            <ul>
                {props.list.map((seriesObj) => {
                    return (
                        <li key={seriesObj.seriesId}>
                            <Link to={"teamSelector/"+seriesObj.seriesId}>
                                {seriesObj.Name}
                            </Link>
                        </li>
                    );
                })}
                {props.list.length === 0 ? <li>No series here...</li> : ''}
            </ul>
        </div>
        )
}


class SeriesSelector extends Component {
    constructor(props){
        super(props);
        this.state = {loadingFailed: false,
            loading:true, 
            seriesList: []
        };
        this.fetchSeries = this.fetchSeries.bind(this);
    }
    fetchSeries(){
        let authHeader = new Headers();
        authHeader.append("Authorization", "Bearer "+this.props.userToken);
        fetch('/series' , {
            headers: authHeader
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) =>  {
                this.setState({
                    loading: false,
                    seriesList: items
                })
                console.log(items);
            })
            .catch(() => {
                this.setState({loadingFailed: true});
            });
    }

    componentDidMount(){
        this.fetchSeries();
        return;
    }
    render() {
        return(
            <div>
                <h3>
                    Series Selector
                </h3>
                {this.state.loading && <Spinner spinnerName="wandering-cubes" />}
                {!this.state.loading && <SeriesList list={this.state.seriesList}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        userToken: state.LoginUser.token,
    }
}
export default connect(mapStateToProps)(SeriesSelector);
 


