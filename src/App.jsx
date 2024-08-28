import { Provider } from 'react-redux';
import Store from './App/Store';
import Navbar from './components/Navbar';
function App() {

  return (
    <>
    <Provider store={Store}>
      <Navbar/>
    </Provider>
    </>
  )
}

export default App
