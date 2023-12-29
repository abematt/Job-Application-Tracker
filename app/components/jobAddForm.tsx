import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import { Flex} from '@chakra-ui/react'
import { Box } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddJob({ addJob }: { addJob: (job: any) => void }) { 
    const [companyName, setCompanyName] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [dateApplied, setDateApplied] = useState(new Date());
           
    const handleSubmit = async () => {
        if (!companyName || !jobPosition || !dateApplied) {
            alert('All fields are required');
            return;
          }
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
        <Stack mt="2rem" spacing="1rem">
        <h1>Enter Job Details</h1>
        <HStack>
            <Input placeholder='Company' value={companyName} onChange={(e) => setCompanyName(e.target.value)}/>
            <Input placeholder='Position' value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}/>
            <Box w="100%">
                <DatePicker 
                    selected={dateApplied} 
                    onChange={(date: Date) => setDateApplied(date)}
                    customInput={<Input placeholder="Company"/>}
                    maxDate={new Date()}
                />
            </Box>
            {/* <Box>
                <DatePicker selected={dateApplied} onChange={(date: Date) => setDateApplied(dateApplied)} />
            </Box> */}
            {/* <Input placeholder='Date Applied' value={dateApplied} onChange={(e) => setDateApplied(e.target.value)}/> */}
        </HStack>
        <Flex justify='center'>
            <Button onClick={handleSubmit} w="25%" >Add Job</Button>
        </Flex>
        </Stack>

        
    )
}