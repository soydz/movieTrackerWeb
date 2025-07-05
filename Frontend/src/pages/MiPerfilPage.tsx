import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import type { User } from "../interfaces/user"
import type { SeeMovie } from "../interfaces/movie"

interface MiPerfilPageProps {
    user: User | null,
    seeMovies: Array<SeeMovie>
}

export const MiPerfilPage = ({ user, seeMovies }: MiPerfilPageProps) => {

    if (!user) return null
    return (
        <Flex align="center" justify="center" height="100%">

            <Card size="5">
                <Flex direction="column" gap="2">
                    <Heading align="center" mb="4">Mi perfil</Heading>
                    <Flex direction="row" gap="4">
                        <Text as="div" size="2" weight="bold">
                            Nombre de usuario :
                        </Text>
                        <Text as="div" size="2">
                            {user && user.username}
                        </Text>
                    </Flex>
                    <Flex direction="row" gap="4">
                        <Text as="div" size="2" weight="bold">
                            Películas vistas :
                        </Text>
                        <Text as="div" size="2">
                            {seeMovies.length}
                        </Text>
                    </Flex>
                </Flex>

            </Card>
        </Flex>

    )
}