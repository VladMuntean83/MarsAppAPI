import {Camera} from "./Camera"
import {Rover} from "./Rover";

export class Photo {
    id: number;
    sol: number;
    camera: Camera;
    imageSource: string;
    earthDate: string;
    rover: Rover;

    constructor(response: Object) {
        this.id = response["id"];
        this.sol = response["sol"];
        this.camera = new Camera(response["camera"]);
        this.imageSource = response["img_src"];
        this.earthDate = response["earth_date"];
        this.rover = new Rover(response["rover"]);
    }
}