import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { from, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';
import * as WebSocket from 'ws';

@WebSocketGateway(3002) //, { transports: ['websocket'] }
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    return {
      event: 'hello',
      data: data,
      msg: 'rustfisher.com',
    };
  }

  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    console.log('收到消息 client:', data);
    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
    return { event: 'hello2', data: data };
  }
  // @SubscribeMessage('events')
  // onEvent(client: any, payload: any): Observable<WsResponse<any>> | any {
  //   console.log(client);
  //   const { name } = payload;
  //   console.log(name);
  //   if (name === 'ajanuw') {
  //     return of({
  //       event: 'events',
  //       data: {
  //         msg: 'hello ajanuw!',
  //       },
  //     });
  //   }
  //   if (name === 'alone') {
  //     return of('hi', '实打实').pipe(
  //       map(($_) => ({
  //         event: 'events',
  //         data: {
  //           msg: $_,
  //         },
  //       })),
  //     );
  //   }
  //   return of(payload);
  // }
}
