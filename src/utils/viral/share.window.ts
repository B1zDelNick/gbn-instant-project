import {GadgetMode, GameConfig} from '../../config/game.config';
import {ImageUtils} from '../images/image.utils';
import {GuiUtils} from '../gui.utils';
import {TweenUtils} from '../tween.utils';

export class ShareWindow {

	private game: Phaser.Game = null;
	private container: Phaser.Group = null;
	private screenShot: Phaser.Image = null;
	private mask: Phaser.Graphics = null;
	private panel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private vkBtn: Phaser.Button = null;
	private fbBtn: Phaser.Button = null;
	private onShareHandler: Function = null;
	private parent: any = null;

	constructor() {
		this.game = GameConfig.GAME;
		this.container = this.game.add.group();
		this.mask = this.game.add.graphics(46, 211, this.container);
		this.mask.beginFill(0);
		this.mask.drawRect(0, 0, 445, 478);
		this.mask.alpha = 0;
		this.panel = this.game.add.sprite(28, 191,
			ImageUtils.getAtlasClass('AtlasesVirals').getName(),
			ImageUtils.getAtlasClass('AtlasesVirals').Frames.SharePanel,
			this.container
		);
		this.label = this.game.add.sprite(28, 191,
			ImageUtils.getAtlasClass('AtlasesVirals').getName(),
			ImageUtils.getAtlasClass('AtlasesVirals').Frames['Share' + GameConfig.LOCALE],
			this.container
		);
		this.label.anchor.setTo(0.5);
		GuiUtils.centrize(this.label);
		this.label.position.setTo(271, 654);
		this.vkBtn = GuiUtils.makeButton(this, this.container, 127, 704, 1, '',
			ImageUtils.getAtlasClass('AtlasesVirals').getName(),
			ImageUtils.getAtlasClass('AtlasesVirals').Frames.VkBtn,
			true, false, true,
			this.onVkShare,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
		);
		this.fbBtn = GuiUtils.makeButton(this, this.container, 277, 709, 1, '',
			ImageUtils.getAtlasClass('AtlasesVirals').getName(),
			ImageUtils.getAtlasClass('AtlasesVirals').Frames.FbBtn,
			true, false, true,
			this.onVkShare,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
		);
		this.container.x = -540;
		this.container.y = -40;
	}
	
	private onVkShare() {
		TweenUtils.delayedCall(500, this.onShareHandler, this.parent);
	}
	
	setListeners(callback: Function, context: any) {
		this.onShareHandler = callback;
		this.parent = context;
	}
	
	setScreen(screen: Phaser.Image) {
		this.screenShot = screen;
		this.container.addAt(this.screenShot, 0);
		this.screenShot.mask = this.mask;
	}
	
	show() {
		TweenUtils.slideIn(this.container, 0, 1000);
	}
	
	hide() {
		TweenUtils.slideOut(this.container, -540, 1000);
	}
	
	dispose() {
		// TODO
	}
}
