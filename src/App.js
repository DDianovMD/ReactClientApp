import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './Components/navbar/NavBar';
import { Home } from './Components/home/Home.js'
import { Edit } from './Components/edit/Edit';
import { Add } from './Components/add/Add';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// import { PrimeReactProvider } from 'primereact/api';
// import { QueryClientProvider, QueryClient } from 'react-query';
// import { PrimeReactHomePage } from './Components/prime-react-homepage/PrimeReactHomePage';

// const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
           <Route path='/edit' element={<Edit />}></Route>
           <Route exact path='/add' element={<Add />}></Route>
        </Routes>
      </Router> 
      {/* <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <PrimeReactHomePage></PrimeReactHomePage>
        </PrimeReactProvider>
      </QueryClientProvider> */}
    </div>
  );
}

export default App;
