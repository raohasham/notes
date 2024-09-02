import { useState , useEffect } from 'react'
import Note from "./components/note" 
import notesServices from './services/notes'
import Notification from './components/notifcation'



const App = () => {
  const [notes ,  setnotes] = useState([])
  const [newNote,setnewNote] = useState("new note...")
  const [showall, setshowall]=useState(false)
  const [errorMsg,setErrorMsg]=useState('some error happened')


  const toggleImportance=(id)=>{

    const note= notes.find(n=>n.id===id);
    const changedNote={...note,important:!note.important};
    
   notesServices
    .update(id,changedNote)
    .then(res=>setnotes(notes.map(n=>n.id!==id ? n :res)))
    .catch(error =>{
      setErrorMsg(`note ${note.content} was already removed from the server`)
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
      setNote(notes.filter(n => n.id !== id))
    });
    
    
  }

useEffect(()=>{
 
notesServices
  .getAll()
  .then(res=>{
    console.log('promise fullfilled');
    setnotes(res)
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
notesServices
.create(noteObject)
.then(returnedNote => {
  setNotes(notes.concat(returnedNote))
  setNewNote('')
})

  }
  
 function handleChange(e){

  setnewNote(e.target.value)

 }
 
 const notesToShow = showall ? notes : notes.filter(note=>note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg}/>
      <ul>
            {notesToShow.map( note => <Note key={note.id} note={note} 
            toggleImportance={()=>{toggleImportance(note.id)}}/>)}
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