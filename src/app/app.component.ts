import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngWebSocket';

  constructor(
    private svHttp: HttpService
  ) {
    this.svHttp.jwtAuth$('userA', 'example-password-userA')
      .subscribe((jResponse: any) => {
        // const jResponse = JSON.parse(response);
        console.log('jResponse:', jResponse)
        const jwtToken = jResponse.token;
        const subject = webSocket(`ws://localhost:3000/ws?token=${jwtToken}`);
        subject.subscribe(
          msg => console.log('message received: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
          err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
          () => console.log('complete') // Called when connection is closed (for whatever reason).
        );

        subject.subscribe();

        const env = {
          msg: "Welcome! user:" + 1010,
          userId: 1010,
          destination: 1010,
          jwtToken: jwtToken
        }
        subject.next(env);
        // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!

        subject.complete(); // Closes the connection.

        subject.error({ code: 4000, reason: 'I think our app just broke!' });
        // Also closes the connection, but let's the server know that this closing is caused by some error.
      })


  }

  ngOnInit(): void {

  }

}
