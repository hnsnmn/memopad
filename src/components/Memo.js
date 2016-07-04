import React from 'react';
import { Dropdown, NavItem } from 'react-materialize';

class Memo extends React.Component {

    render() {
        return(
            <div className="container memo">
                <div className="card">
                    <div className="info">
                        <span className="username">velopert</span> wrote a log · 2 hours ago
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
