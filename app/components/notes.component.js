import React from 'react';


class Notes extends React.Component {
  render () {
    const notasArr = this.props.notes.map((el, i) => {
      return <li className="notaSelector" value={i} key={"notas." + i} onClick={this.props.onClick}>{el.titulo}</li>;
    })
    return (
      <div>
        <ul className="notasContainer">
          {notasArr}
        </ul>
      </div>
    )
  }
}

export default Notes
