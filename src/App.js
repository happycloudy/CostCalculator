import {Container} from 'react-bootstrap';
import AddWorker from './Components/AddWorker'
import AddTask from './Components/AddTask'
import Cost from './Components/Cost'

function App() {
  
  
  return (
    <div className="App">
      <Container>  

      <AddWorker/>
      <AddTask/>
      <Cost/>
      
      </Container>
    </div>
  );
}

export default App;
