import React from 'react';
import { connect } from 'react-redux';
import { memoPostRequest } from 'actions/memo';

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
                    Materialize.toast('Posted Successfully!', 4000);
                    this.setState({
                        contents: ""
                    });
                }
            }
        );
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
                        <textarea className="materialize-textarea tooltipped"
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            value={this.state.contents}
                            placeholder="Write down your memo"
                            data-delay="50"
                            data-tooltip="Press [CTRL + ENTER] to post your memo"></textarea>
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
        status: state.memo.post.status
    };
};

export default connect(mapStateToProps)(Write);
