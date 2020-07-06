const axios = require('axios').default;

class Note {
    constructor(){
        this.title = document.getElementById('txtTitle');
        this.content = document.getElementById('txtContent');
        this.hour = document.getElementById('txtHour');
        this.date = document.getElementById('txtDate');
        this.btnInsert = document.getElementById("btnInsertNote");

        this.getNotes();
        this.events();
    }

    events() {
        this.btnInsert.onclick = (event) => this.createNote();
    }

    getNotes(){
        axios.get('http://localhost:4000/notes')
        .then((result) => {
            this.recoveryNotes(result.data.notes);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    recoveryNotes(data) {
        for(note of data) {
            const html = this.noteLayout(note.id, note.title, note.content, note.hour, note.date);
            this.insertHtml(html);
        }
    }

    noteLayout(id, title, content, hour, date) {
        const html = `
            <div class="notes">
                <div class="bg-dark border border-light rounded text-white text-weight-bold text-center card mb-3">
                    <div class="card-header">Data:${date} | Hora: ${hour}</div>
                    <div class="card-body">
                        <h5 class="card-title">${title} </h5>
                        <p class="card-text">  ${content} </p>
                    </div>
                </div>
            </div>
            <br>
        `
        return html;
    }

    insertHtml(html) {
        document.getElementById('noteBoard').innerHTML += html;
    }

    createNote() {
        if(this.title.value && this.content.value && this.hour.value && this.date.value) {
            let note = {
                title: this.title.value,
                content: this.content.value,
                hour: this.hour.value,
                date: this.date.value
            }
            this.sendNote(note);
            alert('Nota adicionada com sucesso!');
        } else {
            alert('Preencha todos os campos!');
        }
    }

    sendNote(note) {
        axios.post('http://localhost:4000/notes', note)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

}

new Note();