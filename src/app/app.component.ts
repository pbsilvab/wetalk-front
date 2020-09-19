import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupsQuery, Channel, Meeting } from './types/schema';
import * as io from 'socket.io-client';
import Peer from 'peerjs';
import { environment } from 'src/environments/environment';


const socket = io(environment.SOCKET_HOST, { secure: true } );

socket.on('connect_failed', () => {
  console.log('Connection Failed');
});
socket.on('connect', () => {
  console.log('Connected');
});
socket.on('disconnect', () => {
console.log('Disconnected');
});

const peer = new Peer(undefined, {
  host: environment.PEER_HOST,
  port: 3001,
  secure: true
});

let userId: string;

peer.on('open', (id) => {
  userId = id;
  console.log(userId);
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'wetalk-front';

  peer;

  channels: Channel[];

  meetings: Meeting[];

  groups: Observable<GroupsQuery>;

  videoGrid = [];

  muted = false;

  constructor(private apollo: Apollo) {
    this.getGroupsList();
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  // tslint:disable-next-line: typedef
  getGroupsList() {
      const queryArgs = `totalCount edges { cursor node { id name channels { id name groupId meetings { id name channelId}}}}`;

      this.groups = this.apollo.watchQuery<GroupsQuery>({
        query:
          gql`
            query groups($first: Int) {
              groups {
                find(first: $first ){
                  ${queryArgs}
                }
              }
            }
          `, variables: { first: 10 },
      }).valueChanges.pipe(map(groups => groups.data));
  }

  // tslint:disable-next-line: typedef
  loadChannels(channels: Channel[]) {
    this.channels = channels;
  }

  // tslint:disable-next-line: typedef
  seeMeetings(meetings: Meeting[]) {
    this.meetings = meetings;
  }

  // tslint:disable-next-line: typedef
  intoMeeting( roomid: string ) {
      console.log(roomid);
      navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      }).then( stream => {

          console.log('emit');
          console.log(userId);

          socket.emit('join-room', roomid, userId);

          this.addVideoStream(stream);

          peer.on('call', call => {

              console.log('call');

              call.answer(stream);

              call.on('stream', userVideoStream => {
                  this.addVideoStream(userVideoStream);
              });

          });

          socket.on('user-connected', (  MeetingId  ) => {

            console.log('user-connected');
            console.log(MeetingId);

            this.connectToNewUser(MeetingId, stream);
          });
      });

  }

  connectToNewUser = (uId, stream) => {

    const call = peer.call(uId, stream);

    call.on('stream', userVideoStream => {
        this.addVideoStream(userVideoStream);
    });
  }


  // tslint:disable-next-line: typedef
  addVideoStream(stream) {
    // console.log(this.videoGrid);

    // video.nativeElement.srcObject = ;

    // video.nativeElement.addEventListener('loadedmetadata', () => {
    //   video.nativeElement.play();
    // });

    this.videoGrid.push(stream);
    console.log(this.videoGrid);
  }

  // tslint:disable-next-line: typedef
  pauseVideo() {
    this.muted = !this.muted;
  }

  enventHandler(e) {
    console.log(e);
  }
}
