import {GadgetMode, GameConfig} from '../../../config/game.config';
import {GuiUtils} from '../../../utils/gui.utils';
import {ImageUtils} from '../../../utils/images/image.utils';
import {TweenUtils} from '../../../utils/tween.utils';
import {EffectUtils} from '../../../utils/effect.utils';

export class MatchCard {
	
	private game: Phaser.Game = null;
	private parent: Phaser.State = null;
	private container: Phaser.Group = null;
	private sprite: Phaser.Sprite = null;
	private button: Phaser.Button = null;
	private callback: Function = null;
	private isDone: boolean = false;
	
	constructor(parent: Phaser.State, container: Phaser.Group,
	            name: string, assetName: string, assetBackPrefix: string, assetPrefix: string,
	            x: number, y: number, callback: Function) {
		this.game = GameConfig.GAME;
		this.container = container;
		this.parent = parent;
		this.callback = callback;
		this.sprite = this.game.add.sprite(x, y,
			ImageUtils.getAtlasClass(assetName).getName(),
			ImageUtils.getAtlasClass(assetName).Frames[assetPrefix + name.substr(4)], this.container);
		GuiUtils.centrize(this.sprite);
		this.sprite.scale.setTo(0, 1);
		this.button = GuiUtils.makeButton(this, this.container, x - 10, y - 5, 1, name,
			ImageUtils.getAtlasClass(assetName).getName(),
			ImageUtils.getAtlasClass(assetName).Frames[assetBackPrefix],
			true, true, true,
			this.onClick,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addCustomOverHandler(0xff66cc, 1.05) : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
		);
		this.button.scale.setTo(0);
		this.button.alpha = 0;
	}
	
	public show(delay: number) {
		TweenUtils.fadeAndScaleIn(this.button, 400, delay);
	}
	
	public hide(delay: number) {
		if (this.sprite.scale.x !== 1) {
			TweenUtils.fadeAndScaleOut(this.button, 300, delay);
		}
		else {
			TweenUtils.fadeAndScaleOut(this.sprite, 300, delay);
		}
	}
	
	public getCenter(): Phaser.Point {
		return new Phaser.Point(this.button.x, this.button.y);
	}
	
	private onClick() {
		this.callback.call(this.parent, this);
	}
	
	public turnOn(): MatchCard {
		TweenUtils.flipX(this.button, 0, 300, 0, () => {
			this.button.scale.setTo(0, 1);
			this.button.filters = null;
			this.button.inputEnabled = false;
			TweenUtils.flipX(this.sprite, 1, 300, 0);
		}, this);
		return this;
	}
	
	public turnOff() {
		TweenUtils.flipX(this.sprite, 0, 300, 0, () => {
			this.button.inputEnabled = true;
			TweenUtils.flipX(this.button, 1, 300, 0);
		}, this);
	}
	
	public getName(): string {
		return this.button.name;
	}
	
	public glowSuccess() {
		this.isDone = true;
		this.sprite.filters = [EffectUtils.makeLightGlowAnimation(0x00ff00, 250, true, 1)];
		TweenUtils.fadeAndScaleOut(this.sprite, 500, 1000);
	}
	
	public isCompleted(): boolean {
		return this.isDone;
	}
	
	public glowFailure() {
		this.sprite.filters = [EffectUtils.makeLightGlowAnimation(0xff0000, 250, true, 1)];
	}
	
	public disable() {
		this.button.inputEnabled = false;
	}
	
	public enable() {
		this.button.inputEnabled = true;
	}
	
	public dispose() {
		this.sprite.destroy(true);
		this.button.destroy(true);
	}
}