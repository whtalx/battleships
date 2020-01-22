import Peer from 'peerjs';

export default class Person {
  constructor(props) {
    this.disconnect = props.disconnect;
    this.initialised = props.initialised;
    this.client = props.client;
    this.setId = props.setId;
    this.error = props.error;
    this.open = props.open;
    this.data = props.data;
    this.options = {
      reliable: true,
      serialization: 'json',
    };
    this.init();
  }

  close = () => {
    this.connection && this.connection.close();
    this.connection = null;
    this.disconnect();
  };

  init = () => {
    this.peer = new Peer();
    this.connection = null;
    this.lastPeerID = null;
    this.initialised();

    this.peer.on('open', () => {
      if (this.peer.id === null) {
        this.peer.id = this.lastPeerID;
      } else {
        this.lastPeerID = this.peer.id;
      }
      this.setId(this.peer.id);
    });

    this.peer.on('connection', (c) => {
      if (this.connection) {
        c.on('open', c.close);
        return;
      }

      this.connection = c;
      this.ready();
    });

    this.peer.on('close', this.close);
    this.peer.on('error', this.error);
  };

  join = (id) => {
    this.connection = this.peer.connect(id, this.options);
    this.client();
    this.ready();
  };

  ready = () => {
    this.connection.on('open', this.open);
    this.connection.on('data', this.data);
    this.connection.on('close', this.close);
  };

  send = (data) => {
    this.connection && this.connection.open && this.connection.send(data);
  };
};
