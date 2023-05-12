import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Search from "./Pages/Search";
import CreatePost from "./Pages/CreatePost";
import AllPost from "./Pages/AllPost";
import Profile from "./Pages/Profile";
import Main from "./Pages/Main";
import NavBar from "./Components/NavBar/NavBar";
import User from "./Pages/User";
import Followers from "./Pages/Followers";
import Following from "./Pages/Following";
import SinglePost from "./Pages/SinglePost";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          ></Route>
          <Route exact path="/Auth" element={<Auth />} />
          <Route
            exact
            path="/Search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/CreatePost"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route exact path="/AllPost" element={<AllPost />} />
          <Route
            exact
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route exact path="/User/:userid" element={<User />} />
          <Route exact path="/Followers/:userid" element={<Followers />} />
          <Route exact path="/Following/:userid" element={<Following />} />
          <Route exact path="/Post/:postId" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
