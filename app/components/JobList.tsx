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

export default function JobList () {
    const [jobs,setJobs] = useState<any[]>([]);

    useEffect(() => { 
        
        fetch('/api/jobs')
        .then(response => response.json())
        .then(data => setJobs(data))
        .catch(error => console.log(error));
    }, []);

      return (
          <TableContainer maxWidth="75%" >
            <Table colorScheme="messenger" variant='simple' size="lg">
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
                {jobs.map((job) => (
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
