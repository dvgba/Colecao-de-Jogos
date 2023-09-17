import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material"

const formStyle = {
    padding: "16px",
    maxWidth: "400px",
    margin: "auto"
};

const buttonStyle = {
    marginRight: "8px"
};

function GameForm({ handleAddGame, setShowForm }) {
    const [newGame, setNewGame] = useState({ title: "", plataform: ""});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGame({ ...newGame, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddGame(newGame);
        setNewGame({ title: "", plataform: ""});
    };

    return (
        <Paper elevation={3} style={formStyle}>
            <Typography variant="h6" gutterBottom>Adicionar Jogo</Typography>
            <form onSubmit = {handleSubmit}>
                <Grid container spacing = {2}>
                    <Grid item xs = {12}>
                        <TextField
                            fullWidth
                            label = "Titulo"
                            name = "title"
                            value = {newGame.title}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                    <Grid item xs = {12}>
                    <TextField
                            fullWidth
                            label = "Plataforma"
                            name = "plataform"
                            value = {newGame.plataform}
                            onChange = {handleInputChange}
                        />
                    </Grid>
                </Grid>
                <div style = {{ marginTop: "16px" }}>
                    <Button
                        variant = "contained"
                        color = "primary"
                        type = "submit"
                        style = {buttonStyle}
                    >
                        Adicionar
                    </Button>
                    <Button onClick = {() => setShowForm(false)} style = {buttonStyle}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default GameForm