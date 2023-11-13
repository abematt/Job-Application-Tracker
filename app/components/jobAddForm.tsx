import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

export default function AddJob() { 
    return (
        <HStack>
            <Input placeholder='Company'/>
            <Input placeholder='Position'/>
            <Input placeholder='Date Applied'/>
        </HStack>
    )
}