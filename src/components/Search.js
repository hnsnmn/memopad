import React from 'react';
import { connect } from 'react-redux';
import { searchToggle, searchRequest } from 'actions/search';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        $(this.screen).slideDown();
    }

    handleChange(e) {
        this.setState({ keyword: e.target.value });
        this.props.dispatch(searchRequest(e.target.value));
    }

    handleClose() {
        $(this.screen).slideUp(400, () => {
            this.props.dispatch(searchToggle());
        });

    }

    render() {

        let mapToResults = (data) => {
            console.log(data);
            return data.map((username, i) => {
                return (<a key={i}>{username.username}</a>);
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
                        onChange={this.handleChange}></input>

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
