import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import App from './App'

 axios.get('http://localhost:3001/notes').then(res=>{const notes = res.data;
  console.log(notes);
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App notes={notes} />
  )
})


