import { facebookModule, twitterModule } from './main';
import { MessageClient } from './message-client';

describe('Example app with separate injector.config.ts', () => {

    it('should export two correctly resolved modules', (done) => {

        let facebookResponse: string, twitterResponse: string;

        expect(facebookModule).toBeDefined();
        expect(facebookModule.client instanceof MessageClient).toBe(true);
        expect(facebookModule.client.sendMessage(`What's up?`)).toBe(`Sending facebook message from alex: What's up?`);

        facebookModule.client.receiveMessage().then(response => {
            expect(response).toBe('Received facebook message from anonymous: Hi there!');
            facebookResponse = response;
            if (twitterResponse) done();
        });

        expect(twitterModule).toBeDefined();
        expect(twitterModule.client instanceof MessageClient).toBe(true);
        expect(twitterModule.client.sendMessage(`Que pasa?`)).toBe(`Sending twitter message from alex: Que pasa?`);

        twitterModule.client.receiveMessage().then(response => {
            expect(response).toBe('Received twitter message from anonymous: Hola!');
            twitterResponse = response;
            if (facebookResponse) done();
        });
    });
});
