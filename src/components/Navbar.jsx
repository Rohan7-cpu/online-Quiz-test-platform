import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { loadFromLocalStorage } from "../utils/localStorage";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [quizPlayer, setQuizPlayer] = useState(null);

  //  always sync player name
useEffect(() => {
  if (location.pathname !== "/play") {
    setQuizPlayer(null);
    return;
  }
  //keep checking the name in regular interval
  const interval = setInterval(() => {
    const name = sessionStorage.getItem("quiz_player");
    setQuizPlayer(name);
  }, 300);

  return () => clearInterval(interval);
}, [location.pathname]);


  //  KEEP THIS LOGIC (ADMIN LOGIN)
  const handleCreateClick = () => {
    const isLoggedIn = loadFromLocalStorage("is_logged_in");
     navigate(isLoggedIn === "true" ? "/create" : "/login");
 
  };

  // ✅ PLAYER LOGOUT ONLY
  const handleLogout = () => {
    sessionStorage.removeItem("quiz_player");
    setQuizPlayer(null);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" component="span" sx={{ mr: 2 }}>
            QUIZZY
          </Typography>

          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>

          <Button color="inherit" onClick={handleCreateClick}>
            Create Quiz
          </Button>

          <Button color="inherit" component={NavLink} to="/my-quizzes">
            My Quizzes
          </Button>

          <Button color="inherit" component={NavLink} to="/play">
            Play Quiz
          </Button>
        </Box>

        <Box>
          {quizPlayer && (
            <>
              <Typography component="span" sx={{ mr: 2 }}>
                Hello, {quizPlayer}
              </Typography>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
