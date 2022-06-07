import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITag from '../../../interfaces/ITag';

const FormularioPrato = () => {
    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');

    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);

    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const [imagem, setImagem] = useState<File | null>(null);

    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`).then((resposta) => {
                setNomePrato(resposta.data.nome);
                setDescricaoPrato(resposta.data.descricao);
                setTag(resposta.data.tag);
                setRestaurante(resposta.data.restaurante.toString());
            });
        }

        http.get<{ tags: ITag[] }>('tags/').then((resposta) =>
            setTags(resposta.data.tags)
        );
        http.get<IRestaurante[]>('restaurantes/').then((resposta) =>
            setRestaurantes(resposta.data)
        );
    }, [parametros]);

    const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
        } else {
            setImagem(null);
        }
    };

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato);
        formData.append('descricao', descricaoPrato);

        formData.append('tag', tag);

        formData.append('restaurante', restaurante);

        if (imagem) {
            formData.append('imagem', imagem);
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        })
            .then(() => alert('Prato cadastrado com sucesso!'))
            .catch((erro) => console.log(erro));
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
                                Formulário de Pratos
                            </Typography>
                            <Box
                                component="form"
                                sx={{ width: '100%' }}
                                onSubmit={aoSubmeterForm}
                            >
                                <TextField
                                    label="Nome do prato"
                                    variant="standard"
                                    value={nomePrato}
                                    onChange={(event) =>
                                        setNomePrato(event.target.value)
                                    }
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                                <TextField
                                    label="Descrição do prato"
                                    variant="standard"
                                    value={descricaoPrato}
                                    onChange={(event) =>
                                        setDescricaoPrato(event.target.value)
                                    }
                                    margin="dense"
                                    fullWidth
                                    required
                                />
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-tag">Tag</InputLabel>
                                    <Select
                                        labelId="select-tag"
                                        value={tag}
                                        onChange={(event) =>
                                            setTag(event.target.value)
                                        }
                                    >
                                        {tags.map((tag) => (
                                            <MenuItem
                                                key={tag.id}
                                                value={tag.value}
                                            >
                                                {tag.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-restaurante">
                                        Restaurante
                                    </InputLabel>
                                    <Select
                                        labelId="select-restaurante"
                                        value={restaurante}
                                        onChange={(event) =>
                                            setRestaurante(event.target.value)
                                        }
                                    >
                                        {restaurantes.map((restaurante) => (
                                            <MenuItem
                                                key={restaurante.id}
                                                value={restaurante.id}
                                            >
                                                {restaurante.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <input
                                    type="file"
                                    onChange={(event) =>
                                        selecionarArquivo(event)
                                    }
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

export default FormularioPrato;
