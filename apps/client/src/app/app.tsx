// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../comps/Home/Home';
import Studio from '../comps/studio/Studio';
import Workspace from '../comps/studio/workspaces/workspace/workspace';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path='/studio' element={<Studio />}/>
        <Route path='/studio/:workspaceId' element={<Workspace/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
