import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReactRouting from '@/routes/ReactRouting';
import '@/index.css'

function App() {
  return (
    <BrowserRouter>
      <ReactRouting />
      <ToastContainer icon={true} position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
