import Router from "./Components/router/Router";
import { QueryClientProvider, QueryClient } from "react-query";
import { PrimeReactProvider } from "primereact/api";
import { PrimeReactHomePage } from "./Components/prime-react-homepage/PrimeReactHomePage";
import { EmployeeContext } from "../src/Models/EmployeeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
        {/* <Router /> */}
        <PrimeReactProvider>
            <QueryClientProvider client={queryClient}>
              <EmployeeContext.Provider value="test">
                <PrimeReactHomePage />
              </EmployeeContext.Provider>
            </QueryClientProvider>
        </PrimeReactProvider>
    </div>
  );
}

export default App;
