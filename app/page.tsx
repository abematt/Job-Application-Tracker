"use client";

import { Flex } from "@chakra-ui/react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
// import { Input } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

import { IconButton } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { debounce } from "lodash";

import { Link } from "@chakra-ui/next-js";

import { Providers } from "./providers";
import { useEffect, useState } from "react";

import JobList from "./components/JobList";
import ModalButton from "./components/ModalAddButton";
import StatisticsBasic from "./components/statisticsBasic";

import "./styles/table-styles.css";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // const handleSearch = () => {
  // const filteredJobs = jobs.filter(job =>
  //   job.jobPosition.toLowerCase().includes(searchTerm.toLowerCase())
  //   // job.jobPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   // job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // setFilteredJobs(filteredJobs);
  // };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  const calculateDaysSince = (job: Job) => {
    const currentDate = new Date();
    let applicationDate = new Date(job.dateApplied);
    let responseDate = new Date(job.responseDate);

    let differenceInMilliseconds;
    if (
      job.status === "Applied" ||
      responseDate.getTime() === applicationDate.getTime()
    ) {
      differenceInMilliseconds =
        currentDate.getTime() - applicationDate.getTime();
    } else {
      differenceInMilliseconds =
        responseDate.getTime() - applicationDate.getTime();
    }

    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  };

  useEffect(() => {
    fetch("/api/jobList")
      .then((response) => response.json())
      .then((data) => {
        const jobsWithDaysSince = data.data.map((job: Job) => {
          const daysSince = calculateDaysSince(job);
          return { ...job, daysSince };
        });
        setJobs(jobsWithDaysSince);
      })
      .catch((error) => console.log(error));
  }, []);

  const addJob = (newJob: Job) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <body>
      <Providers>
        <Flex justify="center" direction="column">
          <Flex justify="center">
            <StatisticsBasic jobs={jobs} />
          </Flex>

          {/* <Link href="/statistics">Statistics</Link> */}
          <HStack w="45%" margin="auto">
            <ModalButton addJob={addJob} />
            {/* <input 
            placeholder='Search for applications' 
            // size='sm' 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <IconButton
          onClick = {handleSearch}
          colorScheme='blue'
          aria-label='Search database'
          icon={<SearchIcon />}
          /> */}
          </HStack>

          <div className="jobContainer">
            <JobList jobs={jobs} setJobs={setJobs} />
          </div>
        </Flex>
      </Providers>
    </body>
  );
}
