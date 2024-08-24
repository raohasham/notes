import { useState , useEffect } from 'react'
import Note from "./components/note" 
import axios from 'axios'


const App = () => {
  const [notes ,  setnotes] = useState([])
  const [newNote,setnewNote] = useState("new note...")
  const [showall, setshowall]=useState(false)

useEffect(()=>{
  console.log('effect');
  axios
  .get('http://localhost:3001/notes')
  .then(res=>{
    console.log('promise fullfilled');
    setnotes(res.data)
    console.log('render ',notes.length,"notes ");
    
  } 
)
},[])

  function addNote(e){
    e.preventDefault();
  
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    setnotes(notes.concat(noteObject))
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