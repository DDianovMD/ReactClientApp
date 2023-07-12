import Router from './Components/router/Router';
// import { PrimeReactProvider } from 'primereact/api';
// import { QueryClientProvider, QueryClient } from 'react-query';
// import { PrimeReactHomePage } from './Components/prime-react-homepage/PrimeReactHomePage';

// const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router />
      {/* <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>
          <PrimeReactHomePage></PrimeReactHomePage>
        </PrimeReactProvider>
      </QueryClientProvider> */}
    </div>
  );
}

export default App;
