//import 
import { Reaction } from './reactionTypes';

//thought interface
export interface Thought {
    _id: string;
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions:  Reaction[];
}

export interface thoughtWithReactionCount extends Thought {
    reactionCount: number;
}