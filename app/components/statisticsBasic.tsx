"use client";

import "tailwindcss/tailwind.css";
import {
  Card,
  Text,
  Title,
  DonutChart,
  BarChart,
  BarList,
  Metric,
  Grid,
  Col,
  LineChart,
  SparkAreaChart,
  SparkLineChart,
  SparkBarChart,
} from "@tremor/react";

export default function StatisticsBasic({ jobs }) {
  // Getting today's date //
  const today = new Date();
  const day = today.getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  // Find different job statuses //
  const statusCounts = Object.entries(
    jobs.reduce((counts: Record<string, number>, job) => {
      counts[job.status] = (counts[job.status] || 0) + 1;
      return counts;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({
    name: status,
    value: Number(count),
  }));

  // Get the last 10 days
  const last10Days = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    return date;
  });

  // Map the array of the last 10 days to an array of objects with the day and the number of applications
  const applicationsByDay = last10Days.map((date) => {
    const numApplications = jobs.filter((job) => {
      const jobDate = new Date(job.dateApplied);
      jobDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00
      return jobDate.getTime() === date.getTime();
    }).length;
    return { day: date.toISOString().split("T")[0], numApplications };
  });

  const fortyFiveDaysAgo = new Date();
  fortyFiveDaysAgo.setDate(fortyFiveDaysAgo.getDate() - 45);
  fortyFiveDaysAgo.setHours(0, 0, 0, 0); // Set the time to 00:00:00

  // Filter the jobs applied more than 45 days ago
  const jobsAppliedMoreThan45DaysAgo = jobs.filter((job) => {
    const jobDate = new Date(job.dateApplied);
    jobDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    return (
      jobDate.getTime() < fortyFiveDaysAgo.getTime() && job.status === "Applied"
    );
  }).length;

  const appliedObject = statusCounts.find((item) => item.name === "Applied");
  const appliedStatusCount = appliedObject ? appliedObject.value : 0;
  const possibleApplications: number =
    (appliedStatusCount as number) - jobsAppliedMoreThan45DaysAgo;

  // Get today's date
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

  // Filter the jobs applied today
  const jobsAppliedToday = jobs.filter((job) => {
    const jobDate = new Date(job.dateApplied);
    jobDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    return jobDate.getTime() === today.getTime();
  });

  // Get the number of jobs applied today
  const numJobsAppliedToday = jobsAppliedToday.length;

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
      <Col numColSpan={1} numColSpanLg={1}>
        <Card decoration="bottom" decorationColor="indigo">
          <Text>
            {monthName} {day}
          </Text>
          <Text>Number of Applications Today</Text>
          <Metric>{numJobsAppliedToday}</Metric>
          <Metric></Metric>
        </Card>
        <Card decoration="bottom" decorationColor="indigo">
          <Text>Number of Jobs Applied:</Text>
          <Metric>{jobs.length}</Metric>
        </Card>
      </Col>

      <Col>
        <Card decoration="top" decorationColor="indigo">
          <Text>Application Status</Text>
          <BarList data={statusCounts} />
          {/* <DonutChart
            data={statusCounts}
            category="value"
            index="name"
            // valueFormatter={valueFormatter}
            colors={["teal", "rose", "orange", "emerald", "blue", "emerald"]}
          /> */}
        </Card>
      </Col>

      <Col>
        <Card
          decoration="bottom"
          decorationColor="indigo"
          className="max-w-lg flex items-center justify-between mx-auto px-4 py-3.5"
        >
          <div className="flex items-center space-x-2.5">
            <Text>Last 10 days</Text>
          </div>
          <SparkAreaChart
            data={applicationsByDay}
            index="day"
            categories={["numApplications"]}
            colors={["emerald"]}
          />
        </Card>
        <Card decoration="bottom" decorationColor="indigo">
          <Text>No Response{"+45 Days"}</Text>
          <Metric>{jobsAppliedMoreThan45DaysAgo}</Metric>
          <Text>Possible Applications</Text>
          <Metric>{possibleApplications}</Metric>
        </Card>
      </Col>
    </Grid>
  );
}
