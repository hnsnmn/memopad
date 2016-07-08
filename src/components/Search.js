import React from 'react';
import { connect } from 'react-redux';
import { searchToggle } from 'actions/search';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        $(this.screen).slideDown();
    }

    handleClose() {
        $(this.screen).slideUp(400, () => {
            this.props.dispatch(searchToggle());
        });

    }

    render() {
        return (
            <div ref={(ref) => { this.screen = ref; } } className="search-screen white-text">
                <div className="right">
                    <a className="waves-effect waves-light btn red lighten-1"
                        onClick={this.handleClose}>CLOSE</a>
                </div>
                <div className="container">
                    <input placeholder="Search a user"></input>
                </div>
            </div>
        );
    }

    componentWillUnmount() {

    }

}
export default connect()(Search);
