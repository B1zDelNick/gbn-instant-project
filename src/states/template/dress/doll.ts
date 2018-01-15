import {GameConfig} from '../../../config/game.config';

import {DollLayer} from './doll.layer';
import {TweenUtils} from '../../../utils/tween.utils';
import {isNull, isUndefined} from 'util';

export class Doll {

    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private layers: Array<DollLayer> = [];
    private eyes: DollLayer = null;
    private lips: DollLayer = null;
    private flash: DollLayer = null;
    private eyesIndex: number = 0;
    private eyesAnimate: boolean = false;
    private lipsIndex: number = 0;
	private lipsAnimate: boolean = false;
	private flashIndex: number = 0;
	private flashAnimate: boolean = false;
    private dependencies: Map<string, string> = new Map();

    constructor(state: Phaser.State, x: number, y: number, scaleX: number = 1, scaleY: number = -1) {
        this.game = GameConfig.GAME;

        this.container = this.game.add.group();
        this.container.x = x;
        this.container.y = y;
        this.container.scale.setTo(scaleX, scaleY === -1 ? scaleX : scaleY);
    }

    hide(force: boolean = false) {
        TweenUtils.fadeOut(this.container, force ? 1 : 500);
    }

    show(force: boolean = false) {
        TweenUtils.fadeIn(this.container, force ? 1 : 500);
    }

    layer(x: number, y: number, name: string, assetClass: string, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[], dependsOn?: string[]): Doll {
        this.layers[name] = new DollLayer(this.container, x, y, assetClass, prefix, defaultFrame, removable, strictIndexes);
        if (dependsOn) {
            for (let dep of dependsOn) {
                this.dependencies.set(dep, name);
            }
        }
        return this;
    }
	
	eyesL(x: number, y: number, name: string, assetClass: string, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[], dependsOn?: string[]): Doll {
		this.eyes = new DollLayer(this.container, x, y, assetClass, prefix, defaultFrame, removable, strictIndexes);
		this.eyesAnimate = true;
		this.animateEyes();
		return this;
	}

    flashL(x: number, y: number, name: string, assetClass: string, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[], dependsOn?: string[]): Doll {
        this.flash = new DollLayer(this.container, x, y, assetClass, prefix, defaultFrame, removable, strictIndexes);
        this.flashAnimate = true;
        this.animateFlash();
        return this;
    }
	
	lipsL(x: number, y: number, name: string, assetClass: string, prefix?: string, defaultFrame?: string, removable: boolean = false, strictIndexes?: number[], dependsOn?: string[]): Doll {
		this.lips = new DollLayer(this.container, x, y, assetClass, prefix, defaultFrame, removable, strictIndexes);
		this.lipsAnimate = true;
		this.animateLips();
		return this;
	}
	
	animateFlash() {
		if (this.flash === null || !this.flashAnimate) return;
		this.flashIndex++;
		if (this.flashIndex > 3) this.flashIndex = 1;
		this.flash.operate(this.flashIndex);
		TweenUtils.delayedCall(150, this.animateFlash, this);
	}
	
	stopFlash() {
		this.flashAnimate = false;
		this.flash.operate(1);
		this.flash.getBody().visible = false;
	}
	
	animateEyes() {
    	if (this.eyes === null || !this.eyesAnimate) return;
    	this.eyesIndex++;
    	if (this.eyesIndex > 3) this.eyesIndex = 1;
    	this.eyes.operate(this.eyesIndex);
    	if (this.eyesIndex === 1) {
    		TweenUtils.delayedCall(this.game.rnd.between(4000, 6000), this.animateEyes, this);
	    }
	    else {
		    TweenUtils.delayedCall(200, this.animateEyes, this);
	    }
	}
	
	stopEyes() {
		this.eyesAnimate = false;
		this.eyes.operate(1);
	}
	
	animateLips() {
		if (this.lips === null || !this.lipsAnimate) return;
    	this.lipsIndex++;
		if (this.lipsIndex > 2) this.lipsIndex = 1;
		this.lips.operate(this.lipsIndex);
		if (this.lipsIndex === 1) {
			TweenUtils.delayedCall(this.game.rnd.between(2500, 4000), this.animateLips, this);
		}
		else {
			TweenUtils.delayedCall(this.game.rnd.between(1000, 2500), this.animateLips, this);
		}
	}
	
	stopLips() {
		this.lipsAnimate = false;
		this.lips.operate(2);
	}

