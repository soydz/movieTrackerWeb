import { Container, Flex, Link, Separator, Text } from "@radix-ui/themes";

export const Footer = () => {
    return (
        <Container pb="8">
            <Separator size="4" my="8" />
            <Flex direction="column" align="center">
                <Text>&copy; {new Date().getFullYear()} MovieTracker</Text>
                <Text>Todos los derechos reservados</Text>
                <Text>
                    <Link href="https://www.SoyDZ.com" target="_black" style={{ color: "var(--accent-9)" }}>
                        SoyDZ.com
                    </Link>
                </Text>
            </Flex>
        </Container>
    )
}