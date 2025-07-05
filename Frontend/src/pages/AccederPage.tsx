import { Box, Flex, Spinner } from "@radix-ui/themes";
import { FormAuth } from "../components/FormAuth";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { Login } from "../interfaces/auth";
import type { SetUser } from "../interfaces/user";
import { useState } from "react";
import { Alert } from "../components/Alert";

export const AccederPage = ({ setUser }: SetUser) => {

    const navigate = useNavigate();

    const [fetchLogin, setFetchLogin] = useState<boolean>(false);
    const [stateAlert, setStateAlert] = useState({
        status: false,
        title: "",
        description: ""
    })

    const handleSubmit = async (login: Login) => {

        setFetchLogin(true);

        const credenciales = {
            username: login.username,
            password: login.password
        }

        try {
            const response = await authService.login(credenciales);
            const { status } = response;

            if (status == 404 || status == 403) {
                setFetchLogin(false)
                return setStateAlert({
                    status: true,
                    title: "Error en credenciales",
                    description: "Usuario o contraseña inválidos. Intenta nuevamente."
                })
            }

            // status == 200
            const userData = await response.json();

            setFetchLogin(false)
            navigate("/");

            setUser({
                id: userData.id,
                username: userData.username,
            })

            if (userData.jwt) {
                window.localStorage.setItem('userData', JSON.stringify(userData))
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                setStateAlert({
                    status: true,
                    title: "Error de servidor",
                    description: `${error.message} Inténtelo más tarde`
                })
                setFetchLogin(false)
            }
        }
    }

    return (
        <>
            <Flex direction="column" justify="center" align="center" style={{ height: "calc(100vh - 270px)" }}>
                {
                    !fetchLogin
                        ? <FormAuth<Login> type="login" onSubmit={handleSubmit} />
                        : <Box style={{ transform: 'scale(2)' }}>
                            <Spinner size="3" loading={true} />
                        </Box>
                }
            </Flex>

            {
                <Alert status={stateAlert.status} title={stateAlert.title} description={stateAlert.description} setStateAlert={setStateAlert} />
            }
        </>

    )
}