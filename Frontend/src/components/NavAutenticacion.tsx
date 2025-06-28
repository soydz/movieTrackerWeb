import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Flex, TabNav, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import type { User } from "../interfaces/user";

interface NavAutenticacionProps {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    isDarkMode: boolean,
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavAutenticacion = ({ user, setUser, isDarkMode, setIsDarkMode }: NavAutenticacionProps) => {

    const logueado = user == null ? false : true;
    const getInicial = user ? user.username[0] : "";

    const handleClick = (e: string) => {
        if (e == "exit") {
            setUser(null);
            window.localStorage.removeItem("userData")
            return
        }
        if (e == "darkMode") {
            setIsDarkMode(!isDarkMode);
        }
    }
    return (
        <TabNav.Root>
            <Flex width="100%" justify="between" px="5">
                <Box>
                    <TabNav.Link>
                        {
                            isDarkMode
                                ? <MoonIcon width="24" height="24" onClick={() => handleClick("darkMode")} />
                                : <SunIcon width="24" height="24" onClick={() => handleClick("darkMode")} />
                        }
                    </TabNav.Link>
                </Box>
                <Flex direction="row">
                    {!logueado &&
                        <>
                            <TabNav.Link asChild>
                                <Link to="/auth/acceder">
                                    Acceder
                                </Link>
                            </TabNav.Link>
                            <TabNav.Link asChild>
                                <Link to="/auth/registro">
                                    Registrarse
                                </Link>
                            </TabNav.Link>
                        </>
                    }
                    {
                        logueado &&
                        <>
                            <TabNav.Link asChild>
                                <Link to={`/user/${user ? user.username : ""}`}>
                                    <Avatar radius="large" fallback={getInicial} />
                                </Link>
                            </TabNav.Link>
                            <Box>
                                <TabNav.Link asChild onClick={() => handleClick("exit")}>
                                    <Link to="/">
                                        <Flex gap="1">
                                            <ExitIcon color="tomato" width={'20'} height={'20'} />
                                            <Text >Cerrar Sesión</Text>
                                        </Flex>
                                    </Link>
                                </TabNav.Link>
                            </Box>
                        </>
                    }
                </Flex>
            </Flex>
        </TabNav.Root>
    )
}