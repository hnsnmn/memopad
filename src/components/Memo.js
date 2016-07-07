import React from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { memoRemoveRequest, memoRemoveFromData, memoEditRequest } from 'actions/memo';

class Memo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRemoving: false,
            isEdit: false,
            value: props.data.contents
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleRemove() {
        this.props.dispatch(memoRemoveRequest(this.props.data._id)).then(
            () => {
                if(this.props.remove.status === 'SUCCESS') {
                    Materialize.toast('Your memo is gone!', 2000);

                    this.setState({
                        isRemoving: true
                    });

                    // RUN 500 ms LATER (ANIMATION DURATION)
                    setTimeout(() => {
                        // USE JQUERY BECAUSE USING MAX-HEIGHT IN DYNAMIC ELEMENT IS QUITE BUGGY
                        $(this.card).slideUp(500, () => {
                            this.props.dispatch(memoRemoveFromData(this.props.data._id));
                        });
                    }, 500);

                } else {
                    // 0 INVALID ID 1 NOT LOGGED IN 2 MEMO NOT FOUND 3 THATS NOT YOUR MEMO
                    let message;
                    switch(this.props.remove.error) {
                        case 0:
                            message = 'Something is wrong with the memo';
                            break;
                        case 1:
                            message = 'You are not logged in';
                            break;
                        case 2:
                            message = 'That memo does not exist';
                            break;
                        case 3:
                            message = 'That is not your memo';
                            break;
                        default:
                            message = "Something's gone wrong";
                    }

                    let $toastContent = $('<span style="color: #FFB4BA">' + message + '</span>');
                    Materialize.toast($toastContent, 2000);
                }
            }
        );
    }

    toggleEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleEdit() {
        this.props.dispatch(memoEditRequest(this.props.data._id, this.state.value)).then(
            () => {
                if(this.props.edit.status === 'SUCCESS') {
                    this.toggleEdit();
                } else {

                    let message;
                    switch(this.props.remove.error) {
                        case 0:
                            message = 'Please write something';
                            break;
                        case 1:
                            message = 'Something is wrong with the memo';
                            break;
                        case 2:
                            message = 'You are not logged in';
                            break;
                        case 3:
                            message = 'That is not your memo';
                            break;
                        default:
                            message = "Something's gone wrong";
                    }

                    let $toastContent = $('<span style="color: #FFB4BA">' + message + '</span>');
                    Materialize.toast($toastContent, 2000);
                    this.toggleEdit();
                }
            }
        );
    }

    handleKeyDown(e) {
        if( e.ctrlKey && e.keyCode == 13) {
            console.log("CTRL+ENTER is PRESSED");
            this.handleEdit();
        }
    }

    render() {

        // SHOW POST OPTIONS WHEN IT BELONGS TO THE USER
        let postOptionsVisibility = (this.props.data.writer == this.props.currentUser) ? 'visible' : 'hidden';

        // RENDERING CONTENT FOR POST OPTIONS
        let postOptions = (this.props.data.writer === this.props.currentUser) ? (
            <div className="right">
                <a className='dropdown-button' id={'dropdown-button-'+this.props.data._id} data-activates={'dropdown-'+this.props.data._id}><i className="material-icons icon-button">more_vert</i></a>

                <ul id={'dropdown-'+this.props.data._id} className='dropdown-content'>
                  <li><a onClick={this.toggleEdit}>Edit</a></li>
                  <li><a onClick={this.handleRemove}>Remove</a></li>
                </ul>
            </div>
        ) : '';

        // MAKE CONTENTS TO MULTILINED CONTENTS BY REPLACING \n TO BR TAG
        let multiLineContents = this.props.data.contents.split('\n').map(
                (line, i) => {
                    return (
                        <span key={i}>{line}<br/></span>
                    );
                }
        );

        // EDITED info
        let editedInfo = (
            <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );



        // VARIABLE FOR STAR COUNT
        let starCount = this.props.data.starred.length;

        // IF IT IS STARRED ( CHECKS WHETHER THE NICKNAME EXISTS IN THE ARRAY )
        // RETURN STYLE THAT HAS A YELLOW COLOR
        let isStarred = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;

        let memoView = (
            <div className="card">
                <div className="info">
                    <span className="username">{this.props.data.writer}</span> wrote a log · <TimeAgo date={this.props.data.date.created} live={true}/>
                    {this.props.data.is_edited ? editedInfo : '' }{postOptions}
                </div>
                <div className="card-content">
                    {multiLineContents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button" style={isStarred}>star</i><span className="star-count">{starCount}</span>
                </div>
            </div>
        );

        let editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}>
                        </textarea>
                    </div>
                    <div className="card-action">
                      <a onClick={this.handleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );



        return(
            <div ref={(ref)=>{this.card = ref;}} className={'container memo ' + (this.state.isRemoving ? 'memo-fade-out' : 'memo-fade-in' ) }>
                {this.state.isEdit ? editView : memoView }
            </div>
        );
    }

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });

    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });

    }
}



const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        remove: state.memo.remove,
        edit: state.memo.edit
    };
};

export default connect(mapStateToProps)(Memo);
