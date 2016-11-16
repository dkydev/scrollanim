export default class Keyframe {
    
    public start:number;
    public end:number;
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    constructor(data:any) {
        this.start = data["start"];
        this.end = data["end"];
        this.x = data["x"];
        this.y = data["y"];
        this.width = data["width"];
        this.height = data["height"];
    }

}