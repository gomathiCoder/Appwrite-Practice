import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
.setEndpoint('http://192.168.43.170/v1')
.setProject('63599f5a842a3fd925ec');

const db = new Databases(client);

export default db;
export const DatabaseId = '63625e4e6bc40b709846';
export const CollectionId_EmpDetails = '63625e6103b90ef6da05';