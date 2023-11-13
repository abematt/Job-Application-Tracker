'use client'

import { Providers } from './providers';
import JobList from './components/JobList'
import { Flex, Spacer } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ModalButton from './components/ModalAddButton'
import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'



export default function Home() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => { 
        
    fetch('/api/jobList')
    .then(response => response.json())
    .then(data => setJobs(data.data))
    .catch(error => console.log(error));
  }, []);


  const addJob = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
    // setJobs(jobs.concat(newJob));
  };
  
  return (
    <body>
      <Providers>
        <Flex justify="center" direction="column">
          <Flex justify="center">
            <Tabs>
              <TabList>
                <Tab>Job Tracker</Tab>
                <Tab>Statistics</Tab>
                <ModalButton addJob={addJob}/>
              </TabList>
            </Tabs>
          </Flex>
          <Flex justify="center">
            <JobList jobs={jobs}/>
          </Flex>
        </Flex>
      </Providers>
    </body>
  )
}
