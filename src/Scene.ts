import Stage from "./Stage";
import Prop from "./Prop";

export default class Scene {

    private props: { [id: string]: Prop };
    private stage: Stage;
    private id: string;

    private maxFrames: number;
    private keyFrames: any[];

    private currentFrame: number;

    private lastKeyFrame: any;
    private nextKeyFrame: any;

    constructor(stage: Stage, data: any) {
        this.stage = stage;
        this.id = data["id"];
        this.keyFrames = data["key_frames"];

        // Sort frames.
        this.keyFrames.sort((a: any, b: any) => {
            return a.start > b.start ? 1 : -1;
        });

        // Set max frames.
        this.maxFrames = this.keyFrames[this.keyFrames.length - 1].end;

        this.props = {};
        for (var id in data["props"]) {
            this.props[id] = new Prop(id, data["props"][id].src, data["props"][id].z, this.stage.getContainer());
        }
    }

    public load(): void {
        this.setFrame(0);
    }

    public getMaxFrames(): number {
        return this.maxFrames;
    }

    public setFrame(frame: number): void {
        this.currentFrame = frame;

        this.lastKeyFrame = null;
        this.nextKeyFrame = null;
        for (var i: number = 0; i < this.keyFrames.length; i++) {
            if (this.keyFrames[i].start <= frame && this.keyFrames[i].end >= frame) {
                this.lastKeyFrame = this.keyFrames[i];
                if (this.keyFrames[i + 1]) {
                    this.nextKeyFrame = this.keyFrames[i + 1];
                }
                break;
            }
        }
        if (!this.lastKeyFrame) {
            throw new Error("No key frame.");
        }

        var position: number;
        if (this.nextKeyFrame) {
            position = (this.currentFrame - this.lastKeyFrame.start) / (this.nextKeyFrame.start - this.lastKeyFrame.start);
        } else {
            position = 1;
        }

        for (var id in this.props) {
            if (!this.lastKeyFrame["props"][id]) {
                this.props[id].detach();
            } else {
                this.props[id].attach();
                if (this.nextKeyFrame && this.nextKeyFrame["props"][id]) {
                    this.props[id].render(position, this.lastKeyFrame["props"][id], this.nextKeyFrame["props"][id]);
                } else {
                    this.props[id].render(position, this.lastKeyFrame["props"][id], null);
                }
                this.props[id].attach();
            }

        }
    }

}