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

import {DeleteIcon} from '@chakra-ui/icons';
import { IconButton } from "@chakra-ui/react";
import { Select } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react';

export default function JobList ({ jobs ,setJobs}) {

    // Update API call
    const handleUpdateStatus = async (id,status) => {

        const response = await fetch('/api/jobList', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id, status: status}),
        });

        if (!response.ok){
          throw new Error('Error updating Job');
        }

        const updatedJob = await response.json();
        setJobs(jobs.map(job => job._id === id ? { ...job, status: status } : job));
        // addJob(updatedJob.data);
    }

    // Delete API call
    const handleDelete = async (job) => {

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

    function formatDate(dateString) {
      const options = {month: 'long',day:'numeric'};
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }

    function getOptionBackground(value) {
      switch (value) {
        case 'Applied':
          return 'green.100';
        case 'Rejected':
          return 'red.100';
        case 'Callback':
          return 'blue.100';
        case 'R/A':
          return 'yellow.100';
        default:
          return 'white';
      }
    }

    useEffect(() => {
      console.log(jobs,"Update state in joblist component"); // Log the jobs prop
    }, [jobs]);

    const tableCustomStyle = {fontSize: "0.8em",td:{padding: "0.1em"}}
    const textBreakStyle = {whiteSpace:'normal',wordBreak:'break-word',textAlign:'center'}
    const customSelectStyle = {fontSize: "0.85em", padding: "0.25em"}

      return (
          <TableContainer maxWidth="50%" >
            <Table colorScheme="messenger" variant='simple' size="sm" sx={tableCustomStyle}>
              <TableCaption >Job Application Tracking</TableCaption>
              <Thead>
                <Tr>
                  <Th sx={textBreakStyle}>Company Name</Th>
                  <Th sx={textBreakStyle}>Job Position</Th>
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
                    <Td sx={textBreakStyle}>{job.companyName}</Td>
                    <Td sx={textBreakStyle}>{job.jobPosition}</Td>
                    <Td sx={textBreakStyle} >{formatDate(job.dateApplied)}</Td>
                    <Td sx={textBreakStyle}>
                      <Select 
                          value={job.status} 
                          sx={{...customSelectStyle,background:getOptionBackground(job.status)}}
                          onChange={(e)=>handleUpdateStatus(job._id,e.target.value)}
                      >
                        <option value='Applied' style={{color:"green.500"}}>Applied</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='Callback'>Callback</option>
                        <option value='R/A'>R/A</option>
                      </Select>
                    </Td>
                    {/* <Td>{job.status}</Td> */}
                    <Td sx={textBreakStyle}>{formatDate(job.responseDate)}</Td>
                    <Td sx={textBreakStyle}>{job.daysSince}</Td>
                    <Td>  <IconButton size="xs" variant="outline" aria-label="Delete" icon={<DeleteIcon/>} onClick = {()=> handleDelete(job)}/></Td>
                  
                    {/* <Td>{job.notes}</Td> */}
                </Tr>

                ))}
              </Tbody>
            </Table>
          </TableContainer>
      );
  }
