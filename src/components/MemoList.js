import React from 'react';
import { Memo } from 'components';

class MemoList extends React.Component {
    render() {
        let mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo data={memo} key={memo._id}/>);
            });
        };

        return (
            <div>
                { mapToComponents(this.props.data) }
            </div>
        );
    }
}

export default MemoList;
