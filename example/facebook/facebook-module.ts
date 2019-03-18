import { ClassProvider, injectable, Injector } from '../../src';
import { MessageClient } from '../message-client';
import { MessageModule } from '../message-module';
import { MESSAGE_SERVICE } from '../message-service';
import { FacebookMessageService } from './message-service';

@injectable()
export class FacebookModule implements MessageModule {

    private injector: Injector;

    public client: MessageClient;

    constructor (injector: Injector) {

        this.injector = new Injector(injector);

        this.injector.register(MESSAGE_SERVICE, new ClassProvider(FacebookMessageService));

        this.client = this.injector.resolve(MessageClient)!;
    }
}
