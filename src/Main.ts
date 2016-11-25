import Stage from "./Stage";
import * as $ from "jquery";

declare var window: { stage: Stage };

$.get("content/data.json").done((data: string) => {
    window.stage = new Stage(document.getElementById("stage-container"), data);
    window.stage.loadScene("scene_1");
});



