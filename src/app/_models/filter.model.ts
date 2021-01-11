export class FilterModel {
    name: string;
    ip: string;
    port: string;
    amount: string;

    parseFromObject(object) {
        this.name = object.name;
        this.ip = object.ip;
        this.port = object.port;
        this.amount = object.amount;
    }
}