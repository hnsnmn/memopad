import React from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoListRequest } from 'actions/memo';

class Home extends React.Component {

    componentDidMount() {
        this.props.dispatch(memoListRequest(true));
    }

    render() {
        return (
            <div>
                    { this.props.isLoggedIn ? ( <Write/> ) : (<div/>) }
                    <MemoList data={this.props.data}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        listStatus: state.memo.list.status,
        data: state.memo.list.data
    };
};

export default connect(mapStateToProps)(Home);
