import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSquadsFetchData, getSquadsErrored } from '../Actions/FetchSquadActions'
import { getUserTeamsFetchData } from '../Actions/TeamActions'
import { addPlayerToTeam, removePlayerFromTeam } from '../Actions/TeamActions'
import { submitTeam } from '../Actions/UserActions'
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

TeamTable.propTypes = {
    listName: React.PropTypes.string.isRequired,
    list: React.PropTypes.array.isRequired
}


class TeamSelector extends Component {
    componentDidMount(){
        this.props.clearErrors();
        this.props.fetchSquad('/squad/'+this.props.params.seriesId, this.props.userToken);
        this.props.fetchUserTeam(this.props.params.seriesId, this.props.userToken);
        //before that we need to think about how to store usersquad in the state tree. 
        //keep it as 1 dictionary i guess

    }

    componentWillReceiveProps(nextProps){
        this.props.clearErrors();
        if(this.props.params.seriesId != nextProps.params.seriesId){
            this.props.fetchSquad('/squad/'+nextProps.params.seriesId, this.props.userToken);
            this.props.fetchUserTeam(nextProps.params.seriesId, this.props.userToken);
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
        let userTeamList = [];
        if(this.props.params.seriesId in this.props.teamList)
            userTeamList = this.props.teamList[this.props.params.seriesId];

        //remove the players that have been already selected from the teamlist.
        let filteredList = this.props.fetchSquadState.squad.filter((playerObj) => {
            for (var i = userTeamList.length - 1; i >= 0; i--) {
                if(userTeamList[i].pId === playerObj.pId) 
                    return false;
            }
            return true;
        })

        //verification step before our add player action is dispatched.
        //TODO: add more team verification here.
        const verifyAddPlayer = (playerObj, seriesId) =>{
            if(userTeamList.length >= 11){
                //Reflect this in the UI somehow
                console.log("Error: more than 11 players already added");
            }
            else{
                this.props.addPlayer(playerObj, seriesId);
            }
        }
        
        const submitTeamClicked = (event) => {
            console.log(event);
            this.props.submitTeam(userTeamList, this.props.params.seriesId, this.props.userToken);
        }

        return(
            <div>
                <h3>
                    Team Selector
                </h3>
                <TeamTable listName="All Available Players" list={filteredList} onClick={verifyAddPlayer} seriesId={this.props.params.seriesId}/>
                <TeamTable listName="My team" list={userTeamList} onClick={this.props.removePlayer} seriesId={this.props.params.seriesId}/>
                <div style={{clear: 'both'}}>
                    <button style={{margin: '10px'}} onClick = {submitTeamClicked}>
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
        fetchSquadState: state.FetchSquad,
        userToken: state.LoginUser.token
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
         fetchSquad: (url, userToken) => {
            dispatch(getSquadsFetchData(url, userToken));
         },
         submitTeam: (squad, seriesId, userToken) => {
            dispatch(submitTeam(seriesId, squad, userToken));
         },
         fetchUserTeam: (seriesId, userToken) => {
            dispatch(getUserTeamsFetchData(seriesId, userToken));
         },
         clearErrors: () => {
            getSquadsErrored(false);
         }
     };
 };
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamSelector);


