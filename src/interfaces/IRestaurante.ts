import IPrato from './IPrato';

interface IRestaurante {
    id: number;
    nome: string;
    pratos: IPrato[];
}

export default IRestaurante;
