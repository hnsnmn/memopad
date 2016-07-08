import React from 'react';
import { Write, MemoList } from 'components';
import { connect } from 'react-redux';
import { memoListRequest } from 'actions/memo';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleMemoList.bind(this);
        this.loadWhenNoScroll = this.loadWhenNoScroll.bind(this);
        this.state = {
            loadingState: false
        };
    }

    componentDidMount() {

        // LOADS THE NEW MEMO EVERY 5 SECONDS
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
                    // WHEN HEIGHT UNDER SCROLLBOTTOM IS LESS THEN 250
                    if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                        if(!this.state.loadingState) {
                            this.setState({loadingState: true});
                            this.handleMemoList('old');
                        }
                    } else {
                        this.setState({ loadingState: false });
                    }
                });

                // IF THERE IS NO SCROLLBAR, LOAD ONE MORE PAGE
                this.loadWhenNoScroll();

                // LOAD NEWER MEO EVERY 5 SECONDS
                getNewMemo();
            }
        );


    }

    // LOADS MORE MEMO WHEN THERE IS NO SCROLL BAR IN THE DOCUMENT
    loadWhenNoScroll() {
        if ($("body").height() < $(window).height()) {
            this.props.dispatch(memoListRequest(false, 'old', this.props.data[this.props.data.length-1]._id)).
            then(
                () => {
                    // DO THIS RECURSIVELY
                    this.loadWhenNoScroll();
                }
            );

        }
    }


    handleMemoList(listType) {
        if(listType == 'old') {
            // LOAD OLD MEMOS
            if(this.props.isLast) {
                Materialize.toast('You are now reading the last memo', 2000);
                return;
            }
            this.props.dispatch(memoListRequest(false, 'old', this.props.data[this.props.data.length-1]._id));
        } else {
            // LOAD NEW MEMOS
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

    componentDidUpdate(prevProps, prevState) {
        // DETECT MEMO REMOVAL
        if(prevProps.data.length > this.props.data.length) {
            console.log("DELETED");
            this.loadWhenNoScroll();
        }
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
