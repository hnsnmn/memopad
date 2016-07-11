import React from 'react';
import { MemoList } from 'components';
import { connect } from 'react-redux';
import { memoListRequest, memoClear } from 'actions/memo';


class Wall extends React.Component {

    constructor(props) {
        super(props);
        this.handleMemoList = this.handleMemoList.bind(this);

        this.state = {
            loadingState: false,
            initiallyLoaded: false
        };
    }

    componentDidMount() {

        // LOADS THE NEW MEMO EVERY 5 SECONDS
        let getNewMemo = () => {
            this.handleMemoList('new');
            this.memoLoaderTimeoutId = setTimeout(getNewMemo, 5000);
        };

        //INITIAL LOAD
        this.props.dispatch(memoListRequest(true, undefined, undefined, this.props.params.username)).then(
            // ENSURES NOT TO LOAD ADDITIONAL MEMO BEFORE INITIAL LOAD ENDS
            () => {
                this.setState({
                    initiallyLoaded: true
                });

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

                if(!this.props.isLast) {
                    // IF THERE IS NO SCROLLBAR, LOAD ONE MORE PAGE
                    this.loadWhenNoScroll();
                    // LOAD NEWER MEO EVERY 5 SECONDS
                    getNewMemo();
                }
            }
        );

    }

    // LOADS MORE MEMO WHEN THERE IS NO SCROLL BAR IN THE DOCUMENT
    loadWhenNoScroll() {

        if ($("body").height() < $(window).height()) {
            this.props.dispatch(memoListRequest(false, 'old', this.props.data[this.props.data.length-1]._id, this.props.params.username)).
            then(
                () => {
                    if(!this.props.isLast){
                        this.loadWhenNoScroll();
                    }
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
            this.props.dispatch(memoListRequest(false, 'old', this.props.data[this.props.data.length-1]._id, this.props.params.username));
        } else {
            // LOAD NEW MEMOS
            if(this.props.data.length===0) {
                // if empty, do the same thing as the initial load
                this.props.dispatch(memoListRequest(true, undefined, undefined, this.props.params.username));
            } else {
                this.props.dispatch(memoListRequest(false, 'new', this.props.data[0]._id, this.props.params.username));
            }
        }
    }


    render() {

        const emptyView = (
            <div className="container">
                <div className="empty-page">
                    <b>{this.props.params.username}</b> isn't registered or hasn't written any memo
                </div>
            </div>
        );

        return (
            <div>
                <div className="container wall-info">
                    <div className="card wall-info blue lighten-2 white-text">
                        <div className="card-content">
                            {this.props.params.username}
                        </div>
                    </div>
                </div>
                <MemoList data={this.props.data}/>
                { this.props.data.length === 0 && this.state.initiallyLoaded ? emptyView : undefined }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        // DETECT MEMO REMOVAL
        if(prevProps.data.length > this.props.data.length) {
            this.loadWhenNoScroll();
        }

        // USER CHANGE
        if(prevProps.params.username !== this.props.params.username) {

            $(window).unbind();
            clearTimeout(this.memoLoaderTimeoutId);
            this.props.dispatch(memoClear());

            this.setState({
                initiallyLoaded: false
            });

            this.componentDidMount();
        }
    }

    componentWillUnmount() {
        $(window).unbind();
        clearTimeout(this.memoLoaderTimeoutId);

        this.props.dispatch(memoClear());
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


export default connect(mapStateToProps)(Wall);
