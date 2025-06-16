import { Container, Flex, Link, Separator, Text } from "@radix-ui/themes";

export function Footer() {
    return (
        <Container pb="8">
            <Separator size="4" my="8" />
            <Flex direction="column" align="center">
                <Text>&copy; 2025 MovieTracker</Text>
                <Text>Todos los derechos reservados</Text>
                <Text>
                    <Link href="https://www.SoyDZ.com" target="_black">
                        SoyDZ.com
                    </Link>
                </Text>
            </Flex>
        </Container>
    )
}