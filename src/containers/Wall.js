import React from 'react';
import { MemoList } from 'components';
import { connect } from 'react-redux';

class Wall extends React.Component {
    render() {
        return (
            <div>Wall for {this.props.params.username}</div>
        );
    }
}

export default connect()(Wall);
