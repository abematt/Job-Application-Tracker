import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import { Flex, Spacer } from '@chakra-ui/react'

export default function AddJob({addJob}) { 
    const [companyName, setCompanyName] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [dateApplied, setDateApplied] = useState('');
           
    const handleSubmit = async () => {
        const body = { companyName, jobPosition, dateApplied };

        const response = await fetch('/api/jobList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (response.ok){
            const newJob = await response.json();
            console.log("Successfully Added")
            addJob(newJob.data);
        }
    };
    return (
        <Stack mt="10%" spacing="24px">
        <HStack>
            <Input placeholder='Company' value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
            <Input placeholder='Position' value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}/>
            <Input placeholder='Date Applied' value={dateApplied} onChange={(e) => setDateApplied(e.target.value)}/>
        </HStack>
        <Flex justify='center'>
            <Button colorScheme='blue' onClick={handleSubmit} w="25%" >Add Job</Button>
        </Flex>
        </Stack>

        
    )
}