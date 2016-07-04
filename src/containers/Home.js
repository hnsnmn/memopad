import React from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div>
                    { this.props.isLoggedIn ? ( <Write/> ) : (<div/>) }
                    <MemoList/>
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
