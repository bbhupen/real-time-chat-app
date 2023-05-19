import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.scss";
import CreateRoom from "./pages/CreateRoom";

//routes
function App() {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/" />
    }

    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />

        <Route path="/create-room" element={<ProtectedRoute>
          <CreateRoom />
        </ProtectedRoute>} />


        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
