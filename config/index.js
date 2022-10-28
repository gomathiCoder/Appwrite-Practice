import { Client, Account} from 'appwrite';

const client = new Client();
const account = new Account(client);

client
.setEndpoint('http://192.168.43.170/v1')
.setProject('63599f5a842a3fd925ec');

export default account;