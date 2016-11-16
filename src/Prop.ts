import Keyframe from "./Keyframe";

export default class Prop {

    public id: string;
    public src: string;


    private element: Element;
    private container: Element;
    private currentFrame: number;
    private keyframes: Keyframe[];

    private width: number;
    private height: number;

    private x: number;
    private y: number;
    private z: number;

    constructor(data: any, container: Element) {
        this.id = data["id"];
        this.src = data["src"];
        this.z = data["z"];

        this.keyframes = [];
        for (var i in data["keyframes"]) {
            this.keyframes.push(new Keyframe(data["keyframes"][i]));
        }
        console.log(this.keyframes);

        // Sort frames.
        this.keyframes.sort((a: Keyframe, b: Keyframe): number => {
            return a.start > b.start ? 1 : -1;
        })

        this.element = $("<img>").attr("id", this.id).attr("src", this.src).get(0);
        this.container = container;
    }

    public setFrame(frame: number): void {

        this.currentFrame = frame;

        var lastKeyFrame: Keyframe = null;
        var nextKeyFrame: Keyframe = null;

        for (var i: number = 0; i < this.keyframes.length; i++) {
            if (this.keyframes[i].start <= frame && this.keyframes[i].end >= frame) {
                lastKeyFrame = this.keyframes[i];
                if (this.keyframes[i + 1]) {
                    nextKeyFrame = this.keyframes[i + 1];
                }
                break;
            }
        }

        if (!lastKeyFrame) {
            this.detach();
            return;
        }

        var position: number;
        if (nextKeyFrame) {
            position = (this.currentFrame - lastKeyFrame.start) / (nextKeyFrame.start - lastKeyFrame.start);
        } else {
            position = 1;
        }

        this.attach();
        this.render(position, lastKeyFrame, nextKeyFrame);
    }

    public getMaxFrames(): number {
        if (this.keyframes.length > 0) {
            return this.keyframes[this.keyframes.length - 1].end;
        } else {
            return 0;
        }
    }

    public attach(): void {
        $(this.container).append(this.element);
    }

    public detach(): void {
        $(this.element).detach();
    }

    public render(position: number, start: Keyframe, end: Keyframe): void {

        if (!end) {
            end = start;
        }

        if (start.width) {
            this.width = (end.width - start.width) * position + start.width;
        }
        if (start.height) {
            this.height = (end.height - start.height) * position + start.height;
        }

        this.x = (end.x - start.x) * position + start.x;
        this.y = (end.y - start.y) * position + start.y;

        $(this.element).css({
            "position": "fixed",
            "width": this.width ? this.width + "px" : "auto",
            "height": this.height ? this.height + "px" : "auto",
            "left": this.x + "px",
            "top": this.y + "px",
            "z-index": this.z
        });
    }

}