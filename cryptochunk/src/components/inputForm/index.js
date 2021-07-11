import React from 'react'

export default class InputSection extends React.Component {
        
    constructor(props) {
        super(props);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleColChange = this.handleColChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateChunk = this.props.updateChunk.bind(this);
        this.state = {loc: '0D4', col: '009900'}
    }

    handleLocChange(event) {
        event.preventDefault();
        this.setState({loc: event.target.value});
    }
    handleColChange(event) {
        event.preventDefault();
        this.setState({col: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateChunk(this.state.loc, this.state.col);
    }

    render() {
        return (
            <form>
                <label>
                    Loc:
                    <input type="text" value={this.state.loc} onChange={this.handleLocChange.bind(this)}/>
                </label>
                <label>
                    Col:
                    <input type="text" value={this.state.col} onChange={this.handleColChange.bind(this)}/>
                </label>
                <button onClick={this.handleSubmit}>send</button>
            </form>
        );
    }
}