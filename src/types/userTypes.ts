// interface for users
export interface User {
    _id: string;
    username: string;
    email: string;
    thoughts: string[];
    friends: string[];
}

export interface userWithFriendCount extends User {
    friendCount: number;
}