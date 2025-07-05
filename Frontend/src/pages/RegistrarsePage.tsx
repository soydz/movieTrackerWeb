import { Box, Flex, Spinner } from "@radix-ui/themes";
import { FormAuth } from "../components/FormAuth";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { Signup } from "../interfaces/auth";
import type { SetUser } from "../interfaces/user";
import { useState } from "react";

export const RegistrarsePage = ({ setUser }: SetUser) => {

    const navigate = useNavigate();

    const [fetchSignup, setFetchSignup] = useState<boolean>(false);

    const handleSubmit = async (signup: Signup) => {

        setFetchSignup(true)

        const credenciales = {
            username: signup.username,
            email: signup.email,
            password: signup.password,
            roleSet: ["USER"]
        }

        try {
            const response = await authService.signup(credenciales);
            const { status } = response


            if (status != 201) return

            const userData = await response.json()

            setFetchSignup(false)
            navigate("/");

            setUser(userData)

            if (userData.jwt) {
                window.localStorage.setItem('userData', JSON.stringify(userData))
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    return (
        <Flex direction="column" justify="center" align="center" style={{ height: "calc(100vh - 270px)" }}>
            {
                !fetchSignup
                    ? <FormAuth<Signup> type="signup" onSubmit={handleSubmit} />
                    : <Box style={{ transform: 'scale(2)' }}>
                        <Spinner size="3" loading={true} />
                    </Box>
            }
        </Flex>
    )
}