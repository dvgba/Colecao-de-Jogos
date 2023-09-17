import React, { useState, useEffect } from "react";
import axios from "axios";
import GameForm from "./components/GameForm";
import GameTable from "./components/GameTable";
import {CssBaseline, Container, Typography, AppBar, Toolbar } from "@mui/material";
import API_URL from "./config";

const appBarStyle = {
  marginBottom: "20px"
};

const pageTitleStyle = {
  fontsize: "2rem",
  fontWeight: "bold",
  marginBottom: "20px"
};

function App() {
  const [games, setGames] =useState([]);
  const[showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []); 

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/games`);
      setGames(response.data);
    } catch (error) {
      console.log("Erro ao buscar jogos:", error);
    }
  };

  const handleAddGame = async (newGame) => {
    try {
      await axios.post(`${API_URL}/games`, newGame);
      fetchGames();
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao adicionar o jogo:", error);
    }
  };

  const handleDeleteGame = async (gameID) => {
    try {
      await axios.delete(`${API_URL}/games/${gameID}`);
      fetchGames();
    } catch (error) {
      console.error("Erro ao excluir o jogo:", error)
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position = "static" style = {appBarStyle}>
        <Toolbar>
          <Typography variant = "h6">Coleção de Jogos</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth = "lg">
          <Typography variant = "h4"  align = "center" style = {pageTitleStyle}>
            Coleção de Jogos
          </Typography>
          {showForm ? (
            <GameForm handleAddGame = {handleAddGame} setShowForm = {setShowForm} />
          ) : (
            <GameTable
              games = {games}
              handleDeleteGame = {handleDeleteGame}
              setShowForm = {setShowForm}
            />
          )}
        </Container>
    </div>
  );
}

export default App;
