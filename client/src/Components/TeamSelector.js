import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSquadsFetchData } from '../Actions/FetchSquadActions'
import { addPlayerToTeam, removePlayerFromTeam } from '../Actions/TeamActions'
import Spinner from 'react-spinkit'
import { Table } from 'react-bootstrap';


const TeamTable = (props) => {
    return (
        <div style={{float: 'left', margin: '10px'}}>
            <h4>
                {props.listName}
            </h4>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Cost</th>
                        <th>Playing Role</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((playerObj) => {
                    return (
                        <tr key={playerObj.pId}>
                            <td>
                               <a href="#" onClick={() => props.onClick(playerObj, props.seriesId)}>
                                    {playerObj.Name}
                                </a> 
                            </td>
                            <td>{playerObj.currentTeam}</td>
                            <td>{playerObj.Cost}</td>
                            <td>{playerObj.Playingrole}</td>
                        </tr>
                    );
                    })}
                    {props.list.length === 0 ? <tr><td>No players here...</td></tr>: ''}
                </tbody>
            </Table>
        </div>
        )
}
const TeamList = (props) => {
    return (
        <div style={{float: 'left', margin: '10px'}}>
            <h4>
                {props.listName}
            </h4>
            <ul>
                {props.list.map((playerObj) => {
                    return (
                        <li key={playerObj.pId}>
                            <a href="#" onClick={() => props.onClick(playerObj)}>
                                {playerObj.Name}
                            </a>
                        </li>
                    );
                })}
                {props.list.length === 0 ? <li>No players here...</li> : ''}
            </ul>
        </div>
        )
}


class TeamSelector extends Component {
    componentDidMount(){
        this.props.fetchSquad('/squad/'+this.props.params.seriesId);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.seriesId != nextProps.params.seriesId){
            this.props.fetchSquad('/squad/'+nextProps.params.seriesId);
        }
    }

    render() {
        if(this.props.fetchSquadState.isLoading === true){
            return <Spinner spinnerName="wandering-cubes" />;

        }
        if(this.props.fetchSquadState.hasErrored === true || this.props.fetchSquadState.squad.length === 0){
            return <div>Fetch data failed. Sorry :( </div>
        }


        //TeamTable expects a list, so if we don't have any selected players right now, return an empty list
        let userTeamList;
        if(this.props.params.seriesId in this.props.teamList)
            userTeamList = this.props.teamList[this.props.params.seriesId];
        else
            userTeamList = [];

        //remove the players that have been already selected from the teamlist.
        let filteredList = this.props.fetchSquadState.squad.filter((playerObj) => {
            for (var i = userTeamList.length - 1; i >= 0; i--) {
                console.log(i);
                if(userTeamList[i].pId === playerObj.pId) 
                    return false;
            }
            return true;
        })

        
        return(
            <div>
                <h3>
                    Team Selector
                </h3>
                <TeamTable listName="All Available Players" list={filteredList} onClick={this.props.addPlayer} seriesId={this.props.params.seriesId}/>
                <TeamTable listName="My team" list={userTeamList} onClick={this.props.removePlayer} seriesId={this.props.params.seriesId}/>
                <div style={{clear: 'both'}}>
                    <button style={{margin: '10px'}}>
                            Submit Team
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        teamList: state.Team,
        fetchSquadState: state.FetchSquad
    };
};

const mapDispatchToProps = (dispatch) => {
     return{
         addPlayer: (playerObj, seriesId) => {
            dispatch(addPlayerToTeam(playerObj, seriesId));
         },
         removePlayer: (playerObj, seriesId) => {
            dispatch(removePlayerFromTeam(playerObj, seriesId));
         },
         fetchSquad: (url) => {
            dispatch(getSquadsFetchData(url));
         }
     };
 };
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamSelector);
 


