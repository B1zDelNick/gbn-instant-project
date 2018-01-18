import {GameConfig} from '../../../config/game.config';
import {DecorBackground} from './decor.background';
import {TweenUtils} from '../../../utils/tween.utils';
import {isUndefined} from 'util';
import {EffectUtils} from '../../../utils/effect.utils';

export class DecorLayer {

    private owner: DecorBackground = null;
    private game: Phaser.Game = null;
    private container: Phaser.Group = null;
    private sprites: Phaser.Sprite[] = [];
    private current: number = -1;
    private emptySlotModifier: number = 0;

    constructor(owner: DecorBackground, container: Phaser.Group, allowEmpty: boolean = true) {
        this.owner = owner;
        this.game = GameConfig.GAME;
        this.container = container;
        this.emptySlotModifier = allowEmpty ? 0 : 1;
        // this.current = startFromFirst ? 0 : -1;
    }

    item(x: number, y: number, asset: string, frame?: any): DecorLayer {
        this.sprites.push(this.game.add.sprite(x, y, asset, frame, this.container));
        return this;
    }
	
	activeItem(x: number, y: number, asset: string, frame?: any): DecorLayer {
		const temp = this.game.add.sprite(x, y, asset, frame, this.container)
    	this.sprites.push(temp);
		temp.inputEnabled = true;
		temp.input.pixelPerfectClick = temp.input.pixelPerfectOver = true;
		temp.input.pixelPerfectAlpha = 10;
		temp.input.useHandCursor = true;
		temp.events.onInputUp.add(this.next, this);
		return this;
	}
	
	activeItemGlowing(x: number, y: number, color: number, asset: string, frame?: any): DecorLayer {
		const temp = this.game.add.sprite(x, y, asset, frame, this.container)
		this.sprites.push(temp);
		temp.inputEnabled = true;
		temp.input.pixelPerfectClick = temp.input.pixelPerfectOver = true;
		temp.input.pixelPerfectAlpha = 10;
		temp.input.useHandCursor = true;
		temp.events.onInputUp.add(this.next, this);
		temp.filters = [EffectUtils.makeGlowAnimation(color, 400)];
		return this;
	}

    next(): void {
        if (!isUndefined(this.sprites[this.current])) { // (this.current !== this.sprites.length - this.emptySlotModifier) {
	        this.sprites[this.current].filters = null;
	        this.game.tweens.removeFrom(this.sprites[this.current]);
            TweenUtils.fadeOut(this.sprites[this.current]);
        }

        this.current++;
        if (this.current > this.sprites.length - this.emptySlotModifier) this.current = 0;

        if (!isUndefined(this.sprites[this.current])) {
            TweenUtils.fadeIn(this.sprites[this.current]);
        }
    }

    getCurrent(): number {
        return this.current;
    }
    
    getByIndex(index: number): Phaser.Sprite {
    	return this.sprites[index];
    }

    build(): DecorBackground {
        for (let sp of this.sprites) {
            sp.alpha = 0;
        }
        if (this.emptySlotModifier === 1) {
            this.next();
        }
        /*if (this.emptySlotModifier === 1) {
            this.next();
        }
        else {
            this.current = this.sprites.length;
        }*/
        return this.owner;
    }

    dispose(): void {
        for (let sp of this.sprites) {
            sp.destroy(true);
        }
    }
}