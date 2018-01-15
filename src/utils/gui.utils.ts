import {FilterUtils} from './filter.utils';
import {GameConfig} from '../config/game.config';
import {isString} from 'util';

export class GuiUtils {

    public static centrize(target: any): void {
        target.anchor.set(0.5);
        target.x = target.x + target.width / 2;
        target.y = target.y + target.height / 2;
    }
	
	public static centrizeCustom(target: any, x: number, y: number): void {
		target.anchor.setTo(x, y);
		target.x = target.x + target.width * x;
		target.y = target.y + target.height * y;
	}

    public static makeButton(
        parent: any, container: Phaser.Group,
        x: number, y: number, scale: number = 1,
        name: string = '', res: string = '', states: any|any[] = [0, 0, 0],
        enabled: boolean = true, perfect: boolean = false, visible: boolean = true,
        clickHandler: Function = null, overHandler: Function = null, outHandler: Function = null, downHandler: Function = null, upHandler: Function = null): Phaser.Button {

        if (states == null) {
            states = [0, 0, 0];
        }
        else if (isString(states)) {
            states = [states, states, states];
        }

        let tempItem = parent.game.add.button(0, 0, res, null, parent, states[0], states[1], states[2]);

        tempItem.name = name;
        tempItem.anchor.set(0.5);
        tempItem.inputEnabled = true;

        if (perfect)
            tempItem.input.pixelPerfectClick = tempItem.input.pixelPerfectOver = perfect;
        if (perfect)
            tempItem.input.pixelPerfectAlpha = 10;
        if (perfect)
            tempItem.input.useHandCursor = true;

        tempItem.inputEnabled = enabled;

        if (clickHandler != null)
            tempItem.events.onInputUp.add(clickHandler, parent);
        if (overHandler != null)
            tempItem.events.onInputOver.add(overHandler, parent);
        if (outHandler != null)
            tempItem.events.onInputOut.add(outHandler, parent);
        if (downHandler != null)
            tempItem.events.onInputDown.add(downHandler, parent);
        if (upHandler != null)
            tempItem.events.onInputUp.add(upHandler, parent);

        if (scale)
            tempItem.scale.setTo(scale);

        tempItem.visible = visible;
        tempItem.x = x + tempItem.width / 2;
        tempItem.y = y + tempItem.height / 2;

        container.addChild(tempItem);

        return tempItem;
    }

    public static makeSpritesheetButton(
        parent: any, container: Phaser.Group,
        x: number, y: number, scale: number = 1, frameRate: number = 10, loop: boolean = true,
        name: string = '', sheet: string = '', frames: any[] = null,
        enabled: boolean = true, perfect: boolean = false, visible: boolean = true,
        clickHandler: Function = null, overHandler: Function = null, outHandler: Function = null, downHandler: Function = null, upHandler: Function = null): Phaser.Sprite {

        let tempItem: Phaser.Sprite = parent.game.add.sprite(0, 0, sheet);
        tempItem.animations.add('butAnim', frames);
        tempItem.animations.play('butAnim', frameRate, loop);

        tempItem.name = name;
        tempItem.anchor.set(0.5);
        tempItem.inputEnabled = true;

        if (perfect)
            tempItem.input.pixelPerfectClick = tempItem.input.pixelPerfectOver = perfect;
        if (perfect)
            tempItem.input.pixelPerfectAlpha = 10;
        if (perfect)
            tempItem.input.useHandCursor = true;

        tempItem.inputEnabled = enabled;

        if (clickHandler != null)
            tempItem.events.onInputUp.add(clickHandler, parent);
        if (overHandler != null)
            tempItem.events.onInputOver.add(overHandler, parent);
        if (outHandler != null)
            tempItem.events.onInputOut.add(outHandler, parent);
        if (downHandler != null)
            tempItem.events.onInputDown.add(downHandler, parent);
        if (upHandler != null)
            tempItem.events.onInputUp.add(upHandler, parent);

        if (scale)
            tempItem.scale.setTo(scale);

        tempItem.visible = visible;
        tempItem.x = x + tempItem.width / 2;
        tempItem.y = y + tempItem.height / 2;

        container.addChild(tempItem);

        return tempItem;
    }

