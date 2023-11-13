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
import {DeleteIcon} from '@chakra-ui/icons';
import { IconButton } from "@chakra-ui/react";

export default function JobList ({ jobs ,setJobs}) {

    const handleSubmit = async (job) => {

        const response = await fetch('/api/jobList', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: job._id}),
        });

        if (!response.ok){
            throw new Error('Error deleting Job');
        }

        const idToDelete = job._id;
        const updatedJobs = jobs.filter((job) => job._id !== idToDelete);
        setJobs(updatedJobs);

    };

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
                    <IconButton size="xs" variant="outline" aria-label="Delete" icon={<DeleteIcon/>} onClick = {()=> handleSubmit(job)}/>
                    {/* <Td>{job.notes}</Td> */}
                </Tr>

                ))}
              </Tbody>
            </Table>
          </TableContainer>
      );
  }
