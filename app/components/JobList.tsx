"use client";

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
} from "@chakra-ui/react";

import { DeleteIcon, UpDownIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "../Pagination.css";
import "../styles/table-styles.css";

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

export default function JobList({
  jobs,
  setJobs,
}: {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [sortDirection, setSortDirection] = useState("asc");

  const PER_PAGE = 10;

  function handlePageClick({ selected: selectedPage }: { selected: number }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const pageCount = Math.ceil(jobs.length / PER_PAGE);

  // Update API call
  const handleUpdateStatus = async (id: string, status: string) => {
    const today = new Date();
    const formattedDate = status === "Applied" ? "" : today;
    const response = await fetch("/api/jobList", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        status: status,
        responseDate: formattedDate,
      }),
    });

    if (!response.ok) {
      throw new Error("Error updating Job");
    }

    const updatedJob = await response.json();
    setJobs(jobs.map((job) => (job._id === id ? updatedJob.data : job)));
    // addJob(updatedJob.data);
  };

  // Delete API call
  const handleDelete = async (job: Job) => {
    const response = await fetch("/api/jobList", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: job._id }),
    });

    if (!response.ok) {
      throw new Error("Error deleting Job");
    }

    const idToDelete = job._id;
    const updatedJobs = jobs.filter((job) => job._id !== idToDelete);
    setJobs(updatedJobs);
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // check if date is valid
      return "No";
    } else {
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }
  }

  const sortData = (column) => {
    let direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);

    let sortedJobs = [...jobs].sort((a, b) => {
      if (typeof a[column] === "string") {
        return direction === "asc"
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      } else {
        return direction === "asc"
          ? a[column] - b[column]
          : b[column] - a[column];
      }
    });

    setJobs(sortedJobs);
  };

  useEffect(() => {
    console.log(jobs, "Update state in joblist component"); // Log the jobs prop
  }, [jobs]);

  const currentPageData = jobs
    .slice(offset, offset + PER_PAGE)
    .map(
      (job: {
        _id: string;
        companyName: string;
        jobPosition: string;
        dateApplied: string;
        status: string;
        responseDate: string;
        daysSince: number;
        notes: string;
      }) => (
        <Tr className="tableRow" key={job._id}>
          <Td className="textBreakStyle">{job.companyName}</Td>
          <Td className="textBreakStyle">{job.jobPosition}</Td>
          <Td className="textBreakStyle">{formatDate(job.dateApplied)}</Td>
          <Td className="textBreakStyle">
            <Select
              value={job.status}
              className={`jobStatus jobStatus${job.status}`}
              onChange={(e) => handleUpdateStatus(job._id, e.target.value)}
            >
              <option value="Applied" style={{ color: "green.500" }}>
                Applied
              </option>
              <option value="Rejected">Rejected</option>
              <option value="Callback">Callback</option>
              <option value="R/A">R/A</option>
            </Select>
          </Td>
          {/* <Td>{job.status}</Td> */}
          <Td className="textBreakStyle">{formatDate(job.responseDate)}</Td>
          <Td className="textBreakStyle">{job.daysSince}</Td>
          <Td className="textBreakStyle">
            {" "}
            <IconButton
              size="xs"
              variant="outline"
              aria-label="Delete"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(job)}
            />
          </Td>

          {/* <Td>{job.notes}</Td> */}
        </Tr>
      )
    );

  return (
    <TableContainer>
      <Table
        colorScheme="messenger"
        variant="unstyled"
        size="sm"
        className="tableCustomStyle"
      >
        <TableCaption>Job Application Tracking</TableCaption>
        <Thead>
          <Tr>
            <Th className="textBreakStyle">Company Name</Th>
            <Th className="textBreakStyle">Job Position</Th>
            <Th
              className="textBreakStyle sortable"
              onClick={() => {
                sortData("dateApplied");
              }}
            >
              Date Applied
              <UpDownIcon />
            </Th>
            <Th
              className="textBreakStyle sortable"
              onClick={() => {
                sortData("status");
              }}
            >
              Status
              <UpDownIcon />
            </Th>
            <Th
              className="textBreakStyle"
              onClick={() => {
                sortData("responseDate");
              }}
            >
              Response Date
            </Th>
            <Th
              className="textBreakStyle sortable"
              onClick={() => {
                sortData("daysSince");
              }}
            >
              Days Since
              <UpDownIcon />
            </Th>
            <Th className="textBreakStyle">Delete</Th>
            {/* <Th>Notes</Th> */}
          </Tr>
        </Thead>
        <Tbody>{currentPageData}</Tbody>
      </Table>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </TableContainer>
  );
}
