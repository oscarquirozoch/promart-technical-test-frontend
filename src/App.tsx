import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './App.css'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from './router/AppRouter';
import { store } from './store/store';


function App() {
  return (
    <Provider store={store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>

  )
}

export default App
