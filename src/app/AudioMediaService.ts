import Peer from 'peerjs';
import * as io from 'socket.io-client';

const socket = io('http://localhost:4003/');
const videoGrid = document.getElementById('video-grid');
const  myVideo = document.createElement('video');
myVideo.muted = true;

const peer = new Peer(undefined, {
  host: '/',
  port: 3001
});

peer.on('open', (id) => {
  console.log(456);
  console.log(id);
});


let mediaStreamObject!: MediaRecorder;

export const GetMediaDevices = () => {
  return navigator.mediaDevices;
};

export const userMedia = async () => {
  return await GetMediaDevices().getUserMedia(constraints());
};

export const startUserMedia = async (): Promise<MediaStream> => {
  return await userMedia();
};

export const getMediaState  = (): RecordingState => {
  return mediaStreamObject.state;
};

export const startMediaObject = async (meetingId: string) => {

};

export const stopMediaObject = () => {
  mediaStreamObject.stop();
};

const mediaRecord = (stream: MediaStream) => {
  return stream;
  // if (mediaStreamObject) {
  //   return mediaStreamObject;
  // }else {
  //   return new MediaRecorder(stream);
  // }
};

const constraints  = () => {
  return {
    audio: true
  };
};


const  bufferToBinaryString = (arrayBuffer) => {
  return String.fromCharCode(...new Uint8Array(arrayBuffer));
}

