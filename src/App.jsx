import './App.css';
import NavbarAdmin from './components/Admin/NavbarAdmin';
import NavbarHome from './common/NavbarHome';
import AdminHome from './pages/AdminPages/AdminHome';
import { ManageCourse } from './pages/AdminPages/ManageCourse';
import ManageIntern from './pages/AdminPages/ManageIntern';
import { ManageTrainer } from './pages/AdminPages/ManageTrainer';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InternNavBar from './components/Intern/InternNavBar';
import InternHome from './pages/InternPages/InternHome';
import InternTask from './pages/InternPages/InternTask';
import TrainerNavbar from './components/Trainer/TrainerNavbar';
import TrainerHome from './pages/TrainerPages/TrainerHome';
import ViewIntern from './pages/TrainerPages/ViewIntern';
import AssignTask from './pages/TrainerPages/AssignTask';
import TrainerRegister from './components/RegisterLogin/TrainerRegister';
import InternRegister from './components/RegisterLogin/InternRegister';
import Login from './components/RegisterLogin/Login';
import UpdateCourse from './components/Admin/UpdateCourse';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavbarHome/>} >
          <Route index element={<Home/>}/>
          <Route path='trainer-register-login' element={<TrainerRegister/>}/>
          <Route path='intern-register-login' element={<InternRegister/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
        <Route path='/admin' element={<NavbarAdmin/>}>
           <Route index element={<AdminHome/>}/>
            <Route path='manageTrainer' element={<ManageTrainer/>}/>
            <Route path='manageIntern' element={<ManageIntern/>}/>
            <Route path='manageCourse' element={<ManageCourse/>}/>
            <Route path='updateCourse/:id' element={<UpdateCourse/>}/>
        </Route>
        <Route path='/intern' element={<InternNavBar/>}>
          <Route index element={<InternHome/>}/>
          <Route path='task' element={<InternTask/>}/>
        </Route>
        <Route path='/trainer' element={<TrainerNavbar/>}>
          <Route index element={<TrainerHome/>}/>
          <Route path='viewIntern' element={<ViewIntern/>}/>
          <Route path='assignTask' element={<AssignTask/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
