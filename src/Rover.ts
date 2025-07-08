export class Rover {
    id: number;
    name: string;
    landingDate: string;
    launchDate: string;
    status: string;
    maxSol: number;
    maxDate: string;
    totalPhotos: number;

    public constructor(response: Object) {
        this.id = response["id"];
        this.name = response["name"];
        this.landingDate = response["landing_date"];
        this.launchDate = response["launch_date"];
        this.status = response["status"];
        this.maxSol = response["max_sol"];
        this.maxDate = response["max_date"];
        this.totalPhotos = response["total_photos"];
    }
}