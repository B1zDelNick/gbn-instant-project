import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {EffectUtils} from '../utils/effect.utils';
import {Chest} from './template/dress/chest';
import {BlowParticles} from './spec-effects/particle/blow.particle';
import {IParticle} from './spec-effects/particle/i.particle';

export default class HiddenRivals extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private particle: IParticle = null;
	private chest: Chest = null;
	private fader: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
    private doll: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private total: number = 0;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.tipShowing = true;
	    this.animating = false;
	    this.total = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg11').getName());
	
        //// game
	
	    this.chest = new Chest(this, 0)
		    .static()
		    .pageShelf(267, 408, 'back1',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Back1)
		    .item(284, 400, 'item1',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item1,
			    this.onTool, null, null)
		    .item(285, 559, 'item2',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item2,
			    this.onTool, null, null)
		    .item(250, 654, 'item4',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item4,
			    this.onTool, null, null)
		    .pageShelf(0, 786, 'back2',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Back2)
		    .pageShelf(246, 217, 'back3',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Back3)
		    .item(266, 160, 'item9', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item9,
			    this.onTool, null, null)
		    .item(244, 154, 'book1',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Book1,
			    this.onTool, null, null)
		    .item(397, 138, 'book2',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Book2,
			    this.onTool, null, null)
		    .pageShelf(0, 22, 'chest1',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Chest1)
		    .item(0, 603, 'chest1',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Chest2,
			    this.onTool, null, null)
		    .pageShelf(0, 603, 'chest3', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Chest3)
		    .item(19, 618, 'item5', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item5,
			    this.onTool, null, null)
		    .pageShelf(0, 685, 'chest4', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Chest4)
		    .item(14, 49, 'item6', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item6,
			    this.onTool, null, null)
		    .item(-9, 38, 'item7', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item7,
			    this.onTool, null, null)
		    .item(0, 23, 'chest2',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Chest5,
			    this.onTool, null, null)
		    .pageShelf(49, 782, 'box1', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Box1)
		    .item(69, 747, 'item8', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item8,
			    this.onTool, null, null)
		    .pageShelf(1, 783, 'box2', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Box2)
		    .item(0, 762, 'box',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Box3,
			    this.onTool, null, null)
		    .item(315, 794, 'tumba',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Back4,
			    this.onTool, null, null)
		    .item(370, 672, 'item10',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item10,
			    this.onTool, null, null)
		    .pageShelf(254, 819, 'back5', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Back5)
		    .item(264, 797, 'item11',
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Item11,
			    this.onTool, null, null)
		    .pageShelf(245, 833, 'back6', /// invisible
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Back6)
		    .build()
		    .build();
	    this.chest.findItem('item9').visible = false;
	    this.chest.findItem('item5').visible = false;
	    this.chest.findItem('item6').visible = false;
	    this.chest.findItem('item7').visible = false;
	    this.chest.findItem('item8').visible = false;
	    this.chest.findItem('item11').visible = false;
	    this.chest.findShelf('chest3').visible = false;
	    this.chest.findShelf('chest4').visible = false;
	    this.chest.findShelf('box1').visible = false;
	    this.chest.findShelf('box2').visible = false;
	    this.chest.findShelf('back5').visible = false;
	    this.chest.findShelf('back6').visible = false;
	    this.chest.disable();
	
	    this.particle = new BlowParticles(.5, 1);
	    this.particle.init(
		    ImageUtils.getAtlasClass('AtlasesEffects').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star1,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star2,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star3,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star4,
		    ]);
	    
	    /// Tips
	
	    this.fader = this.game.add.graphics(0, 0);
	    this.fader.beginFill(0, .85);
	    this.fader.drawRect(0, 0, 540, 960);
	    this.fader.alpha = 0;
	    this.fader.inputEnabled = false;

	    this.cloud = this.game.add.sprite(43, 252 - 600,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames.Cloud);
	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsHidden').Frames['Txt' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(260, 383);
	    this.txt.alpha = 0;

	    this.doll = new Doll(this, 162 + 540, 534)
		    .layer(0, 0, 'body',
			    'AtlasesDollSophiaComixRivals',
			    'Body', 'Body')
		    .layer(156, -44, 'head',
			    'AtlasesDollSophiaComixRivals',
			    'Head', 'Head')
		    .lipsL(163, 9, 'lips',
			    'AtlasesDollSophiaComixRivals',
			    'Lp', 'Lp')
		    .eyesL(163, 9, 'eyes',
			    'AtlasesDollSophiaComixRivals',
			    'Ee', 'Ee')
		    /*.layer(156, -44, 'sad',
			    'AtlasesDollSophiaComixRivals',
			    'Sad', 'Sad')*/
		    .layer(155, -104, 'hair',
			    'AtlasesDollSophiaComixRivals',
			    'H', 'H');

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(402, 219,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 252 - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt).to({ y: this.txt.y - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 162 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
				    // Highlight items once
				    //
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
					    this.tipShowing = false;
					    this.chest.enable();
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
	    this.playBtn = this.gui.addExtraBtn(216, 840,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn, this.nextState,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
	    );
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.RIGHT, () => {
		    TweenUtils.fadeAndScaleOut(this.playBtn, 500, 0, this.nextState, this);
	    }, 216, 840);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 162, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
		    // TweenUtils.fadeOut(this.doll.getLayerSprite('sad'), 250);
	    }, this);
	    this.game.add.tween(this.cloud).to({ y: 252 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
	    TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.5, () => {
		    TweenUtils.fadeAndScaleIn(this.closeBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
	    }, this);
	    
        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }
	
	private onTool(sprite: Phaser.Button) {
    	const name = sprite.name;
    	if (name.indexOf('item') !== -1) {
    		TweenUtils.customFadeAndScaleIn(sprite, 1, 1.15, 750, 0, () => {
			    TweenUtils.fadeAndScaleOut(sprite, 500, 0, () => {
				    sprite.visible = false;
				    this.total++;
				    if (this.total === 10) {
					    TweenUtils.fadeAndScaleOut(this.hintBtn);
				    	TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
				    }
			    }, this);
			    (this.particle as BlowParticles).setPos(sprite.x, sprite.y - 25);
			    this.particle.start();
		    }, this);
	    }
	    else if (name.indexOf('book') !== -1) {
		    this.chest.findItem('book1').inputEnabled = false;
		    this.chest.findItem('book2').inputEnabled = false;
		    TweenUtils.slideOut(this.chest.findItem('book1'), this.chest.findItem('book1').x - 80, 1000);
		    TweenUtils.slideOut(this.chest.findItem('book2'), this.chest.findItem('book2').x + 40, 1000, 0, () => {
			    this.chest.findItem('item9').visible = true;
			    this.chest.findItem('item9').alpha = 0;
			    this.chest.findItem('item9').scale.setTo(0);
		    	TweenUtils.fadeAndScaleIn(this.chest.findItem('item9'), 750);
		    }, this);
	    }
	    else if (name === 'chest2') {
    		TweenUtils.fadeOut(sprite, 500, 0, () => {
    			sprite.visible = false;
			    this.chest.findItem('item6').visible = true;
			    this.chest.findItem('item6').alpha = 0;
			    this.chest.findItem('item6').scale.setTo(0);
			    TweenUtils.fadeAndScaleIn(this.chest.findItem('item6'), 750);
			    this.chest.findItem('item7').visible = true;
			    this.chest.findItem('item7').alpha = 0;
			    this.chest.findItem('item7').scale.setTo(0);
			    TweenUtils.fadeAndScaleIn(this.chest.findItem('item7'), 750);
		    }, this);
	    }
	    else if (name === 'chest1') {
		    TweenUtils.fadeOut(sprite, 250, 0, () => {
			    sprite.visible = false;
		    }, this);
		    this.chest.findShelf('chest3').visible = true;
		    this.chest.findShelf('chest4').visible = true;
		    this.chest.findShelf('chest3').alpha = 0;
		    this.chest.findShelf('chest4').alpha = 0;
		    TweenUtils.fadeIn(this.chest.findShelf('chest3'), 250);
		    TweenUtils.fadeIn(this.chest.findShelf('chest4'), 250, 0, () => {
			    this.chest.findItem('item5').visible = true;
			    this.chest.findItem('item5').alpha = 0;
			    this.chest.findItem('item5').scale.setTo(0);
			    TweenUtils.fadeAndScaleIn(this.chest.findItem('item5'), 750);
		    }, this);
	    }
	    else if (name === 'box') {
		    TweenUtils.fadeOut(sprite, 250, 0, () => {
			    sprite.visible = false;
		    }, this);
		    this.chest.findShelf('box1').visible = true;
		    this.chest.findShelf('box2').visible = true;
		    this.chest.findShelf('box1').alpha = 0;
		    this.chest.findShelf('box2').alpha = 0;
		    TweenUtils.fadeIn(this.chest.findShelf('box1'), 250);
		    TweenUtils.fadeIn(this.chest.findShelf('box2'), 250, 0, () => {
			    this.chest.findItem('item8').visible = true;
			    this.chest.findItem('item8').alpha = 0;
			    this.chest.findItem('item8').scale.setTo(0);
			    TweenUtils.fadeAndScaleIn(this.chest.findItem('item8'), 750);
		    }, this);
	    }
	    else if (name === 'tumba') {
		    TweenUtils.fadeOut(sprite, 250, 0, () => {
			    sprite.visible = false;
		    }, this);
		    this.chest.findShelf('back5').visible = true;
		    this.chest.findShelf('back6').visible = true;
		    this.chest.findShelf('back5').alpha = 0;
		    this.chest.findShelf('back6').alpha = 0;
		    TweenUtils.fadeIn(this.chest.findShelf('back5'), 250);
		    TweenUtils.fadeIn(this.chest.findShelf('back6'), 250, 0, () => {
			    this.chest.findItem('item11').visible = true;
			    this.chest.findItem('item11').alpha = 0;
			    this.chest.findItem('item11').scale.setTo(0);
			    TweenUtils.fadeAndScaleIn(this.chest.findItem('item11'), 750);
		    }, this);
	    }
	}
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud).to({ y: 252 - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt).to({ y: this.txt.y - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			TweenUtils.slideOut(this.doll.getBody(), 162 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
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
			this.txt.position.setTo(260, 383);
			this.txt.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 162, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud).to({ y: 252 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
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

