import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Flex, Section, TextField } from "@radix-ui/themes";
import type { ChangeEvent } from "react";

interface SearchProps {
    nameMovie: string,
    setNameMovie: React.Dispatch<React.SetStateAction<string>>
}

export const Search = ({ nameMovie, setNameMovie }: SearchProps) => {

    const handlenChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setNameMovie(target.value)
    }

    return (
        <Section>
            <Flex direction={'column'} align={'center'} minWidth="300px">
                <Box width="650px" >
                    <TextField.Root
                        placeholder="El club de la pelea"
                        size={'3'} radius="large"
                        style={{ width: '100%' }}
                        value={nameMovie}
                        onChange={(e) => {
                            handlenChange(e);
                        }
                        }
                    >
                        <TextField.Slot >
                            <MagnifyingGlassIcon width={'24'} height={'24'} />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>
            </Flex>
            {
                nameMovie && nameMovie.length < 3 &&
                <Flex justify="center">
                    <p>Debes ingresar mas de tres letras</p>
                </Flex>
            }
        </Section>

    )
}
