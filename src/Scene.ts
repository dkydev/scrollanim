import Stage from "./Stage";
import Prop from "./Prop";

export default class Scene {

    private props: { [id: string]: Prop };
    private stage: Stage;
    private id: string;

    private maxFrames: number;

    private currentFrame: number;

    private lastKeyFrame: any;
    private nextKeyFrame: any;

    constructor(stage: Stage, data: any) {
        this.stage = stage;
        this.id = data["id"];

        this.maxFrames = 0;
        this.props = {};
        for (var i in data["props"]) {
            var propData = data["props"][i];
            this.props[propData["id"]] = new Prop(propData, this.stage.getStageElement());
            // Find max frames.
            this.maxFrames = Math.max(this.maxFrames, this.props[propData["id"]].getMaxFrames());
        }
    }

    public load(): void {
        this.setFrame(0);
    }

    public getCurrentFrame():number {
        return this.currentFrame;
    }
    public getMaxFrames(): number {
        return this.maxFrames;
    }

    public setFrame(frame: number): void {
        this.currentFrame = frame;

        for (var id in this.props) {
            this.props[id].setFrame(this.currentFrame);
        }
    }

}