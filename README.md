Job Tracker

Job tracker is a web application I developed over a few weeks to replace my current workflow that used Google sheets. The main goals were to have a simple table showing the list of jobs. A set of cards to show basic statistics that gave an overview of the progress and being able to do basic manipulations such as Add,Delete,Sort etc.

I mainly aimed to challenge myself in gaining more experience with Typescript, Next.js and practicing with CRUD operations while working with MongoDB. By scripting a lot of these changes, it would also make my life easier since my Google sheets workflow had become time consuming.
Features

With Job Tracker, you can:

    Add a job using a simple form that automatically fills the date for you
    Delete an entry that has been made
    See a quick overview of the application process through statistics

Tech Stack

The tech stack used were as follows and here are my impressions.

    Next.js : I found myself using a lot of client side rendering because of my limited knowledge and the combination of technologies I used. I would love to tackle another project that used the advantages of server side rendering that Next.js provides but it was still fun getting to learn more about Next.js in the process
    MongoDB: Chosen primarily for its ease of use and setting up. Since I didn’t add any authentication, this seemed more apt as well.

Component Libraries

    Chakra-UI: Chakra-UI helped to bring consistent styling for the components that were used. Chakra-UI required client side rendering for their components which locked me in certain ways
    Tremor: Tremor lets you display charts and metrics using their elegant Card and Grid system that I enjoyed using a lot.

Roadmap

This is far from a perfect app. There are multiple problems with it that I only started to understand as I was developing the project. A lot of the state handling could have been made easier to work with had I used a state management system such as Redux. As consistent as I tried to be with the styling, It could be better. The primary problem was not starting with a clear plan or wireframes from the start. It outlined to me the importance of building with clear planning. Going forward , the things I would like to add are:
Milestone 1 (Search Feature)

    The way the state is managed and the job list API is set up, adding a search feature caused major performance issues
    Optimizations such as virtualization, debouncing would be fun to try and fix these
    Decision between server side and client side searching should be done as well

Milestone 2 (Unit Testing)
Milestone 3 (Extended Analytics)

    I would like to add a separate page with more analytics and statistics
    Make them more interactive

Milestone 4 (Login)

    Make it an actually deployable job tracker
    Adding authentication and security features
