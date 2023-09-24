import "./App.css";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/CreateNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" exact Component={LandingPage} />
        <Route path="/login" Component={LoginScreen} />
        <Route path="/register" Component={RegisterScreen} />
        <Route path="/mynotes" Component={() => <MyNotes search={search} />} />
        <Route path="/note/:id" Component={SingleNote} />
        <Route path="/createnote" Component={CreateNote} />
        <Route path="/profile" Component={ProfileScreen} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
