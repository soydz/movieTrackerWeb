import { Box, Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { DataUser } from "../interfaces/user";
import { Alert } from "./Alert";

interface FormAuthProps<T> {
    type: "login" | "signup",
    onSubmit: (data: T) => void | Promise<void>
}

export const FormAuth = <T,>({ type, onSubmit }: FormAuthProps<T>) => {
    const isLogin = type == "login"

    const [dataUser, setDataUser] = useState<DataUser>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [stateAlert, setStateAlert] = useState({
        status: false,
        title: "",
        description: ""
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const target = e.target;

        if (target.name == "username") {
            setDataUser({
                ...dataUser,
                username: target.value
            })

        } else if (target.name == "email") {
            setDataUser({
                ...dataUser,
                email: target.value
            })

        } else if (target.name == "password") {
            setDataUser({
                ...dataUser,
                password: target.value
            })
        } else if (target.name == "confirmPassword") {
            setDataUser({
                ...dataUser,
                confirmPassword: target.value
            })
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isLogin) {
            if (dataUser.password !== dataUser.confirmPassword) {
                return setStateAlert({
                    status: true,
                    title: "Contraseñas no coinciden",
                    description: "Asegúrate de que ambas contraseñas sean iguales."
                })
            }
        }

        onSubmit(dataUser as unknown as T);

        setDataUser({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    }

    return (
        <Box width="450px" >
            <Card size="5">
                <form onSubmit={(e) => {
                    handleSubmit(e)
                }}>
                    <Flex direction="column" gap="5">
                        <Heading>
                            {isLogin ? "Acceder" : "Registrarse"}
                        </Heading>

                        <Box>
                            <Text>Nombre de usuario</Text>
                            <TextField.Root name="username" placeholder="miuser" value={dataUser.username} onChange={(e) => {
                                handleChange(e);
                            }} required />
                        </Box>

                        {!isLogin &&
                            <Box>
                                <Text>Correo</Text>
                                <TextField.Root name="email" placeholder="micorreo@gmail.com" type="email" value={dataUser.email} onChange={(e) => {
                                    handleChange(e);
                                }} required />
                            </Box>
                        }

                        <Box>
                            <Text>Contraseña</Text>
                            <TextField.Root name="password" placeholder="miContraseña" type="password" minLength={6} value={dataUser.password} onChange={(e) => {
                                handleChange(e);
                            }} required />
                        </Box>
                        <Box>
                            {isLogin ?
                                <Link to="/"
                                    style={{
                                        color: "var(--accent-9)",
                                        cursor: "pointer",
                                        textDecoration: "none"
                                    }}
                                >Has olvidado tu contraseña?</Link>
                                :
                                <Box>
                                    <Text>Confirmar contraseña</Text>
                                    <TextField.Root name="confirmPassword" placeholder="miContraseña" type="password" value={dataUser.confirmPassword} onChange={(e) => {
                                        handleChange(e);
                                    }} required />
                                </Box>
                            }

                        </Box>
                        <Box>
                            <Flex justify="end">
                                <Button type="submit">
                                    {isLogin ? "Acceder" : "Registrarse"}
                                </Button>
                            </Flex>
                        </Box>
                    </Flex>
                </form>
            </Card>

            {
                <Alert status={stateAlert.status} title={stateAlert.title} description={stateAlert.description} setStateAlert={setStateAlert} />
            }
        </Box>
    )
}