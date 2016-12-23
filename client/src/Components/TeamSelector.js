import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSquadsFetchData } from '../Actions/FetchSquadActions'
import { addPlayerToTeam, removePlayerFromTeam } from '../Actions/TeamActions'

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
                                {playerObj.Fullname}
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
        this.props.fetchSquad();
    }
    render() {
        if(this.props.fetchSquadState.isLoading === true){
            return <div>Fetching data, hold on tight...</div>;

        }
        if(this.props.fetchSquadState.hasErrored === true || this.props.fetchSquadState.squad.length === 0){
            return <div>Fetch data failed. Sorry :( </div>
        }
        //debugger;
        let filteredList = this.props.fetchSquadState.squad.filter((playerObj) => {
            for (var i = this.props.teamList.length - 1; i >= 0; i--) {
                if(this.props.teamList[i].pId === playerObj.pId) 
                    return false;
            }
            return true;
        })

        return(
            <div>
                <h3>
                    Team Slector
                </h3>
                <TeamList listName="All Available Players" list={filteredList} onClick={this.props.addPlayer}/>
                <TeamList listName="My team" list={this.props.teamList} onClick={this.props.removePlayer}/>
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
         addPlayer: (playerObj) => {
            dispatch(addPlayerToTeam(playerObj));
         },
         removePlayer: (playerObj) => {
            dispatch(removePlayerFromTeam(playerObj));
         },
         fetchSquad: () => {
            dispatch(getSquadsFetchData());
         }
     };
 };
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamSelector);
 


