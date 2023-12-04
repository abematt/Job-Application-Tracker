'use client'

import { Flex, } from '@chakra-ui/react'
import { Tabs, TabList, Tab} from '@chakra-ui/react'

import { Providers } from './providers';
import { useEffect, useState } from 'react';

import JobList from './components/JobList'
import ModalButton from './components/ModalAddButton'

export default function Home() {
  interface Job {
    _id: string;
    companyName: string;
    jobPosition: string;
    dateApplied: string;
    status: string;
    responseDate: string;
    daysSince: number;
    notes: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => { 
        
    fetch('/api/jobList')
    .then(response => response.json())
    .then(data => setJobs(data.data))
    .catch(error => console.log(error));
  }, []);


  const addJob = (newJob: Job) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };

  // Test change
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
            <JobList jobs={jobs} setJobs={setJobs}/>
          </Flex>
        </Flex>
      </Providers>
    </body>
  )
}
