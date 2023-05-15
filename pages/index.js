import { Box, Button, Flex, Card, CardHeader, CardBody, Heading, Stack, StackDivider, Spacer, Input, CheckboxIcon, FormLabel } from '@chakra-ui/react'
import { AttachmentIcon, CheckIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import fileHandler from '../utils/fileHandler'
import { useRouter } from 'next/router'
import { BsCheckCircleFill } from "react-icons/bs";

export const ALGOS = [
  {
    name: 'Rabin Karp',
    key: 'rabinKarp',
  }, {
    name: 'Knuth Morris Pratt',
    key: 'knuthMorrisPratt',
  }
]
const index = () => {

  const { push } = useRouter();
  const [isLoading, setLoading] = useState(false)
  const [selectedAlgo, setAlgo] = useState(ALGOS[0].key)
  const [fileContent, setFileContent] = useState(null)
  const [threshold, setThreshold] = useState(8)




  const handleFile = async (e) => {
    try {
      setLoading(true)
      const text = await fileHandler(e)
      setFileContent(text)

    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault()
      localStorage.setItem('userDocumentText', fileContent)
      localStorage.setItem('selectedAlgo', selectedAlgo)
      localStorage.setItem('threshold', threshold)
      push("/result")

    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <Box >

      <Flex bg="#0D4C92" w="100%" p={4} color="white" justifyContent="center" alignItems="center">
        <Heading size='lg'>Plag Patrol</Heading>
      </Flex>



      <Flex h="700px" justifyContent="center" alignItems="center" as="form" onSubmit={submitForm}>
        <Card bg="white" minW="40%" h="70%" borderRadius='xl' p={5}>
          <CardHeader align='center'>
            <Heading size='md'>Submit a document</Heading>
          </CardHeader>

          <CardBody mt={5}>
            <Stack direction="column" justifyContent='space-between' h="100%" >
              <Box align='center'>
                <Button
                  type="button"
                  onClick={() => document.getElementById("hidden_input").click()}
                  leftIcon={fileContent ? <BsCheckCircleFill /> : <AttachmentIcon />}
                  colorScheme='teal'
                  variant='solid'
                >
                  <FormLabel>
                    {fileContent ? "File uploaded." : "Upload your file"}
                  </FormLabel>
                </Button>
                <input
                  type='file'
                  id="hidden_input"
                  onChange={handleFile}
                  accept=".txt" />

                <Heading size='xs' mt={10} align='left'>
                  Choose an algorithm
                </Heading>
                <Flex mt={5} spacing="20px" gap="5">

                  {ALGOS.map((algo) =>
                    <Button
                      type="button"
                      leftIcon={selectedAlgo == algo.key ? <CheckIcon /> : ""}
                      bg={selectedAlgo === algo.key ? 'green.400' : '#0D4C92'}
                      color="white"
                      variant='solid'
                      _hover={{ bg: 'green.400' }}
                      onClick={() => setAlgo(algo.key)}>
                      {algo.name}
                    </Button>)}
                </Flex>

                <Heading size='xs' mt={10} align='left'>
                  Threshold (Word)
                </Heading>
                <Input required mt={5} type="number" min={1} max={20} placeholder="Enter threshold" value={threshold} onChange={(e) => setThreshold(e.target.value)} />


              </Box>
              <Box>
                <Button
                  type="submit"
                  isDisabled={!fileContent || !selectedAlgo}
                  isLoading={isLoading}
                  colorScheme='teal' variant='solid' w="100%">
                  Check for plagiarism
                </Button>
              </Box>

            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  )
}

export default index