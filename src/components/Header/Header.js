import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <a href="#" className="brand-logo center">THEMEMO</a>

                    <ul>
                        <li><a href="#"><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            <li><a href="#"><i className="material-icons">vpn_key</i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
