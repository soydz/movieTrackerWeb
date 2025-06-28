import { Flex } from "@radix-ui/themes";
import { FormAuth } from "../components/FormAuth";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import type { Signup } from "../interfaces/auth";
import type { SetUser } from "../interfaces/user";

export const RegistrarsePage = ({ setUser }: SetUser) => {

    const navigate = useNavigate();

    const handleSubmit = async (signup: Signup) => {

        const credenciales = {
            username: signup.username,
            email: signup.email,
            password: signup.password,
            roleSet: ["USER"]
        }

        try {
            const response = await authService.signup(credenciales);
            const userData = await response.json()

            setUser(userData)

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
            <FormAuth<Signup> type="signup" onSubmit={handleSubmit} />
        </Flex>
    )
}