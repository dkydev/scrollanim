import Scene from "./Scene";

export default class Stage {

    private data: any;
    private container: Element;
    private currentScene: Scene;

    constructor(container: Element, data: Object) {
        this.container = container;
        this.data = data;
    }

    public loadScene(id: string): void {
        var scene: Scene = this.getScene(id);
        if (scene) {
            this.currentScene = scene;
            this.currentScene.load();
        }
    }

    public getContainer(): Element {
        return this.container;
    }

    public getCurrentScene(): Scene {
        return this.currentScene;
    }

    private getScene(id: string): Scene | null {
        var sceneData: Object = this.data["scenes"].filter(function (scene: any) {
            return scene["id"] = id;
        }).pop();

        if (sceneData) {
            return new Scene(this, sceneData);
        } else {
            return null;
        }

    }

}