import React from 'react';

class Write extends React.Component {
    render() {
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea className="materialize-textarea"></textarea>
                    </div>
                    <div className="card-action">
                      <a href="#" className="">POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Write;
