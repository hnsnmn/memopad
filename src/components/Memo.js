import React from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

class Memo extends React.Component {

    render() {
        console.log(this.props.data);
        let action = (this.props.data.date.created != this.props.data.date.edited) ? 'edited' : 'wrote';

        let postOptionsVisibility = (this.props.data.writer == this.props.currentUser) ? 'visible' : 'hidden';

        let postOptions = (this.props.data.writer === this.props.currentUser) ? (
            <div className="right">
                <a className='dropdown-button' id={'dropdown-button-'+this.props.data._id} data-activates={'dropdown-'+this.props.data._id}><i className="material-icons icon-button">more_vert</i></a>

                <ul id={'dropdown-'+this.props.data._id} className='dropdown-content'>
                  <li><a>Edit</a></li>
                  <li><a>Remove</a></li>
                </ul>
            </div>
        ) : '';

        let multiLineContents = this.props.data.contents.split('\n').map(
                (line, i) => {
                    return (
                        <span key={i}>{line}<br/></span>
                    );
                }
        );

        let starCount = this.props.data.starred.length;

        let isStarred = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;


        return(
            <div className="container memo">
                <div className="card">
                    <div className="info">
                        <span className="username">{this.props.data.writer}</span> {action} a log · <TimeAgo date={this.props.data.date.edited} live={false}/>
                        {postOptions}
                    </div>
                    <div className="card-content">
                        {multiLineContents}
                    </div>
                    <div className="footer">
                        <i className="material-icons log-footer-icon star icon-button" style={isStarred}>star</i><span className="star-count">{starCount}</span>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
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
        currentUser: state.authentication.status.currentUser
    };
};
export default connect(mapStateToProps)(Memo);

/*
{
    "_id": "577a64ff950f069406ec9f98",
    "writer": "velo",
    "contents": "i can't take my eyes~~~~ of .. you!\nhey\nhey\nhey",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T13:30:39.082Z",
      "created": "2016-07-04T13:30:39.082Z"
    },
    "starred": ['velo', 'anymore', 'pert']
  }
*/
