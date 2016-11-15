import Stage from "./Stage";
import * as $ from "jquery";

declare var window: { stage: Stage };

$.get("content/data.json").done((data: string) => {
    window.stage = new Stage($("#stage").get(0), data);
    window.stage.loadScene("scene_1");
    $(window).scroll((e) => {
        window.stage.getCurrentScene().setFrame($(window).scrollTop());
    }).resize((e) => {
        $(window.stage.getContainer()).height($(window).height() + window.stage.getCurrentScene().getMaxFrames());
    }).trigger("resize");
});



