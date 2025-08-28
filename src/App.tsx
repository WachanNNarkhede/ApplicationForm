
import './App.css'
import { Routes, Route } from 'react-router-dom'
// import PersonalInformation from './components/PersonalInformation'
import Page1 from './pages/page'

function App() {

  return (
    <Routes>
 <Route path='/' element={<Page1/>}/>

    
    </Routes>
  )
}

export default App
