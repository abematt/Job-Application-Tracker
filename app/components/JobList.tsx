'use client'

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
import React, { useEffect, useState } from 'react';

export default function JobList ({ jobs }) {
    // const [jobs,setJobs] = useState<any[]>([]);

    // useEffect(() => { 
        
    //     fetch('/api/jobList')
    //     .then(response => response.json())
    //     .then(data => setJobs(data.data))
    //     .catch(error => console.log(error));
    // }, []);

    useEffect(() => {
      console.log(jobs,"Update state in joblist component"); // Log the jobs prop
    }, [jobs]);

      return (
          <TableContainer maxWidth="50%" >
            <Table colorScheme="messenger" variant='simple' size="sm">
              <TableCaption >Job Application Tracking</TableCaption>
              <Thead>
                <Tr>
                  <Th>Company Name</Th>
                  <Th>Job Position</Th>
                  <Th isNumeric>Date Applied</Th>
                  <Th>Status</Th>
                  <Th>Response Date</Th>
                  <Th>Days Since</Th>
                  {/* <Th>Notes</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                
                {jobs.map((job:{
                  _id: string    
                  companyName: string
                  jobPosition: string
                  dateApplied: string
                  status: string
                  responseDate: string
                  daysSince: number
                  notes: string}) => (
                <Tr key={job._id}>
                    <Td>{job.companyName}</Td>
                    <Td>{job.jobPosition}</Td>
                    <Td isNumeric>{job.dateApplied}</Td>
                    <Td>{job.status}</Td>
                    <Td>{job.responseDate}</Td>
                    <Td>{job.daysSince}</Td>
                    {/* <Td>{job.notes}</Td> */}
                </Tr>

                ))}
              </Tbody>
            </Table>
          </TableContainer>
      );
  }
