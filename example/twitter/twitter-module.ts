import { ClassProvider, injectable, Injector } from '../../src';
import { MessageClient } from '../message-client';
import { MessageModule } from '../message-module';
import { MESSAGE_SERVICE } from '../message-service';
import { TwitterMessageService } from './message-service';

@injectable()
export class TwitterModule implements MessageModule {

    private injector: Injector;

    public client: MessageClient;

    constructor (injector: Injector) {

        this.injector = new Injector(injector);

        this.injector.register(MESSAGE_SERVICE, new ClassProvider(TwitterMessageService));

        this.client = this.injector.resolve(MessageClient)!;
    }
}
