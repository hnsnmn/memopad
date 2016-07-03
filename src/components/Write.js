import React from 'react';
import { connect } from 'react-redux';
import { memoPostRequest } from 'actions/memo';
import { browserHistory } from 'react-router';

class Write extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e) {
        this.setState({
            contents: e.target.value
        });
    }

    handleClick() {
        this.props.dispatch(memoPostRequest(this.state.contents)).then(
            () => {
                if(this.props.status === 'SUCCESS'){
                    Materialize.toast('Posted Successfully!', 2000);
                    this.setState({
                        contents: ""
                    });
                } else {
                    if(this.props.error === 1) {
                        let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                        Materialize.toast($toastContent, 4000);
                        browserHistory.push('/');
                    } else {
                        let $toastContent = $('<span style="color: #FFB4BA">Something is gone wrong</span>');
                        Materialize.toast($toastContent, 4000);
                    }
                }
            }
        );
    }

    handleTextareaClick() {
        Materialize.toast('<b>Tip:</b>&nbsp;You can post your memo by pressing [Ctrl + Enter]', 2000);
    }

    handleKeyDown(e) {
        if( e.ctrlKey && e.keyCode == 13) {
            console.log("CTRL+ENTER is PRESSED");
            this.handleClick();
        }
    }

    render() {
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea className="materialize-textarea"
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            value={this.state.contents}
                            placeholder="Write down your memo"
                            onClick={this.handleTextareaClick}>
                        </textarea>

                    </div>
                    <div className="card-action">
                      <a href="#" onClick={this.handleClick}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.memo.post.status,
        error: state.memo.post.error
    };
};

export default connect(mapStateToProps)(Write);
