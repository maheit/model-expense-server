import mongoose from 'mongoose';

interface init {
  port: number;
  hostname: string;
  databasename: string;
  username: string;
  password: string;
}

class DBConnection {
  public port: number;
  public hostname: string;
  public databasename: string;
  public username: string;
  public password: string;
  public URI: string;
  constructor(db: init) {
    this.port = db.port;
    this.hostname = db.hostname;
    this.databasename = db.databasename;
    this.username = db.username;
    this.password = db.password;
    this.URI = `mongodb://${this.hostname}:${this.port}/${this.databasename}`;
  }
}
export default DBConnection;
