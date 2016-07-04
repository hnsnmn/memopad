import React from 'react';
import { Memo } from 'components';


var mockData = [
  {
    "_id": "577a89075a1d8da021afe4f4",
    "writer": "velo",
    "contents": "I think 6 might be better",
    "__v": 0,
    "is_edited": false,
    "date": {
      "edited": "2016-07-04T16:04:23.630Z",
      "created": "2016-07-04T16:04:23.630Z"
    },
    "starred": []
  },
  {
    "_id": "577a86524120e928080c8c51",
    "writer": "velopert",
    "contents": "LISTEN!",
    "__v": 0,
    "is_edited": true,
    "date": {
      "edited": "2016-07-04T15:56:03.877Z",
      "created": "2016-07-04T15:52:50.825Z"
    },
    "starred": []
  },
  {
    "_id": "577a864c4120e928080c8c50",
    "writer": "velopert",
    "contents": "Blow up my horn\n",
    "__v": 0,
    "is_edited": false,
    "date": {
      "edited": "2016-07-04T15:52:44.338Z",
      "created": "2016-07-04T15:52:44.338Z"
    },
    "starred": []
  },
  {
    "_id": "577a86454120e928080c8c4f",
    "writer": "velopert",
    "contents": "Come on",
    "__v": 0,
    "is_edited": false,
    "date": {
      "edited": "2016-07-04T15:52:37.792Z",
      "created": "2016-07-04T15:52:37.792Z"
    },
    "starred": []
  },
  {
    "_id": "577a86434120e928080c8c4e",
    "writer": "velopert",
    "contents": "Hmmm",
    "__v": 0,
    "is_edited": false,
    "date": {
      "edited": "2016-07-04T15:52:35.272Z",
      "created": "2016-07-04T15:52:35.272Z"
    },
    "starred": []
  },
  {
    "_id": "577a86414120e928080c8c4d",
    "writer": "velopert",
    "contents": "I guess i should sleep..",
    "__v": 0,
    "is_edited": false,
    "date": {
      "edited": "2016-07-04T15:52:33.505Z",
      "created": "2016-07-04T15:52:33.504Z"
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
