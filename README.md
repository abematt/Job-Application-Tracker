# Job Tracker

**Job Tracker** is a web application developed over a few weeks to replace the existing workflow that used Google Sheets. The main goals were to have a simple table showing the list of jobs, a set of cards to display basic statistics for an overview of the progress, and the ability to perform basic manipulations such as Add, Delete, Sort, etc.

I aimed to challenge myself in gaining more experience with Typescript, Next.js, and practicing CRUD operations while working with MongoDB. Scripting these changes would make my workflow more efficient compared to the time-consuming Google Sheets process.

![](https://github.com/abematt/Job-Application-Tracker/blob/main/scrnli_12_29_2023_9-39-35%20AM.gif)

## Features

With Job Tracker, you can:

- Add a job using a simple form that automatically fills the date for you.
- Delete an entry that has been made.
- See a quick overview of the application process through statistics.

## Tech Stack

The tech stack used:

- **Next.js:** Used for client-side rendering due to limited knowledge and the combination of technologies. Interested in exploring server-side rendering in future projects.
  
- **MongoDB:** Chosen for its ease of use and setup. Without authentication, it seemed more suitable.

### Component Libraries

- **Chakra-UI:** Provided consistent styling for components. Required client-side rendering for components, imposing certain limitations.

- **Tremor:** Used to display charts and metrics using an elegant Card and Grid system.

## Roadmap

This is far from a perfect app, and there are multiple problems that became apparent during development. A clear plan or wireframes from the start would have eased state handling and styling consistency. Going forward, the following additions are planned:

### Milestone 1 (Search Feature)

- Performance issues with the current state management and job list API setup.
- Optimizations such as virtualization and debouncing.
- Decision between server-side and client-side searching.

### Milestone 2 (Unit Testing)

### Milestone 3 (Extended Analytics)

- Separate page with more analytics and statistics.
- Enhance interactivity.

### Milestone 4 (Login)

- Make it a deployable job tracker.
- Add authentication and security features.
