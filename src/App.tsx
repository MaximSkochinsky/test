import './App.css';
import Notes from './screens/Notes';
import EditTags from './screens/EditTags';
import EditNote from './screens/EditNote';
import CreateNote from './screens/CreateNote';
import { useState } from 'react';

function App() {

  const [ tagScreen, setTagScreen ] = useState(false);
  const [ editScreen, setEditScreen ] = useState(false);
  const [ createScreen, setCreateScreen ] = useState(false);

  return (
    <main>
      <h1>Note App with Tags</h1>
      { !tagScreen && !editScreen && !createScreen && <Notes 
        tagScreen={ () => setTagScreen(true) } 
        editScreen={ () => setEditScreen(true) } 
        createScreen={ () => setCreateScreen(true) }
        data-testid='Note' 
      /> }
      { tagScreen && <EditTags tagScreen={ () => setTagScreen(false) } /> }
      { editScreen && <EditNote editScreen={ () => setEditScreen(false) } /> } 
      { createScreen && <CreateNote createScreen={ () => setCreateScreen(false) } /> } 
    </main>
  );
}

export default App;