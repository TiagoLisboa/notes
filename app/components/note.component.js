import React from 'react';

class Note extends React.Component {
  render () {
    let texto = this.props.nota.titulo + "\n" + this.props.nota.texto;
    return (
      <div>
        <textarea value={texto} onChange={this.props.onChange} className="notaTexto" />
      </div>
    )
  }
}

export default Note
