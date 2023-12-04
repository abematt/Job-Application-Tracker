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
import { Button } from '@chakra-ui/react'

import { useEffect, useState } from 'react';

import AddJob from './jobAddForm'

export default function ModalButton({ addJob }: { addJob: (...args: any[]) => void }) 
  {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
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
                <ModalCloseButton />
                <ModalBody>
                  <AddJob addJob={addJob}/>
                </ModalBody> 
                <ModalFooter>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        );
  }