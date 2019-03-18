import { injectable } from '../../src';
import { MessageService } from '../message-service';
import { User } from '../user';

@injectable()
export class TwitterMessageService implements MessageService {

    sendMessage (message: string, user: User): string {

        return `Sending twitter message from ${ user.username }: ${ message }`;
    }

    receiveMessage (): Promise<string> {

        return new Promise(resolve => {

            setTimeout(() => resolve('Received twitter message from anonymous: Hola!'), 200);
        });
    }
}
