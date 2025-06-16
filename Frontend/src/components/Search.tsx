import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Flex, Section, TextField } from "@radix-ui/themes";

export function Search() {
    return (
        <Section>
            <Flex direction={'column'} align={'center'}>
                <Box maxWidth={'50%'} width={'100%'}>
                    <TextField.Root placeholder="El club de la pelea" size={'3'} radius="large" style={{ width:'100%' }} >
                        <TextField.Slot >
                            <MagnifyingGlassIcon width={'24'} height={'24'}/>
                        </TextField.Slot>
                    </TextField.Root>
                </Box>
            </Flex>
        </Section>
        
    )
}