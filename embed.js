//embed.js

/**
Read .env file
**/
import * as dotenv from 'dotenv';
dotenv.config();


/**
Open AI Embedding wrapper from langchain
**/
import { OpenAIEmbeddings } from 'langchain/embeddings';


/**
Chunk text/text splitter function from langchain
**/
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';


/**
Pinecone wrapper from langchain
**/
import { PineconeStore } from 'langchain/vectorstores';


/**
Init fs
**/
import * as fs from 'fs';


/**
Create text splitter with chunksize 1000 character
**/
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 0 });


/**
Init OpenAI Embeddings
**/
const embedder = new OpenAIEmbeddings({
    apiKey: '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'
  });

/**
Get index from our pinecone.js
**/
import { index } from './pinecone.js';


(async () => {

    try {


        //read article
        const article = await fs.readFileSync('information.txt', { encoding: 'utf-8' });
        //split the text
        const splittedText = await textSplitter.createDocuments([article]);

        console.log("splittedTest", splittedText)

        //store the splitted text to pinecone, in index "article" and namespace "langchain" (namespace is for filter purpose later, can be whatever you want)
        await PineconeStore.fromDocuments(splittedText, embedder, { pineconeIndex: index, namespace: 'myai' });

        console.log("complted")

    } catch (error) {
        console.log("error", error.response.data)
    }
})()
