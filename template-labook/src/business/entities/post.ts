export enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
 }
 
export type Post = {
    id: string,
    subtitle:string,
    name:string,
    author:string[],
    date:Date,
    file:string,
    tags:string[],
    collection:string,
 }
 