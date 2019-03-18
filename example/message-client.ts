import { inject, injectable } from '../src';
import { MessageService, MESSAGE_SERVICE } from './message-service';
import { User, USER } from './user';

@injectable()
export class MessageClient {

    constructor (
        @inject(MESSAGE_SERVICE) protected service: MessageService,
        @inject(USER) protected user: User) { }

    sendMessage (message: string): string {

        return this.service.sendMessage(message, this.user);
    }

    receiveMessage (): Promise<string> {

        return this.service.receiveMessage();
    }
}
