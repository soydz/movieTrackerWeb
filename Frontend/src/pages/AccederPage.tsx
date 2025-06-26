import { Flex } from "@radix-ui/themes";
import { FormAuth } from "../components/FormAuth";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { Login } from "../interfaces/auth";

export const AccederPage = ({ setUser }) => {

    const navigate = useNavigate();

    const handleSubmit = async (login: Login) => {
        const credenciales = {
            username: login.username,
            password: login.password
        }

        try {
            const response = await authService.login(credenciales);
            const userData = await response.json();

            setUser({
                id: userData.id,
                username: userData.username,
            })

            if (userData.jwt) {
                window.localStorage.setItem('userData', JSON.stringify(userData))
            }

            navigate("/buscar");

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    return (
        <Flex direction="column" justify="center" align="center" style={{ height: "calc(100vh - 270px)" }}>
            <FormAuth type="login" onSubmit={handleSubmit} />
        </Flex>
    )
}