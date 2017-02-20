'use strict';

import React from 'react';

import Note from '../components/note.component';
import Notes from '../components/notes.component';
import Tools from '../components/tools.component';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = props.saveData
  }

  saveUpdate () {
    ipcRenderer.send('dataUpdate', this.state);
  }

  noteTextChangeHandler (e) {
    const target = e.target;
    const value = target.value;
    const notas = this.state.notas;
    const notaAtiva = this.state.notaAtiva;

    const newNotes = notas.map((el) => {
      if(el._id == notaAtiva){
        el.titulo = value.split('\n')[0]
        el.texto = value.split('\n').slice(1).join("\n");
      }
    });

    this.setState({
      notas,
      notaAtiva
    });
    this.saveUpdate();
  }

  notesClickHandler (e) {
    this.setState({
      notas: this.state.notas,
      notaAtiva: e.target.value
    });
    this.saveUpdate();
  }

  addNoteHandler (e) {
    let notas = this.state.notas
    notas.push({_id: notas.length , titulo: '', texto: ''});
    this.setState({
      notas: notas,
      notaAtiva: this.state.notaAtiva
    })
    this.saveUpdate();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-3 col-left">
            <Tools addNote={this.addNoteHandler.bind(this)}/>
            <Notes notes={this.state.notas} onClick={this.notesClickHandler.bind(this)}/>
          </div>
          <div className="col-xs-9 col-right">
            <Note nota={this.state.notas[this.state.notaAtiva]} onChange={this.noteTextChangeHandler.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App
