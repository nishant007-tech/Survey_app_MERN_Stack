import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './components/api_config';
import Privateroute from './components/privateroute';
import CreatePost from './components/createPost';
import AdminHome from './components/adminHome';
import ViewSurveyAdmin from './components/view_survey_admin';
import { NotificationContainer } from 'react-notifications';
import EditSurveyAdmin from './components/edit_survey_admin';
import UserHome from './components/user-home';
import SubmitSurveyResponse from './components/submit_survey_response';
import Register from './components/register';


function App() {

  const [apiData, setapiData] = useState([])

  let token = localStorage.getItem("survey-user-token")
  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        if (token) {
          let res = await axios.get(`${API_URL}/getuser`, {
            headers: {
              "x-auth-token": token
            }
          })
          if (res)
            setapiData(res.data?.user);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [token])
  return (
    <Router>
      <NotificationContainer />
      <Navbar apiData={apiData} token={token} />
      <Routes>
        <Route exact path="/" element={<Privateroute Component={<Home />} token={token} apiData={apiData} />}
        />
        <Route path="/login" element={<Privateroute Component={<Login />} apiData={apiData} />} />
        <Route exact path="/create-survey" element={<CreatePost userData={apiData} />} />
        <Route exact path="/admin-home" element={<AdminHome token={token} />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/view_survey/:id" element={<ViewSurveyAdmin token={token} />} />
        <Route exact path="/edit_survey/:id" element={<EditSurveyAdmin token={token} />} />
        <Route exact path="/user-home" element={<UserHome token={token} userData={apiData} />} />
        <Route exact path="/submit_survey_response/:id" element={<SubmitSurveyResponse token={token} userData={apiData} />} />
      </Routes>
    </Router>
  );
}

export default App;
