import { EyeOpenIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";
import { Box, Container, Flex, Tabs, Text } from "@radix-ui/themes";
import { MovieIcon } from "./icons/MovieIcon";
import { Link } from "react-router-dom";
import type { User } from "../interfaces/user";

interface NavProps {
    user: User | null
}

export const Nav = ({ user }: NavProps) => {

    const logueado = !!user

    return (
        <Container style={{ borderRight: "1px solid gray" }} height="100vh">
            <Tabs.Root>
                <Tabs.List>
                    <Flex direction="column" gap="4" py="5">
                        <Tabs.Trigger value="MovieTracker">
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
                                <Flex align="center" gap="1" p="2">
                                    <MovieIcon width={'30'} height={'30'} color="var(--accent-9)" />
                                    <Text size={'6'} style={{ color: "var(--accent-9)" }}>MovieTracker</Text>
                                </Flex>
                            </Link>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="Buscar peliculas">
                            <Link to="/buscar" style={{ textDecoration: "none", color: "inherit" }} >
                                <Flex align="center" gap="1" p="2">
                                    <MagnifyingGlassIcon width={'20'} height={'20'} />
                                    <Text size={'3'}> Buscar películas</Text>
                                </Flex>
                            </Link>
                        </Tabs.Trigger>
                        {logueado && user.username &&
                            <>
                                <Tabs.Trigger value="Peliculas vistas" >
                                    <Link to={`user/${user?.username ?? ""}/vistas`} style={{ textDecoration: "none", color: "inherit" }} >
                                        <Box >
                                            <Flex align="center" gap="1" p="2" width="100%">
                                                <EyeOpenIcon width={'20'} height={'20'} />
                                                <Text size={'3'}>Películas Vistas</Text>
                                            </Flex>
                                        </Box>
                                    </Link>
                                </Tabs.Trigger>

                                <Tabs.Trigger value="Mi perfil">
                                    <Link to={`/user/${user?.username ?? ""}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <Flex align="center" gap="1" p="2">
                                            <PersonIcon width={'20'} height={'20'} />
                                            <Text size={'3'}>Mi perfil</Text>
                                        </Flex>
                                    </Link>
                                </Tabs.Trigger>
                            </>
                        }
                    </Flex>
                </Tabs.List>
            </Tabs.Root>
        </Container >
    )
}
