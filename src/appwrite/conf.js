import envconf from "../envconfigure/envconf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(envconf.appwriteURL)
            .setProject(envconf.appwriteProjectID); 
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({tittle,slug, content, featuredimage, status, userId}){
        try {
            return await this.databases.createDocument(
                envconf.appwriteDatabaseID,
                envconf.appwriteCollectionID,
                slug,
                {
                    tittle, 
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite::createPost::error::",error);
        }
    }

    async updatePost(slug, {tittle, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                envconf.appwriteDatabaseID,
                envconf.appwriteCollectionID,
                slug,
                {
                    tittle, 
                    content,
                    featuredimage,
                    status,
                   
                }
            )  
        } catch (error) {
            console.log("Appwrite::updatePost::error::",error);
        }

    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                envconf.appwriteDatabaseID,
                envconf.appwriteCollectionID,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite::deletePost::error::",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                envconf.appwriteDatabaseID,
                envconf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite::getPost::error::",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.getDocuments(
                envconf.appwriteDatabaseID,
                envconf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite::getPost::error::",error);
            return false;
        }
    }

    //File related Services
    
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                envconf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite::uploadPost::error::",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                envconf.appwriteBucketID,
                fileID
            )
            return true
        } catch (error) {
            console.log("Appwrite::deletePost::error::",error);
            return false;
        }
    }

    getFilePreview(fileID){
        
            return this.bucket.getFilePreview(
                envconf.appwriteBucketID,
                fileID
            )
        
    }

}

const service = new Service();
export default service