import './App.css';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Start from './pages/Start';
import Login from './pages/Login';
import Students from './pages/Students';
import Teacher from './pages/Teacher';
import Exams from './pages/Exams'
import Attendance from './pages/Attendance'
import Result from './pages/Result';
import Subjects from './pages/Subjects';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import Classes from './pages/Classes'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/start" element={<Start />} />

      <Route path="/home" element={<Home />}>
        <Route path="students" element={<Students />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="teachers" element={<Teacher />} />
        <Route path='exams' element={<Exams />} />
        <Route path='attendance' element={<Attendance />} />
        <Route path='results' element={<Result />} />
        <Route path='timetable' element={<Timetable />} />
        <Route path='classes' element={<Classes />} />
      </Route>
    </Routes>
  );
};

export default App;
