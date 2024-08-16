import { useState } from 'react'
import Note from "./components/note" 


const App = (props) => {
  const [notes ,  setnote] = useState(props.notes)
  const [newNote,setnewNote] = useState("new note...")
  const [showall, setshowall]=useState(false)

  function addNote(e){
    e.preventDefault();
  
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    setnote(notes.concat(noteObject))
    setnewNote('')

  }
 function handleChange(e){

  setnewNote(e.target.value)

 }
 const notesToShow = showall ? notes : notes.filter(note=>note.important)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
            {notesToShow.map( note => <Note key={note.id} note={note} />
            )}

            
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleChange} value={newNote}/>
        <button type="submit">save</button>
      </form>
      <button onClick={()=>{setshowall(!showall)}}>
        show {showall? 'important':'all'}
      </button>
    </div>
  )
}

export default App