import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(3002, { transports: ['websocket'] })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // onEvent(client: any, data: any): Observable<WsResponse<number>> {
  //   console.log(data);
  //   console.log(client);
  //   const res = from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  //   console.log(res);
  //   return res;
  // }
  @SubscribeMessage('events')
  onEvent(client: any, payload: any): Observable<WsResponse<any>> | any {
    // console.log(client);
    const { name } = payload;
    console.log(name);
    if (name === 'ajanuw') {
      return of({
        event: 'events',
        data: {
          msg: 'hello ajanuw!',
        },
      });
    }
    if (name === 'alone') {
      return of('hi', '实打实').pipe(
        map(($_) => ({
          event: 'events',
          data: {
            msg: $_,
          },
        })),
      );
    }
    return of(payload);
  }
}
