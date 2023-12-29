'use client'
import { Providers } from '../app/providers';
import { Card } from "@tremor/react";
import { Tabs, TabList, Tab} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'

export default function Statistics() {
    return (
        <>
            <Tabs>
              <TabList>
                <h1>Hi</h1>
                <Tab><Link href='/'>Job Tracker</Link></Tab>
                <Tab><Link href='/statistics'>Statistics</Link></Tab>
                {/* <ModalButton addJob={addJob}/> */}
              </TabList>
            </Tabs>
        </>
                
    )
}