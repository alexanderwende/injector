import { FacebookModule } from './facebook/facebook-module';
import { injector } from './injector.config';
import { MessageModule } from './message-module';
import { TwitterModule } from './twitter/twitter-module';

export const facebookModule: MessageModule = injector.resolve(FacebookModule)!;
export const twitterModule: MessageModule = injector.resolve(TwitterModule)!;
