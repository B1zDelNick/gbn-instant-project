import {GameConfig} from '../../config/game.config';
import {ImageUtils} from '../../utils/images/image.utils';

export class ProgressBar {
	
	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private frame: Phaser.Sprite = null;
	private bar: Phaser.Sprite = null;
	private mask: Phaser.Graphics = null;
	private sprites: Phaser.Sprite[] = [];
	private value: number = 0;
	
	constructor(x: number = 0, y: number = 0) {
		this.game = GameConfig.GAME;
		this.container = this.game.add.group();
		this.container.position.set(x, y);
	}
	
	public addSprite(x: number, y: number, asset: string, frame: string): ProgressBar {
		const temp = this.game.add.sprite(x, y,
			ImageUtils.getAtlasClass(asset).getName(),
			ImageUtils.getAtlasClass(asset).Frames[frame],
			this.container
		);
		this.sprites.push(temp);
		return this;
	}
	
	public addFrame(x: number, y: number, asset: string, frame: string): ProgressBar {
		this.frame = this.game.add.sprite(x, y,
			ImageUtils.getAtlasClass(asset).getName(),
			ImageUtils.getAtlasClass(asset).Frames[frame],
			this.container
		);
		return this;
	}
	
	public addBar(x: number, y: number, asset: string, frame: string, percent: number = .01): ProgressBar {
		this.bar = this.game.add.sprite(x, y,
			ImageUtils.getAtlasClass(asset).getName(),
			ImageUtils.getAtlasClass(asset).Frames[frame],
			this.container
		);
		this.mask = this.game.add.graphics(x, y, this.container);
		this.mask.beginFill(0);
		this.mask.drawRect(0, 0, this.bar.width, this.bar.height);
		this.mask.endFill();
		this.value = percent;
		this.mask.scale.x = this.value;
		this.bar.mask = this.mask;
		return this;
	}
	
	public setValue(val: number) {
		this.value = val;
		if (this.value < .01) this.value = .01;
		if (this.value > 1) this.value = 1;
		this.mask.scale.x = this.value;
	}
	
	public getBody(): Phaser.Group {
		return this.container;
	}
	
	public dispose() {
		for (let s of this.sprites) {
			s.destroy(true);
		}
		this.mask.destroy(true);
		this.bar.destroy(true);
		this.frame.destroy(true);
		this.container.destroy(true);
	}
}