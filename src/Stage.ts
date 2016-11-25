import Scene from "./Scene";

export default class Stage {

    private scenes: { [id: string]: Scene };
    private currentScene: Scene;

    private container: HTMLElement;
    private stageElement: HTMLElement;
    private stageScrollElement: HTMLElement;
    private stageScrollPaddingElement: HTMLElement;

    private scrollY: number;
    private scrollLock: boolean;

    constructor(container: HTMLElement, data: any) {
        this.container = container;

        this.stageElement = document.createElement("div");
        this.stageElement.className = "stage";

        this.stageScrollElement = document.createElement("div");
        this.stageScrollElement.className = "stage-scroll";

        this.stageScrollPaddingElement = document.createElement("div");
        this.stageScrollPaddingElement.className = "stage-scroll-padding";

        this.stageScrollElement.appendChild(this.stageScrollPaddingElement);
        this.container.appendChild(this.stageScrollElement);
        this.container.appendChild(this.stageElement);

        this.scenes = {};
        for (var i in data["scenes"]) {
            this.scenes[data["scenes"][i]["id"]] = new Scene(this, data["scenes"][i]);
        }
    }

    public loadScene(id: string): void {
        if (!this.scenes[id]) {
            throw "Scene not found.";
        }
        var scene: Scene = this.scenes[id];
        if (scene) {
            this.currentScene = scene;
            this.currentScene.load();
            this.attachScrollListener();
        }
    }

    private attachScrollListener(): void {
        var self: Stage = this;

        this.stageScrollElement.addEventListener('scroll', function (e) {
            self.scrollY = self.stageScrollElement.scrollTop;
            if (!self.scrollLock) {
                window.requestAnimationFrame(function () {
                    self.currentScene.setFrame(self.scrollY);
                    self.scrollLock = false;
                });
                self.scrollLock = true;
            }
        });

        self.stageScrollPaddingElement.style.height = self.stageScrollElement.style.height + self.currentScene.getMaxFrames() + "px";
    }

    public getStageElement(): HTMLElement {
        return this.stageElement;
    }

    public getCurrentScene(): Scene {
        return this.currentScene;
    }

}