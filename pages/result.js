import { Badge, Box, CircularProgress, Divider, Flex, Heading, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchSource } from "../utils/GenerateSource"
import { removeStopWords, stemming, tokenizing } from "../utils/processes"

export default function Result() {
    const [loadingStates, setLoadingState] = useState("Fetching Source Links...")
    const [results, setResults] = useState(null)





    let preProcessing = (text, isUser = true) => {
        setLoadingState(`Tokenizing ${isUser ? 'User' : 'Source'} document...`)
        let toknizedData = tokenizing(text)
        setLoadingState('Removing stop words...')
        let stopWordsRemoved = removeStopWords(toknizedData)
        setLoadingState(`Stemming ${isUser ? 'User' : 'Source'} document...`);
        let preProcessedData = stemming(stopWordsRemoved)


        return preProcessedData


    }
    const process = async () => {
        let text = localStorage.getItem('userDocumentText')
        if (!text) {
            alert('Please upload a file first')
            window.location.href = '/'
        }
        const sources = await fetchSource(text, setLoadingState);

        let userPreProcessedData = preProcessing(text)



        let preProcessedSource = [];
        for (let source of sources) {
            let sourcePreProcessedData = preProcessing(source.content, false)
            preProcessedSource.push({ link: source.link, data: sourcePreProcessedData })
        }

        setLoadingState('Validating plagiarism algorithm...')
        let userChoice = localStorage.getItem('selectedAlgo')

        let plagarismSources = []

        setLoadingState('Checking Plagiarism...')
        // [ant,mammal,eat]

        // [[ant,mammal,eat],[ant,mammal,eat],[ant,mammal,eat]]


        for (let { data: sourceArray, link } of preProcessedSource) {

            let rate =
            // let x=require("../algorithms/rabinKarp.js") x.calculate
                require("../algorithms/" + userChoice + ".js")
                    .calculate(sourceArray, userPreProcessedData)

            




            plagarismSources.push({ rate, link })


        }

        setResults(plagarismSources)
        setLoadingState(null)





    }

    useEffect(() => {
        process()
    }, [])





    function extractDomainName(url) {
        let domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        return domain;
    }


    return (
        <>
            {loadingStates ? <Box bg="rgba(0,0,0,0.4)" position="fixed" top="0" left="0" w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress isIndeterminate color="teal.300" />

                <Text fontSize="xl" color="white" ml={5}>{loadingStates}</Text>
            </Box> :


                <>

                    <Flex
                        onClick={() => window.location.href = '/'}
                        bg="#0D4C92" w="100%" p={4} color="white" justifyContent="center" alignItems="center">
                        <Heading size='lg'>Plag Patrol</Heading>
                    </Flex>
                    <Box w="100%" h="100vh" display="flex" alignItems={'center'} flexDirection="column" bg="#efefef">
                        <Text fontSize="2xl" fontWeight="bold" color="teal.300">Plagiarism Results:</Text>
                        <Flex mt="4" justifyContent="center" alignItems="center" flexDirection="column" gap={10}>
                            {results
                                // .filter(({ rate }) => rate > 5)
                                .sort((a, b) => b.rate - a.rate)
                                .map(({ rate, link }) =>
                                    <Box key={link} display="flex" justifyContent="center" alignItems="center" flexDirection="column" p={6}
                                        rounded="md"
                                        bg="white" shadow="md">
                                        <Badge colorScheme="red" fontSize="xs" fontWeight="bold" >Plagiarism Detected</Badge>
                                        <Divider my={4} />
                                        <Flex
                                            align="center"
                                            justify="space-between"
                                            gap={4}
                                        >
                                            <Text
                                                bg="green.100"
                                                as={'a'} href={link}
                                                target="_blank"
                                                flex={1}>{extractDomainName(link)}</Text>
                                            <Text fontSize="md" fontWeight="bold" color="red.300" mt={2}>{rate.toFixed(2)}%</Text>

                                        </Flex>


                                    </Box>)}
                            {results.filter(({ rate }) => rate <= 5).length < 1 && <Text fontSize="xl" fontWeight="bold" color="teal.300">No plagiarism detected</Text>}
                        </Flex>
                    </Box>

                </>}







        </>
    )
}