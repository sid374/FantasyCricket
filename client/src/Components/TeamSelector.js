import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../Actions/AuthActions'
import Login from './Login';
import Signup from './Signup';
import { addPlayerToTeam, removePlayerFromTeam } from '../Actions/TeamActions'
const sampleData = 
    [
        {
            playerName: "Virat Kohli",
            cost: 1200000,
            pid: 1
        },
        {
            playerName: "R. Ashwin",
            cost: 900000,
            pid: 2
        },
        {
            playerName: "B. Kumar",
            cost: 800000,
            pid: 3
        },
        {
            playerName: "S. Tendulkar",
            cost: 1100000,
            pid: 4
        },
        {
            playerName: "V. Sehwag",
            cost: 1100000,
            pid: 5
        },
        {
            playerName: "R. Ponting",
            cost: 1000000,
            pid: 6
        },
        {
            playerName: "Joe Root",
            cost: 1100000,
            pid: 7
        },
        {
            playerName: "J. Kallis",
            cost: 900000,
            pid: 8
        },
    ];

const TeamList = (props) => {
    return (
        <div style={{float: 'left', margin: '10px'}}>
            <h4>
                {props.listName}
            </h4>
            <ul>
                {props.list.map((playerObj) => {
                    return (
                        <li key={playerObj.pid}>
                            <a href="#" onClick={() => props.onClick(playerObj)}>
                                {playerObj.playerName}
                            </a>
                        </li>
                    );
                })}
                {props.list.length == 0 ? <li>No players here...</li> : undefined}
            </ul>
        </div>
        )
}


class TeamSelector extends Component {
    render() {
        let filteredList = sampleData.filter((playerObj) => {
            for (var i = this.props.teamList.length - 1; i >= 0; i--) {
                if(this.props.teamList[i].pid === playerObj.pid) 
                    return false;
            }
            return true;
        })

        console.log(filteredList);
        console.log(this.props.teamList);

        return(
            <div>
                <h3>
                    Team Slector
                </h3>
                <TeamList listName = "All Available Players" list={filteredList} onClick={this.props.addPlayer}/>
                <TeamList listName = "My team" list={this.props.teamList} onClick={this.props.removePlayer}/>
                <div style={{clear: 'both'}}>
                    <button style={{margin: '10px'}}>
                            Submit Team
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToLinkProps = (state) => {
    return {
        teamList: state.Team
    };
};

const mapDispatchToLinkProps = (dispatch) => {
     return{
         addPlayer: (playerObj) => {
            dispatch(addPlayerToTeam(playerObj));
         },
         removePlayer: (playerObj) => {
            dispatch(removePlayerFromTeam(playerObj));
         }
     };
 };
 
export default connect(mapStateToLinkProps, mapDispatchToLinkProps)(TeamSelector);
 


