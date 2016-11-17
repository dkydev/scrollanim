import Stage from "./Stage";
import * as $ from "jquery";

declare var window: { stage: Stage };

$.get("content/data.json").done((data: string) => {
    window.stage = new Stage($("#stage").get(0), data);
    window.stage.loadScene("scene_1");
    $("#stage-scroll").scroll((e) => {
        window.stage.getCurrentScene().setFrame($("#stage-scroll").scrollTop());
        $("#info").html(window.stage.getCurrentScene().getCurrentFrame().toString());
    }).resize((e) => {
        $("#stage-scroll-beef").height($("#stage-container").height() + window.stage.getCurrentScene().getMaxFrames());
    }).trigger("resize");
});



