import React from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoListRequest } from 'actions/memo';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleMemoList.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(memoListRequest(true));
    }

    handleMemoList(listType) {
        if(listType == 'old') {
            if(this.props.isLast) {
                Materialize.toast('You are now reading the last memo', 2000);
                return;
            }
            this.props.dispatch(memoListRequest(false, 'old', this.props.data[this.props.data.length-1]._id));
        } else {
            this.props.dispatch(memoListRequest(false, 'new', this.props.data[0]._id));
        }
    }

    render() {
        return (
            <div>
                    <button onClick={ () => {this.handleMemoList('new'); }}>New</button>
                    <button onClick={ () => {this.handleMemoList('old'); }}>Old</button>
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
        data: state.memo.list.data,
        isLast: state.memo.list.isLast
    };
};

export default connect(mapStateToProps)(Home);
