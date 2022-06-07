import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then((resposta) => setNomeRestaurante(resposta.data.nome))
                .catch();
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante,
            })
                .then(() => alert('Restaurante cadastrado com sucesso'))
                .catch(() => console.log('erro'));
        } else {
            http.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante,
            })
                .then(() => alert('Restaurante cadastrado com sucesso'))
                .catch(() => console.log('erro'));
        }
    };

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h6">
                                Formulário de Restaurantes
                            </Typography>
                            <Box
                                component="form"
                                sx={{ width: '100%' }}
                                onSubmit={aoSubmeterForm}
                            >
                                <TextField
                                    label="Nome do restaurante"
                                    variant="standard"
                                    value={nomeRestaurante}
                                    onChange={(event) =>
                                        setNomeRestaurante(event.target.value)
                                    }
                                    fullWidth
                                    required
                                />
                                <Button
                                    sx={{ marginTop: 1 }}
                                    fullWidth
                                    type="submit"
                                    variant="outlined"
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default FormularioRestaurante;