    public static addOverHandlerMcg(sprite) {
        const game = GameConfig.GAME;
        sprite.filters = [FilterUtils.makeFilter()];
        const _tween1 = game.add.tween(sprite).to({ angle: 10 }, 400, Phaser.Easing.Linear.None, true);
        const _tween2 = game.add.tween(sprite).to({ angle: -10 }, 800, Phaser.Easing.Linear.None, false);
        const _tween3 = game.add.tween(sprite).to({ angle: 0 }, 400, Phaser.Easing.Linear.None, false);
        _tween1.chain(_tween2);
        _tween2.chain(_tween3);
        _tween3.chain(_tween1);
    }

    public static addOutHandlerMcg(sprite) {
        sprite.filters = null;
        GameConfig.GAME.tweens.removeFrom(sprite);
        sprite.angle = 0;
    }

    public static addOverHandler(sprite) {
        sprite.filters = [FilterUtils.makeFilter()];
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: 1.03, y: 1.03 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addOutHandler(sprite) {
        sprite.filters = null;
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addCustomOverHandler(color: number = 0xffffff, scaleX: number = 1.03, scaleY?: number): Function {
        return (sprite) => {
            sprite.filters = [FilterUtils.makeFilter(color)];
            GameConfig.GAME.tweens.removeFrom(sprite.scale);
            GameConfig.GAME.add.tween(sprite.scale).to({ x: scaleX, y: scaleY == null ? scaleX : scaleY }, 250, Phaser.Easing.Linear.None, true);
        };
    }

    public static addCustomOutHandler(scaleX: number = 1, scaleY?: number): Function {
        return (sprite) => {
            sprite.filters = null;
            GameConfig.GAME.tweens.removeFrom(sprite.scale);
            GameConfig.GAME.add.tween(sprite.scale).to({ x: scaleX, y: scaleY == null ? scaleX : scaleY }, 250, Phaser.Easing.Linear.None, true);
        };
    }

    public static addOverScaleHandler(sprite) {
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: 1.03, y: 1.03 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addOutScaleHandler(sprite) {
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addCustomOverScaleHandler(scaleX: number = 1.03, scaleY?: number): Function {
        return (sprite) => {
            GameConfig.GAME.tweens.removeFrom(sprite.scale);
            GameConfig.GAME.add.tween(sprite.scale).to({ x: scaleX, y: scaleY == null ? scaleX : scaleY }, 250, Phaser.Easing.Linear.None, true);
        };
    }

    public static addCustomOutScaleHandler(scaleX: number = 1, scaleY?: number): Function {
        return (sprite) => {
            GameConfig.GAME.tweens.removeFrom(sprite.scale);
            GameConfig.GAME.add.tween(sprite.scale).to({ x: scaleX, y: scaleY == null ? scaleX : scaleY }, 250, Phaser.Easing.Linear.None, true);
        };
    }

    public static addOverGlowHandler(sprite) {
        sprite.filters = [FilterUtils.makeFilter()];
    }

    public static addOutGlowHandler(sprite) {
        sprite.filters = null;
    }

    public static addCustomOverGlowHandler(color: number = 0xffffff): Function {
        return (sprite) => {
            sprite.filters = [FilterUtils.makeFilter(color)];
        };
    }

    public static addOverGlowParentHandler(sprite) {
        sprite.parent.filters = [FilterUtils.makeFilter()];
    }

    public static addOutGlowParentHandler(sprite) {
        sprite.parent.filters = null;
    }

    public static addCustomOverGlowParentHandler(color: number = 0xffffff): Function {
        return (sprite) => {
            sprite.parent.filters = [FilterUtils.makeFilter(color)];
        };
    }

    public static addOverHandlerFgc(sprite) {
        sprite.filters = [FilterUtils.makeFilter()];
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: .82, y: .82 }, 250, Phaser.Easing.Linear.None, true);
    }

    public static addOutHandlerFgc(sprite) {
        sprite.filters = null;
        GameConfig.GAME.tweens.removeFrom(sprite.scale);
        GameConfig.GAME.add.tween(sprite.scale).to({ x: .8, y: .8 }, 250, Phaser.Easing.Linear.None, true);
    }
}
