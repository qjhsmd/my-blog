import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
// import * as WebSocket from 'ws';

// import { Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';
// const l = console.log;

@WebSocketGateway(3005, { transports: ['websocket'] })
// console.log('比如说');
export class eventsGateway {
  @SubscribeMessage('events')

  // onEvent(client: any, payload: any): Observable<WsResponse<any>> | any {
  //   const { name } = payload;
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
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    // console.log(client);
    console.log(data);
    return data;
  }

  //   @SubscribeMessage('hello')
  //   hello(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
  //     console.log('收到消息 client:', client);
  //     client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
  //     return { event: 'hello2', data: data };
  //   }
}