    on(item: string, index: number, ...off: string[]): boolean {
        for (let toOff of off) {
            if (this.layers[toOff])
                this.layers[toOff].operate(-1);
        }
        if (!this.layers[item]) return false;
        const result = this.layers[item].operate(index);
        /*let dep: string;
        let depIndex: number = -1;
        if (this.dependencies.get(item).indexOf('_') !== -1) {
            dep = this.dependencies.get(item).split('_')[0];
            depIndex = parseInt(this.dependencies.get(item).split('_')[1]);
        }
        else {
            dep = this.dependencies.get(item);
        }
        console.log(dep);*/
        if (this.dependencies.has(item)) {
            if (this.layers[item].isEmpty) {
                this.layers[this.dependencies.get(item)].setSecondaryState(false);
            }
            else {
                this.layers[this.dependencies.get(item)].setSecondaryState(true);
            }
        }
        else if (this.dependencies.has(`${item}_${index}`)) {
            if (this.layers[item].isEmpty) {
                this.layers[this.dependencies.get(`${item}_${index}`)].setSecondaryState(false);
            }
            else {
                this.layers[this.dependencies.get(`${item}_${index}`)].setSecondaryState(true);
            }
        }
        else if (this.hasLike(item, index)) {
            this.clearLayerByDependency(item);
        }
        return result;
    }

    public isLayerEmpty(name: string): boolean {
        // if (!this.layers[name]) return true;
        return this.layers[name].getEmpty();
    }

    clearLayerByDependency(name: string) {
        for (let key of this.dependencies.keys()) {
            if (key.indexOf(name) !== -1) {
                this.layers[this.dependencies.get(key)].setSecondaryState(false);
            }
        }
    }

    hasLike(name: string, index: number): boolean {
        for (let key of this.dependencies.keys()) {
            if ((key.indexOf(name) !== -1) && (key !== `${name}_${index}`)) {
                return true;
            }
        }
        return false;
    }

    off(item: string): void {
        this.layers[item].remove();
    }

    setListeners(context: any, callback: Function, overHandler?: Function, outHandler?: Function): Doll {
        this.container.inputEnableChildren = true;
        this.container.onChildInputDown.add(callback, context);
        if (overHandler) this.container.onChildInputOver.add(overHandler, context);
        if (outHandler) this.container.onChildInputOut.add(outHandler, context);
        return this;
    }

    disableListeners(): Doll {
        this.container.inputEnableChildren = false;
        for (let sp of this.container.children) {
            if (sp instanceof Phaser.Sprite) {
                (sp as Phaser.Sprite).inputEnabled = false;
            }
        }
        return this;
    }

    enableListeners(): Doll {
        this.container.inputEnableChildren = true;
        for (let sp of this.container.children) {
            if (sp instanceof Phaser.Sprite) {
                (sp as Phaser.Sprite).inputEnabled = true;
            }
        }
        return this;
    }

    setPosition(x: number, y: number): void {
        this.container.position.setTo(x, y);
    }

    setScale(val: number, val2?: number): void {
        if (isUndefined(val2) || isNull(val2))
            this.container.scale.setTo(val);
        else
            this.container.scale.setTo(val, val2);
    }

    setAlpha(val: number): void {
        this.container.alpha = val;
    }

    setAngle(val: number): void {
        this.container.angle = val;
    }

    getBody(): Phaser.Group {
        return this.container;
    }
    
    getLayerSprite(layerName: string): Phaser.Sprite {
    	return this.layers[layerName].getBody();
    }
    
    fadeLayer(name: string, instantly: boolean = false) {
	    const lr: DollLayer = this.layers[name];
	    if (instantly) {
	    	lr.getBody().alpha = 0;
	    }
	    else {
		    TweenUtils.fadeOut(lr.getBody());
	    }
    }
	
	appearLayer(name: string, instantly: boolean = false) {
		const lr: DollLayer = this.layers[name];
		if (instantly) {
			lr.getBody().alpha = 1;
		}
		else {
			TweenUtils.fadeIn(lr.getBody());
		}
	}

    extract(): Doll {
        this.container.parent.removeChild(this.container);
        this.game.add.existing(this.container);
        this.game.world.remove(this.container);
        return this;
    }

    insert(): Doll {
        this.game.add.existing(this.container);
        return this;
    }

    dispose(): void {
        for (let layer of this.layers) {
            layer.dispose();
        }
        if (this.eyes) {
        	this.eyes.dispose();
        	this.eyes = null;
        }
	    if (this.lips) {
		    this.lips.dispose();
		    this.lips = null;
	    }
        this.container.destroy(true);
    }
}