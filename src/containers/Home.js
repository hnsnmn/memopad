import React from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoListRequest } from 'actions/memo';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleMemoList.bind(this);
        this.state = {
            loadingState: false
        };
    }
    componentDidMount() {

        let getNewMemo = () => {
            this.handleMemoList('new');
            this.memoLoaderTimeoutId = setTimeout(getNewMemo, 5000);
        };

        //INITIAL LOAD
        this.props.dispatch(memoListRequest(true)).then(
            // ENSURES NOT TO LOAD ADDITIONAL MEMO BEFORE INITIAL LOAD ENDS
            () => {
                // LOAD OLDER MEMO WHEN SCROLLED
                $(window).scroll(() => {
                    if ($(document).height() - $(window).height() - $(window).scrollTop() < 160) {
                        if(!this.state.loadingState) {
                            this.setState({loadingState: true});
                            this.handleMemoList('old');
                        }
                    }
                });

                // IF THERE IS NO SCROLLBAR, LOAD ONE MORE PAGE
                if ($("body").height() < $(window).height()) {
                    this.handleMemoList('old');
                }

                // LOAD NEWER MEO EVERY 5 SECONDS
                getNewMemo();
            }
        );


    }

    handleMemoList(listType) {
        if(listType == 'old') {
            if(this.props.isLast) {
                Materialize.toast('You are now reading the last memo', 2000);
                return;
            }
            this.props.dispatch(memoListRequest(false, 'old', this.props.data[this.props.data.length-1]._id)).then(
                ()=> {
                    this.setState({ loadingState: false });
                }
            );
        } else {
            this.props.dispatch(memoListRequest(false, 'new', this.props.data[0]._id));
        }
    }

    render() {
        return (
            <div>
                    { this.props.isLoggedIn ? ( <Write/> ) : (<div/>) }
                    <MemoList data={this.props.data}/>
            </div>
        );
    }

    componentWillUnmount() {
        // REMOVE WINDOWS SCROLL EVENT
        $(window).unbind();

        // CLEAR TIMEOUT
        clearTimeout(this.memoLoaderTimeoutId);
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
