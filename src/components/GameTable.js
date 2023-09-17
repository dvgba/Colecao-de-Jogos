import React, { useState } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const tableStyle = {
    minWidth: 650,
    margin: "auto",
    marginTop: "20px"
};

const headerCellStyle = {
    backgroundColor: "f5f5f5",
    fontWeight: "bold"
};

function GameTable ( {games, handleDeleteGame, setShowForm }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [gameToDelete, setGameToDelete] = useState(null);

    const handleConfirmDelete = () => {
        if (gameToDelete) {
            handleDeleteGame(gameToDelete.id);
            setGameToDelete(null);
        }
        setOpenDialog(false);
    };

    const handleOpenDialog = (game) => {
        setGameToDelete(game);
        setOpenDialog(true);
    }

    return(
        <div>
            <Box display = "flex" justifyContent = "space-between" alignItems = "center">
                <Typography variant = "h6">Lista de Jogos</Typography>
                <Button
                    variant = "contained"
                    color = "primary"
                    startIcon = {<AddCircleOutlineIcon />}
                    onClick = {() => setShowForm(true)}
                >
                    Adicionar Jogo
                </Button>
            </Box>

            <TableContainer component = {Paper} style = {tableStyle}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style = {headerCellStyle} align = "center">
                                Título
                            </TableCell>
                            <TableCell style = {headerCellStyle} align = "center">
                                Plataforma
                            </TableCell>
                            <TableCell style = {headerCellStyle} align = "center">
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {games.lenght === 0 ? (
                            <TableRow>
                                <TableCell colSpan = {3} align = "center">
                                    <Typography variant = "subtitle1">
                                        Não há jogos disponiveis
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            games.map((game) => (
                                <TableRow key = {game.id}>
                                    <TableCell align = "center">{game.title}</TableCell>
                                    <TableCell align = "center">{game.plataform}</TableCell>
                                    <TableCell align = "center">
                                        <Button
                                            variant = "outlined"
                                            color = "error"
                                            startIcon = {<DeleteIcon />}
                                            onClick = {() => handleOpenDialog(game)}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open = {openDialog} onClose ={() => setOpenDialog(false)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>  
                <DialogContent>
                    Tem certeza de que deseja excluir o jogo? "{gameToDelete?.title}"?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick = {handleConfirmDelete}
                        color = "error"
                    >
                        Confirmar
                    </Button>
                </DialogActions>              
            </Dialog>
        </div>
    );
};



export default GameTable;
