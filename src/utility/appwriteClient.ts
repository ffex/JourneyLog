import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "http://localhost/v1";
const APPWRITE_PROJECT = "63e91ab5183446f04cad";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage };
