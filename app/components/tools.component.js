import React from 'react';

class Tools extends React.Component {
  render () {
    return (
      <div className="tools">
        <input type="button" onClick={this.props.addNote} id="add" className="btn btn-primary" value="+" />
        <label htmlFor="add">Nova nota</label>
      </div>
    )
  }
}

export default Tools
