import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {DecorBackground} from './template/decor/decor.background';
import {EffectUtils} from '../utils/effect.utils';
import {ShareWindow} from '../utils/viral/share.window';
import {ViralUtils} from '../utils/viral/viral.utils';

export default class DietDecor extends Phaser.State {

    private NEXT = 'END';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private container: Phaser.Group = null;
	private btnContainer: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
    private decor: DecorBackground = null;
    private bg: Phaser.Sprite = null;
	private txt1: Phaser.Sprite = null;
	private txt2: Phaser.Sprite = null;
	private cloud: Phaser.Sprite = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
	private cupBtn: Phaser.Button = null;
	private foodBtn: Phaser.Button = null;
	private subBtn: Phaser.Button = null;
	private viral: ShareWindow = null;
    private doll: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private cat1: boolean = false;
	private cat2: boolean = false;
	private cat3: boolean = false;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.tipShowing = true;
	    this.animating = false;
	    this.cat1 = false;
	    this.cat2 = false;
	    this.cat3 = false;
    }

    public preload(): void {
    }

    public create(): void {
	
	    this.container = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg9').getName());
	
	    /// game
	
	    this.decor = new DecorBackground(540)
		    // .sprite(0, 0, ImageUtils.getImageClass('ImagesBg9').getName())
		    .layer('sub', false)
			    .item(344, 706,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Three)
			    .item(216, 645,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Sub1)
			    .item(0, 512,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Sub2)
			    .item(243, 593,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Sub3)
			    .item(213, 591,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Sub4)
			    .item(162, 740,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Sub5)
		    .build()
		    .layer('cup', false)
			    .item(341, 91,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.One)
			    .item(192, 43,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Cup1)
			    .item(240, 37,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Cup2)
			    .item(172, 0,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Cup3)
			    .item(0, 0,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Cup4)
			    .item(222, 0,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Cup5)
		    .build()
		    .layer('food', false)
			    .item(107, 420,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Two)
			    .item(0, 303,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Food1)
			    .item(0, 244,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Food2)
			    .item(0, 238,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Food3)
			    .item(0, 280,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Food4)
			    .item(0, 298,
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Food5)
		    .build();
	    
	    this.container.add(this.bg);
	    this.container.add(this.decor.getBody());
	    
	    this.btnContainer = this.game.add.group();
	    this.cupBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    82, 845, 1,
			    'cup', ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.CupBtn,
			    true, false, true, this.changeItem,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.cupBtn.scale.setTo(0);
	    this.cupBtn.alpha = 0;
	    this.foodBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    213, 845, 1,
			    'food', ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.FoodBtn,
			    true, false, true, this.changeItem,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.foodBtn.scale.setTo(0);
	    this.foodBtn.alpha = 0;
	    this.subBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    345, 845, 1,
			    'sub', ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.SubBtn,
			    true, false, true, this.changeItem,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.subBtn.scale.setTo(0);
	    this.subBtn.alpha = 0;
	
	    /// Tips
	
	    this.fader = this.game.add.graphics(0, 0);
	    this.fader.beginFill(0, .85);
	    this.fader.drawRect(0, 0, 540, 960);
	    this.fader.alpha = 0;
	    this.fader.inputEnabled = false;
	    
	    this.doll = new Doll(this, 80 + 540, 228)
		    .layer(74, -121, 'hair_b',
			    'AtlasesDollImam',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollImam',
			    'Body', 'Body')
		    .layer(167, -89, 'head',
			    'AtlasesDollImam',
			    'Head', 'Head')
		    .lipsL(161, -27, 'lips',
			    'AtlasesDollImam',
			    'Lp', 'Lp')
		    .eyesL(161, -27, 'eyes',
			    'AtlasesDollImam',
			    'Ee', 'Ee')
		    .layer(124, -128, 'hair',
			    'AtlasesDollImam',
			    'H', 'H');
	
	    this.cloud = this.game.add.sprite(45, 494 + 550,
		    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames.Cloud);
	    this.txt1 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames['Txt1' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt1);
	    this.txt1.position.setTo(270, 608);
	    this.txt1.alpha = 0;
	    this.txt2 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateDietDecor').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDietDecor').Frames['Txt2' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt2);
	    this.txt2.position.setTo(270, 753);
	    this.txt2.alpha = 0;
	
	    this.viral = ViralUtils.addShareWindow();
	    this.viral.setListeners(() => {
		    this.viral.hide();
		    // unbluring stage
		    TweenUtils.delayedCall(500, () => {
			    EffectUtils.makeBlurAnimation(this.container, 0, 1500, false, 0);
		    }, this);
	    }, this);
	    
        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(414, 493,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 494 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt1).to({ y: this.txt1.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt2).to({ y: this.txt2.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
				    // Decor
				    TweenUtils.slideIn(this.decor.getBody(), 0, Phaser.Timer.SECOND * 1);
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
					    this.tipShowing = false;
					    TweenUtils.fadeAndScaleIn(this.cupBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
					    TweenUtils.fadeAndScaleIn(this.foodBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .25);
					    TweenUtils.fadeAndScaleIn(this.subBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.DONE, () => {
		    TweenUtils.fadeAndScaleOut(this.playBtn);
		    if (this.decor.getIndex('cup') === 0) {
		    	this.decor.getByIndex('cup', 0).visible = false;
		    }
		    if (this.decor.getIndex('food') === 0) {
			    this.decor.getByIndex('food', 0).visible = false;
		    }
		    if (this.decor.getIndex('sub') === 0) {
			    this.decor.getByIndex('sub', 0).visible = false;
		    }
		    TweenUtils.fadeAndScaleOut(this.cupBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .75);
		    TweenUtils.fadeAndScaleOut(this.foodBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
		    TweenUtils.fadeAndScaleOut(this.subBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.25);
		    // bluring stage
		    TweenUtils.delayedCall(500, () => {
			    EffectUtils.makeBlurAnimation(this.container, 16, 1500, false, 0);
		    }, this);
		    // screenshot
		    const bmd = this.game.add.bitmapData(this.game.width, this.game.height);
		    this.viral.setScreen(bmd.addToWorld(270, 490, .5, .5, 0.80, 0.80));
		    this.game.stage.updateTransform();
		    bmd.drawGroup(this.container); //  this.game.world);
		    // viral
		    TweenUtils.delayedCall(1000, () => {
			    this.viral.show();
			    TweenUtils.fadeAndScaleIn(nextBtn, 750, 1000);
		    }, this);
	    }, 222, 755);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);
	    const nextBtn = this.gui.addExtraBtn(216, 840,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn, this.nextState,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
	    );
	    nextBtn.alpha = 0;
	    nextBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
	    this.game.add.tween(this.cloud).to({ y: 494 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
	    TweenUtils.fadeIn(this.txt1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.5);
	    TweenUtils.fadeIn(this.txt2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4.5, () => {
		    TweenUtils.fadeAndScaleIn(this.closeBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
	    }, this);
	    
        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }
	
	private changeItem(sprite: Phaser.Button) {
		const name = sprite.name;
		this.decor.next(name);
		if (name === 'cup') this.cat1 = true;
		if (name === 'food') this.cat2 = true;
		if (name === 'sub') this.cat3 = true;
		if (this.cat1 && this.cat2 && this.cat3) {
			if (this.playBtn.alpha === 0) {
				TweenUtils.fadeAndScaleIn(this.playBtn);
			}
		}
	}
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud).to({ y: 494 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt2).to({ y: this.txt2.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
				if (this.fader.inputEnabled) {
					TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
						this.fader.inputEnabled = false;
						this.animating = false;
					}, this);
				}
			}, this);
			this.tipShowing = false;
		}
		else {
			this.fader.inputEnabled = true;
			this.txt2.position.setTo(270, 733);
			this.txt2.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud).to({ y: 494 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
				this.animating = false;
			}, this);
			this.tipShowing = true;
		}
	}

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.bg.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
		this.doll.dispose();
        this.gui.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        this.gui.disable();
	    this.blocker = this.game.add.graphics(0, 0);
	    this.blocker.beginFill(0);
	    this.blocker.drawRect(0, 0, 540, 960);
	    this.blocker.inputEnabled = true;
	    this.blocker.alpha = 0;
	    this.game.camera.onFadeComplete.addOnce(() => {
		    this.game.time.events.removeAll();
		    this.game.tweens.removeAll();
		    this.game.camera.fade(0x000000, 1, true, 0);
		    this.blocker.alpha = .85;
		    this.reallyGoNextState(true);
	    }, this);
	    this.game.camera.fade(0x000000, 500, true, .85);
    }

    private reallyGoNextState(addLoader: boolean = false): void {
        if (this.nextPrepared) {
            this.game.state.start(this.NEXT);
        } else {
            if (addLoader) {
                this.spinner = this.game.add.sprite(
                    this.game.world.centerX,
                    this.game.world.centerY,
                    ImageUtils.getImageClass('ImagesSpin').getName());
                this.spinner.anchor.setTo(.5, .5);
                // this.spinner.scale.setTo(.5);
                TweenUtils.rotate(this.spinner, 360, Phaser.Timer.SECOND * 1, 0, -1);
            }
            this.game.time.events.add(Phaser.Timer.SECOND *  .25, this.reallyGoNextState, this);
        }
    }
}

