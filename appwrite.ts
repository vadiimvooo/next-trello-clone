// @ts-ignore
import { Client, Account, Databases, Storage, ID } from "appwrite";
import * as process from "process";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client)

// @ts-ignore
export {
    client,
    account,
    databases,
    storage,
    ID
};
