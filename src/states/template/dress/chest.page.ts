import {GadgetMode, GameConfig, PublishMode} from '../../../config/game.config';
import {ChestItem} from './chest.item';
import {Chest} from './chest';
import {GuiUtils} from '../../../utils/gui.utils';
import {isNull} from 'util';
import {TweenUtils} from '../../../utils/tween.utils';
import {ChestCompoundItem} from './chest.compound.item';
import {AnimatedChestItem} from './chest.item.animated';
import {ChestItemBase} from './chest.item.base';
export class ChestPage {

    private instance: ChestPage = null;
    private owner: Chest = null;
    private game: Phaser.Game = null;
    private state: Phaser.State = null;
    public hideStatic: boolean;
    private container: Phaser.Group = null;
    private shelf: Phaser.Sprite[] = [];
    private items: Array<ChestItemBase> = [];
    private compoundItems: Array<ChestCompoundItem> = [];

    constructor(owner: Chest, state: Phaser.State, container: Phaser.Group, hideStatic: boolean) {
        this.instance = this;
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.state = state;
        this.container = this.game.add.group();
        this.hideStatic = hideStatic;
        container.add(this.container);
    }

    findItem(name: string): ChestItemBase {
        for (let item of this.items) {
            // console.log(item.name + ' - ' + name);
            if (item.name === name)
                return item;
        }
        for (let item of this.compoundItems) {
            if (item.name === name)
                return item;
        }
        return null;
    }
	
	findShelf(name: string): Phaser.Sprite {
		return this.shelf[name];
	}

    tryToSetVisibility(name: string): boolean {
        for (let item of this.items) {
            if (item.name === name) {
                /*if (visible) {
                    item.button.inputEnabled = false;
                    item.button.filters = null;
                    TweenUtils.fadeOut(item.button, Phaser.Timer.SECOND * .3);
                }
                else {
                    item.button.inputEnabled = true;
                    item.button.filters = null;
                    TweenUtils.fadeIn(item.button, Phaser.Timer.SECOND * .3);
                }*/
                item.button.inputEnabled = false;
                item.button.filters = null;
                TweenUtils.fadeOut(item.button, Phaser.Timer.SECOND * .3, 0, () => {
                    item.button.visible = false;
                }, this);
                return true;
            }
        }
        return false;
    }

    tryToSetLikeVisibility(name: string): void {
        for (let item of this.items) {
            if (item.name.indexOf(name) !== -1) {
                item.button.visible = true;
                item.button.inputEnabled = true;
                item.button.filters = null;
                TweenUtils.fadeIn(item.button, Phaser.Timer.SECOND * .3);
            }
        }
    }

    disable(): void {
        for (let item of this.items) {
            item.disable();
        }
    }

    enable(): void {
        for (let item of this.items) {
            item.enable();
        }
    }
	
	show(smooth: boolean = false): void {
        this.container.visible = true;
        if (smooth) {
        	this.container.alpha = 0;
        	TweenUtils.fadeIn(this.container, 500);
        }
    }
	
	hide(smooth: boolean = false): void {
    	/*if (smooth) {
    		TweenUtils.fadeOut(this.container, 500, 0, () => {
			    this.container.visible = false;
		    }, this);
	    }
        else {
		    this.container.visible = false;
	    }*/
		this.container.visible = false;
    }

    pageShelf(x: number, y: number, name: string, asset: string, frame?: any): ChestPage {
        const temp = this.game.add.sprite(x, y, asset, frame, this.container);
        temp.name = name;
    	this.shelf[name] = temp;
        return this.instance;
    }

    item(x: number, y: number, name: string, asset: string, frames?: any|any[],
                callback?: Function,
                overHandler: Function = GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverGlowHandler : null,
                outHandler: Function = GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutGlowHandler : null): ChestPage {

        this.items.push(new ChestItem(this.state, this.container, x, y, name, asset, frames, callback, overHandler, outHandler));
        return this.instance;
    }

    animatedItem(x: number, y: number, name: string, asset: string, frames?: any|any[], frameRate: number = 10, loop: boolean = true,
         callback?: Function,
         overHandler: Function = GuiUtils.addOverGlowHandler,
         outHandler: Function = GuiUtils.addOutGlowHandler): ChestPage {

        this.items.push(new AnimatedChestItem(this.state, this.container,
            x, y, name, asset, frames, frameRate, loop,
            callback, overHandler, outHandler));
        return this.instance;
    }

    compoundItem(length: number, showFrom: number, emptyState: number,
                 x: number, y: number, name: string, asset: string, frameClass: any, prefix: string,
                 callback?: Function,
                 overHandler: Function = GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverGlowHandler : null,
                 outHandler: Function = GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutGlowHandler : null): ChestPage {

        this.compoundItems.push(
            new ChestCompoundItem(this.state, this.container,
                length, showFrom, emptyState, x, y,
                name, asset, frameClass, prefix,
                callback, overHandler, outHandler));
        return this.instance;
    }

    build(): Chest {
        return this.owner;
    }

    dispose(): void {
        for (let item of this.items) {
            item.dispose();
        }
        for (let item of this.compoundItems) {
            item.dispose();
        }
	    for (let item of this.shelf) {
		    item.destroy(true);
	    }
        this.container.destroy(true);
    }
}