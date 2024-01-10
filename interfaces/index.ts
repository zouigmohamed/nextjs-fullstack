export interface ITodos {
    id?: string | undefined;
    title: string;
    body: string | null ;
    completed: boolean;
    createdAt?: Date;
}[]