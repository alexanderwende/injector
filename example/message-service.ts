import { InjectToken } from '../src';
import { User } from './user';

export interface MessageService {
    sendMessage (message: string, user: User): string;
    receiveMessage (): Promise<string>;
}

export const MESSAGE_SERVICE = new InjectToken<MessageService>('MessageService');
