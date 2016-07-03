import React from 'react';

class Write extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contents: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            contents: e.target.value
        });
    }

    render() {
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea className="materialize-textarea"
                            onChange={this.handleChange}
                            value={this.state.contents}
                            placeholder="Write down your memo"></textarea>
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
