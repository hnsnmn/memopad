import React from 'react';
import { connect } from 'react-redux';
import { searchToggle, searchRequest } from 'actions/search';
import { Link, browserHistory } from 'react-router';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        $(this.screen).slideDown(200);
    }

    handleChange(e) {
        this.setState({ keyword: e.target.value });
        this.props.dispatch(searchRequest(e.target.value));
    }

    handleClose() {
        //empties the search list
        this.props.dispatch(searchRequest(''));

        // slide up animation
        $(this.screen).slideUp(200, () => {
            this.props.dispatch(searchToggle());
        });

    }

    handleKeyDown(e) {
        if(e.keyCode === 13) {
            if(this.props.search.usernames.length > 0) {
                this.handleClose();
                browserHistory.push('/user/' + this.props.search.usernames[0].username);
            }
        } else if(e.keyCode === 27) {
            this.handleClose();
        }
    }

    render() {

        let mapToResults = (data) => {
            return data.map((username, i) => {
                return (<Link to={`/user/${username.username}`}
                    key={i}
                    onClick={this.handleClose}>{username.username}</Link>);
            });
        };

        return (
            <div ref={(ref) => { this.screen = ref; } } className="search-screen white-text">
                <div className="right">
                    <a className="waves-effect waves-light btn red lighten-1"
                        onClick={this.handleClose}>CLOSE</a>
                </div>
                <div className="container">
                    <input placeholder="Search a user"
                        value={this.state.keyword}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}></input>

                    <ul className="search-results">
                        {mapToResults(this.props.search.usernames)}
                    </ul>


                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        search: state.search
    };
};

export default connect(mapStateToProps)(Search);
