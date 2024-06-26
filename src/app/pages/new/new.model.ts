export class PostData{
    username: string;
    title: string;
    author: string;
    content: string;

    constructor(username:string,title: string, author: string, content: string){
        this.username = username;
        this.title = title;
        this.author = author;
        this.content = content;
    }
}