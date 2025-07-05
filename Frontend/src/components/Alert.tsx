import { AlertDialog, Button, Flex } from "@radix-ui/themes"

interface AlertPromps {
    status: boolean,
    title: string,
    description: string,
    setStateAlert: React.Dispatch<React.SetStateAction<{
        status: boolean;
        title: string;
        description: string;
    }>>
}

export const Alert = ({ status, title, description, setStateAlert }: AlertPromps) => {
    return (
        <AlertDialog.Root open={status}>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{title}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    {description}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray" onClick={() => {
                            setStateAlert(prev => ({
                                ...prev,
                                status: false
                            }))
                        }}>
                            Cerrar
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}