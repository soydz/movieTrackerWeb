import { EyeOpenIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";
import { Container, Flex, TabNav, Text } from "@radix-ui/themes";
import { MovieIcon } from "./MovieIcon";


export function Nav() {
    return(
        <Container style={{ backgroundColor: '#1f2937', }} height="100vh">
            <TabNav.Root color="violet">
                <Flex direction="column" gap="4" py="5">
                    <TabNav.Link>
                        <Flex align="center" gap="1" p="2">
                            <MovieIcon width={'30'} height={'30'} color="#7D66D9"/>
                            <Text size={'6'} color="violet">MovieTracker</Text>
                        </Flex>
                    </TabNav.Link>
                    <TabNav.Link active>
                        <Flex align="center" gap="1" p="2">
                            <MagnifyingGlassIcon width={'20'} height={'20'}/>
                            <Text size={'3'}> Buscar Películas</Text>
                        </Flex>
                        
                    </TabNav.Link>
                    <TabNav.Link>
                        <Flex align="center" gap="1" p="2">
                            <EyeOpenIcon width={'20'} height={'20'}/>
                            <Text size={'3'}> Películas Vistas</Text>
                        </Flex>
                    </TabNav.Link>
                    <TabNav.Link>
                        <Flex align="center" gap="1" p="2">
                            <PersonIcon width={'20'} height={'20'}/>
                            <Text size={'3'}> Mi perfil</Text>
                        </Flex>
                    </TabNav.Link>
                </Flex>
            </TabNav.Root> 
        </Container>
    )
}