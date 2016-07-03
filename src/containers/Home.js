import React from 'react';
import { Write } from 'components';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div>
                    { this.props.isLoggedIn ? ( <Write/> ) : (<div/>) }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    };
};

export default connect(mapStateToProps)(Home);
