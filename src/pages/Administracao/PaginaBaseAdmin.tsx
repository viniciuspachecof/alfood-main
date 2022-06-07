import {
    Box,
    Button,
    Typography,
    AppBar,
    Container,
    Toolbar,
    Link,
    Paper,
} from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">Administração</Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link
                                component={RouterLink}
                                to="/admin/restaurantes"
                            >
                                <Button sx={{ my: 2, color: 'white' }}>
                                    RESTAURANTES
                                </Button>
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/admin/restaurantes/novo"
                            >
                                <Button sx={{ my: 2, color: 'white' }}>
                                    NOVO RESTAURANTE
                                </Button>
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/admin/pratos"
                            >
                                <Button sx={{ my: 2, color: 'white' }}>
                                    PRATOS
                                </Button>
                            </Link>
                            <Link
                                component={RouterLink}
                                to="/admin/pratos/novo"
                            >
                                <Button sx={{ my: 2, color: 'white' }}>
                                    NOVO PRATO
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default PaginaBaseAdmin;
