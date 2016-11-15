export default class Prop {

    public id: string;
    public src: string;

    private element: Element;
    private container: Element;

    private width: number;
    private height: number;

    private x: number;
    private y: number;
    private z: number;

    constructor(id:string, src: string, z:number, container: Element) {
        this.id = id;
        this.src = src;
        this.z = z;

        this.element = $("<img>").attr("id", this.id).attr("src", this.src).get(0);
        this.container = container;
    }

    public attach(): void {
        $(this.container).append(this.element);
    }

    public detach(): void {
        $(this.element).detach();
    }

    public render(position: number, startData: any, endData: any): void {

        if (!endData) {
            endData = startData;
        }

        if (startData["width"]) {
            this.width = (endData["width"] - startData["width"]) * position + startData["width"];
        }
        if (startData["height"]) {
            this.height = (endData["height"] - startData["height"]) * position + startData["height"];
        }

        this.x = (endData["x"] - startData["x"]) * position + startData["x"];
        this.y = (endData["y"] - startData["y"]) * position + startData["y"];

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