import Router from './Components/router/Router';
import { QueryClientProvider, QueryClient } from 'react-query';
// import { PrimeReactProvider } from 'primereact/api';
// import { PrimeReactHomePage } from './Components/prime-react-homepage/PrimeReactHomePage';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router />
        {/* <PrimeReactProvider>
          <PrimeReactHomePage></PrimeReactHomePage>
        </PrimeReactProvider> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
