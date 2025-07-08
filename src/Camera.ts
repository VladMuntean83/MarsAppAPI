export class Camera {
    id: number;
    name: string;
    fullName: string;

    constructor(response: Object) {
        if (response) {
            this.id = response["id"];
            this.name = response["name"];
            this.fullName = response["full_name"];
        }
    }
}