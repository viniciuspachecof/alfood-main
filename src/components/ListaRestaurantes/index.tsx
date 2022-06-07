import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IOpcoesParams {
    ordering?: string;
    search?: string;
}

const ListaRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [nextPage, setNextPage] = useState('');
    const [busca, setBusca] = useState('');
    const [ordenador, setOrdenador] = useState('');
    const [previousPage, setPreviousPage] = useState('');

    useEffect(() => {
        carregarDados('http://localhost:8000/api/v1/restaurantes/', {});
    }, []);

    function carregarDados(url: string, opcoes: AxiosRequestConfig = {}) {
        axios
            .get<IPaginacao<IRestaurante>>(url, opcoes)
            .then((resposta) => {
                setRestaurantes(resposta.data.results);

                setPreviousPage(resposta.data.previous);
                setNextPage(resposta.data.next);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    function formBuscar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const opcoes = {
            params: {} as IOpcoesParams,
        };
        if (busca) {
            opcoes.params.search = busca;
        }

        if (ordenador) {
            opcoes.params.ordering = ordenador;
        }

        carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes);
    }

    function navegarPagina() {
        axios
            .get<IPaginacao<IRestaurante>>(nextPage || previousPage)
            .then((resposta) => {
                setRestaurantes([...resposta.data.results]);

                setPreviousPage(resposta.data.previous);
                setNextPage(resposta.data.next);
            })
            .catch((erro) => {
                console.log(erro);
            });
    }

    return (
        <section className={style.ListaRestaurantes}>
            <h1>
                Os restaurantes mais <em>bacanas</em>!
            </h1>
            <form onSubmit={(event) => formBuscar(event)}>
                <div>
                    <TextField
                        type="text"
                        placeholder="Pesquisar restaurantes"
                        variant="outlined"
                        onChange={(event) => setBusca(event.target.value)}
                    />
                    <FormControl sx={{paddingLeft: '10px'}}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Ordenar
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={ordenador}
                            onChange={(event) =>
                                setOrdenador(event.target.value)
                            }
                        >
                            <FormControlLabel
                                value="id"
                                control={<Radio />}
                                label="Código"
                            />
                            <FormControlLabel
                                value="nome"
                                control={<Radio />}
                                label="Nome restaurante"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <Button variant="outlined" type="submit">
                    Filtrar
                </Button>
            </form>

            {restaurantes?.map((item) => (
                <Restaurante restaurante={item} key={item.id} />
            ))}
            <button onClick={navegarPagina}>
                {previousPage ? 'Página anterior' : 'Próxima página'}
            </button>
        </section>
    );
};

export default ListaRestaurantes;
