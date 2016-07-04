import React from 'react';
import { Memo } from 'components';


var mockData = [
  {
    "_id": "577a7ea8a62ccc8013e9e59f",
    "writer": "velopert",
    "contents": "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T15:20:08.103Z",
      "created": "2016-07-04T15:20:08.102Z"
    },
    "starred": []
  },
  {
    "_id": "577a7e9ca62ccc8013e9e59e",
    "writer": "velopert",
    "contents": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T15:19:56.015Z",
      "created": "2016-07-04T15:19:56.015Z"
    },
    "starred": []
  },
  {
    "_id": "577a7e8da62ccc8013e9e59d",
    "writer": "velopert",
    "contents": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system,",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T15:19:41.664Z",
      "created": "2016-07-04T15:19:41.664Z"
    },
    "starred": []
  },
  {
    "_id": "577a7e86a62ccc8013e9e59c",
    "writer": "velopert",
    "contents": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T15:19:34.365Z",
      "created": "2016-07-04T15:19:34.365Z"
    },
    "starred": []
  },
  {
    "_id": "577a7e7aa62ccc8013e9e59b",
    "writer": "velopert",
    "contents": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    "__v": 0,
    "date": {
      "edited": "2016-07-04T15:19:22.486Z",
      "created": "2016-07-04T15:19:22.486Z"
    },
    "starred": []
  }
];

class MemoList extends React.Component {
    render() {
        let mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo data={memo} key={i}/>);
            });
        };

        return (
            <div>
                { mapToComponents(mockData) }
            </div>
        );
    }
}

export default MemoList;
