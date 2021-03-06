import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Container, ErrorMessage, StyledLink } from "./style";

import UserContext from '../../contexts/UserContext';
import Logo from '../../components/Logo';
import Button from '../../components/generic/Button';
import Input from '../../components/generic/Input';
import api from "../../service/api";

import loading from "../../assets/img/loading.svg"

export default function SignUpPage() {
    const { isLoading, setLoading } = useContext(UserContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    async function handleSignUp(event) {
        event.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword && formData.confirmPassword !== '') {
            setErrorMessage('As senha não coincidem!');
            setError(true);
            setLoading(false);
            return;
        }

        try {
            await api.signUp({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })

            setLoading(false);
            navigate('/');

        } catch (error) {
            setLoading(false);

            setError(true);
            setErrorMessage(error.response.data)
        };
    }

    function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    return (
        <Container>
            <Logo />
            <form onSubmit={handleSignUp}>
                <Input
                    isLoading={isLoading}
                    disabled={isLoading}
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    placeholder="Nome"
                    required
                />
                <Input
                    isLoading={isLoading}
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                />
                <Input
                    isLoading={isLoading}
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    placeholder="Senha"
                    required
                />
                <Input
                    isLoading={isLoading}
                    disabled={isLoading}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme a senha"
                    required
                />
                {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Button isLoading={isLoading} disabled={isLoading} type="submit">
                    {isLoading ? <img src={loading} alt="" /> : "Cadastrar"}
                </Button>
            </form>
            <StyledLink to="/">
                <span>Já tem uma conta?</span>
                <u>Entre agora!</u>
            </StyledLink>
        </Container >
    );
}