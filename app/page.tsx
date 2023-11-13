import { Providers } from './providers';
import JobList from './components/JobList'
import { Flex, Spacer } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ModalButton from './components/ModalAddButton'

export default async function Home() {
  return (
    <body>
      <Providers>
        <Flex justify="center" direction="column">
          <Flex justify="center">
            <Tabs>
              <TabList>
                <Tab>Job Tracker</Tab>
                <Tab>Statistics</Tab>
                <Tab><ModalButton /></Tab> 
              </TabList>
            </Tabs>
          </Flex>
          <Flex justify="center">
            <JobList/>
          </Flex>
        </Flex>
      </Providers>
    </body>
  )
}
