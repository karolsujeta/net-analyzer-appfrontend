export class FilterModel {
    name: string;
    ip: string;
    port: string;
    protocole: string;
    amount: string;
    interface: string;

    parseFromObject(object) {
        this.name = object.name;
        this.ip = object.ip;
        this.port = object.port;
        this.protocole = object.protocole;
        this.amount = object.amount;
        this.interface = object.interface;
    }
}