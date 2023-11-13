'use client'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'

import AddJob from './jobAddForm'

export default function ModalButton( {addJob} ) 
{
    // const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // The useEffect hook runs after the component has been rendered, 
      // so we can safely set the isClient state to true here.
      setIsClient(true);
    }, []);

      // If we're on the server, don't render the modal
    if (!isClient) {
      return null;
    }
    
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    return (
          <>
            <Button onClick={onOpen}>Insert Application</Button>
  
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                {/* <ModalHeader>Add Job</ModalHeader> */}
                <ModalCloseButton />
                <ModalBody>
                  <AddJob addJob={addJob}/>
                </ModalBody>
      
                <ModalFooter>
                  {/* <Button colorScheme="green" variant='solid' mr={3}>Add Job</Button> */}
                  {/* <Button colorScheme='red' onClick={onClose}> */}
                    {/* Close
                  </Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        );
  }