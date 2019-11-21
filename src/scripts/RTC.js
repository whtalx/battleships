import Peer from 'peerjs';

export default function RTC(props) {
  this.lastPeerID = null;

  this.init = () => {
    this.peer = new Peer();
    this.connection = null;
    props.setIsInitialised(true);

    this.peer.on('open', () => {
      if (this.peer.id === null) {
        this.peer.id = this.lastPeerID;
      } else {
        this.lastPeerID = this.peer.id;
      }
      props.setPeerID(this.peer.id);
    });

    this.peer.on('connection', (c) => {
      if (this.connection) {
        c.on('open', c.close);
        return;
      }
      this.connection = c;
      this.ready();
    });

    this.peer.on('disconnected', () => {
      // this.peer.id = this.lastPeerID;
      // this.peer._lastServerID = this.lastPeerID;
      this.peer.reconnect();
    });

    this.peer.on('close', () => {
      this.connection = null;
    });

    this.peer.on('error', () => {
      props.handleDisconnect();
    });


    this.peer.on('close', () => {
      this.connection = null;
    });
  };

  this.ready = () => {
    props.setIsConnected(true);

    this.connection.on('data', props.receive);

    this.connection.on('close', () => {
      this.connection = null;
      props.handleDisconnect();
    });
  };

  this.join = () => {
    if (this.connection) this.connection.close();

    this.connection = this.peer.connect(props.peerID, {
      reliable: true,
      serialization: 'json',
    });

    this.connection.on('open', () => {
      props.setIsConnected(true);
    });

    this.connection.on('close', () => {
      this.connection = null;
      props.handleDisconnect();
    });

    this.connection.on('data', props.receive);
  };

  this.send = (data) => {
    this.connection && this.connection.open && this.connection.send(data);
  };
}
