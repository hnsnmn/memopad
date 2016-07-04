import React from 'react';
import { Write, Memo } from 'components';
import { connect } from 'react-redux';

class Home extends React.Component {
    render() {
        return (
            <div>
                    { this.props.isLoggedIn ? ( <Write/> ) : (<div/>) }
                    <Memo data={
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
                        }/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    };
};

export default connect(mapStateToProps)(Home);
