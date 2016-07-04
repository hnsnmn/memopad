import React from 'react';
import { Dropdown, NavItem } from 'react-materialize';

class Memo extends React.Component {

    render() {
        let isEdited = () => {
            return this.props.data.date.created != this.props.data.date.edited;
        };


        return(
            <div className="container memo">
                <div className="card">
                    <div className="info">
                        <span className="username">{this.props.data.writer}</span> wrote a log · 2 hours ago
                        <div className="right">
                            <Dropdown trigger={<div><i className="material-icons icon-button">more_vert</i></div>}>
                                <NavItem>Edit</NavItem>
                                <NavItem>Remove</NavItem>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="card-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                    <div className="footer">
                        <i className="material-icons log-footer-icon star icon-button star-starred">star</i><span className="star-count">4</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Memo;

/*
{
    "_id": "577a64ff950f069406ec9f98",
    "writer": "velo",
    "contents": "i can't take my eyes~~~~ of .. you!\nhey\nhey\nhey",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T13:30:39.082Z",
      "created": "2016-07-04T13:30:39.082Z"
    },
    "starred": ['velo', 'anymore', 'pert']
  }
*/
