import {GameConfig} from '../../../config/game.config';
import {ImageUtils} from '../../../utils/images/image.utils';
import {GuiUtils} from '../../../utils/gui.utils';
import {TweenUtils} from '../../../utils/tween.utils';
import {EffectUtils} from '../../../utils/effect.utils';
export class DotJoiner {
	
	private parent: Phaser.State = null;
	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private lines: Phaser.Graphics = null;
	private base: Phaser.Sprite = null;
	private dots: Phaser.Button[] = [];
	private successCallback: Function = null;
	private asset: string;
	private frameReady: string;
	private frameDone: string;
	private current: number = 0;
	
	constructor(asset: string, frameReady: string, frameDone: string) {
		this.game = GameConfig.GAME;
		this.container = this.game.add.group();
		this.asset = asset;
		this.frameReady = frameReady;
		this.frameDone = frameDone;
	}
	
	public setListener(callback: Function, context: any): DotJoiner {
		this.successCallback = callback;
		this.parent = context;
		return this;
	}
	
	public bg(x: number, y: number, asset: string, frame: string): DotJoiner {
		this.base = this.game.add.sprite(x, y,
			ImageUtils.getAtlasClass(asset).getName(),
			ImageUtils.getAtlasClass(asset).Frames[frame],
			this.container
		);
		// for better view performance
		this.lines = this.game.add.graphics(0, 0, this.container);
		this.lines.lineStyle(4, 0, 1);
		this.base.alpha = 0;
		return this;
	}
	
	public dot(x: number, y: number, order: number): DotJoiner {
		const temp = GuiUtils.makeButton(this, this.container, x, y, 1, 'dot' + order,
			ImageUtils.getAtlasClass(this.asset).getName(),
			ImageUtils.getAtlasClass(this.asset).Frames[this.frameReady],
			true, true, true,
			this.onDotClick, null, null
		);
		temp.scale.setTo(0);
		temp.alpha = 0;
		this.dots.push(temp);
		return this;
	}
	
	private onDotClick(sprite: Phaser.Button) {
		if (sprite.name === 'dot' + (this.current)) {
			TweenUtils.kill(sprite.scale);
			sprite.scale.setTo(1);
			sprite.inputEnabled = false;
			sprite.loadTexture(
				ImageUtils.getAtlasClass(this.asset).getName(),
				ImageUtils.getAtlasClass(this.asset).Frames[this.frameDone]);
			sprite.filters = [EffectUtils.makeGlowAnimation(0xffff99, 250, true, 2)];
			if (this.current !== 1) {
				for (let d of this.dots) {
					if (d.name === 'dot' + (this.current - 1)) {
						console.log(d);
						this.lines.moveTo(d.x, d.y);
						this.lines.lineTo(sprite.x, sprite.y);
						this.lines.endFill();
						break;
					}
				}
			}
			else {
				console.log('!@#');
				this.lines.moveTo(sprite.x, sprite.y);
				this.lines.lineTo(sprite.x, sprite.y);
				this.lines.endFill();
			}
			if (this.current === this.dots.length) {
				TweenUtils.delayedCall(1000, this.successCallback, this.parent);
				return;
			}
			this.current++;
			for (let d of this.dots) {
				if (d.name === 'dot' + (this.current)) {
					TweenUtils.fadeAndScaleIn(d, 500, 0, () => {
						EffectUtils.makeScaleAnimation(d, 1.1, 300);
					}, this);
					break;
				}
			}
		}
	}
	
	public start() {
		for (let d of this.dots) {
			if (d.name === 'dot1') {
				this.current = 1;
				TweenUtils.fadeIn(this.base);
				TweenUtils.fadeAndScaleIn(d, 500, 500, () => {
					EffectUtils.makeScaleAnimation(d, 1.1, 300);
				}, this);
				break;
			}
		}
	}
	
	public reset() {
		this.lines.clear();
		this.lines.lineStyle(4, 0, 1);
		for (let b of this.dots) {
			TweenUtils.fadeAndScaleOut(b, 250, 0, () => {
				b.loadTexture(
					ImageUtils.getAtlasClass(this.asset).getName(),
					ImageUtils.getAtlasClass(this.asset).Frames[this.frameReady]);
				b.inputEnabled = true;
			}, this);
		}
		this.current = 0;
		TweenUtils.fadeOut(this.base, 250, 250);
	}
	
	public dispose() {
		for (let b of this.dots) {
			b.destroy(true);
		}
		if (this.base) this.base.destroy(true);
		if (this.lines) this.lines.destroy(true);
		this.container.destroy(true);
		this.successCallback = null;
	}
}