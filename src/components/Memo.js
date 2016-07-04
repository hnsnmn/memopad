import React from 'react';
import { Dropdown, NavItem } from 'react-materialize';
import { connect } from 'react-redux';

class Memo extends React.Component {

    render() {

        let action = (this.props.data.date.created != this.props.data.date.edited) ? 'edited' : 'wrote';

        let showPostOptions = () => {
            if(this.props.data.writer === this.props.currentUser) {
                return (
                    <div className="right">
                        <Dropdown trigger={<div><i className="material-icons icon-button">more_vert</i></div>}>
                            <NavItem>Edit</NavItem>
                            <NavItem>Remove</NavItem>
                        </Dropdown>
                    </div>
                );
            } else {
                return '';
            }
        };

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
                        <span className="username">{this.props.data.writer}</span> {action} a log · 2 hours ago
                        {showPostOptions()}
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
