import React from 'react';

import { Link } from 'react-router';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">MEMOPAD</Link>

                    <ul>
                        <li><a href="#"><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            <li><Link to="login"><i className="material-icons">vpn_key</i></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
