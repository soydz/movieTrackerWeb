import { ExitIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Flex, TabNav, Text } from "@radix-ui/themes";

export function NavAutenticacion() {
    return (
        <TabNav.Root justify="end" color="violet">
            <TabNav.Link href="#">
                Acceder
            </TabNav.Link>
            <TabNav.Link href="#">
                Crear una cuenta
            </TabNav.Link>
            <TabNav.Link>
                <Avatar radius="large" fallback="DZ" />
            </TabNav.Link>
            <Box mr="9">
                <TabNav.Link>
                    <Flex gap="1">
                        <ExitIcon color="tomato" width={'20'} height={'20'} />
                        <Text>Cerrar Sesión</Text>
                    </Flex>
                </TabNav.Link>
            </Box>

        </TabNav.Root>
    )
}