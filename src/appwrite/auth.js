import envconf from "../envconfigure/envconf";
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user  = await account.create(
//     'ID.unique()', 
//     'email@example.com', 
//     'password'
// );

export class AuthService{
    client= new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(envconf.appwriteURL)
            .setProject(envconf.appwriteProjectID); 
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
            try {
                const userAccount  = await this.account.create(ID.unique(), email, password, name);
                if (userAccount) {
                    //call another method 
                    return this.Login({email, password});

                } else {
                    return userAccount;
                }

            } catch (error) {
                throw error;
            }
    }

    async Login({email, password}){
            try {
                return await this.account.createEmailPasswordSession(
                    email, 
                    password
                );
            } catch (error) {
                throw error;
            }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authservice = new AuthService();

export default authservice;