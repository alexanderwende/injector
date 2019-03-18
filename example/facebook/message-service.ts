import { injectable } from '../../src';
import { MessageService } from '../message-service';
import { User } from '../user';

@injectable()
export class FacebookMessageService implements MessageService {

    sendMessage (message: string, user: User): string {

        return `Sending facebook message from ${ user.username }: ${ message }`;
    }

    receiveMessage (): Promise<string> {

        return new Promise(resolve => {

            setTimeout(() => resolve('Received facebook message from anonymous: Hi there!'), 500);
        });
    }
}
