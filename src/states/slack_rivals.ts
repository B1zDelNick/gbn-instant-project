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

export default class SlackRivals extends Phaser.State {

    private NEXT = 'RunawayRivals';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private container: Phaser.Group = null;
	private particle: IParticle = null;
	private fader: Phaser.Graphics = null;
    private shad: Phaser.Sprite = null;
    private mark: Phaser.Sprite = null;
    private sadSophie: Phaser.Sprite = null;
    private alisaBack: Phaser.Sprite = null;
    private alisaFront: Phaser.Sprite = null;
    private back: Phaser.Sprite = null;
    private front: Phaser.Sprite = null;
    private bg: Phaser.Sprite = null;
    private txt1: Phaser.Sprite = null;
    private txt2: Phaser.Sprite = null;
    private cloud1: Phaser.Sprite = null;
    private cloud2: Phaser.Sprite = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
	private dressBtn: Phaser.Button = null;
	private shoeBtn: Phaser.Button = null;
	private acsBtn: Phaser.Button = null;
	private hairBtn: Phaser.Button = null;
	private downBtn: Phaser.Button = null;
	private upBtn: Phaser.Button = null;
	private againBtn: Phaser.Button = null;
    private doll: Doll = null;
    private doll2: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	private curDr: number = -1;
	private curSh: number = -1;
	private curAc: number = -1;
	private curHr: number = -1;
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private panelIsShowing: boolean = false;
	private failed: boolean = false;
	private checking: boolean = false;
	private curTime: number = 0;
	private nextCheck: number = 100;
	private shoeDressed: boolean = false;
	private dressDressed: boolean = false;
	private acsDressed: boolean = false;
	private hairDressed: boolean = false;
	private completed: boolean = false;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.tipShowing = true;
	    this.animating = false;
	    this.panelIsShowing = false;
	    this.failed = false;
	    this.checking = false;
	    this.curTime = 0;
	    this.nextCheck = 30000;
	    this.curDr = 0;
	    this.curSh = 0;
	    this.curAc = 0;
	    this.curHr = 0;
	    this.shoeDressed = false;
	    this.dressDressed = false;
	    this.acsDressed = false;
	    this.hairDressed = false;
	    this.completed = false;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg12').getName());
	
        //// game
	    
	    this.shad = this.game.add.sprite(194, 719,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.Shad,
	    );
	    this.doll2 = new Doll(this, 301, 99)
		    .setListeners(this, this.nextState)
            .layer(-135, 114, 'acs_z',
			    'AtlasesDollManek',
			    'AcZ', null)
		    .layer(1, -19, 'hair_b',
			    'AtlasesDollManek',
			    'HB', null)
		    .layer(-65, 405, 'dress_b',
			    'AtlasesDollManek',
			    'DB', null)
		    .layer(61, 298, 'shoe',
			    'AtlasesDollManek',
			    'S', null)
		    .layer(0, 0, 'body',
			    'AtlasesStateRivalsSlacking',
			    'Man', 'Man')
		    .layer(-49, 492, 'acs_x',
			    'AtlasesDollManek',
			    'AcX', null)
		    .layer(-120, -15, 'dress',
			    'AtlasesDollManek',
			    'D', 'D')
		    .flashL(-60, 146, 'flash',
			    'AtlasesDollManek',
			    'Fl', 'Fl')
		    .layer(-111, 122, 'acs_c',
			    'AtlasesDollManek',
			    'AcC', null)
		    .layer(-23, -69, 'hair',
			    'AtlasesDollManek',
			    'H', null)
		    .layer(-95, -16, 'dress_f',
			    'AtlasesDollManek',
			    'DF', null)
		    .layer(-31, -14, 'acs_v',
			    'AtlasesDollManek',
			    'AcV', null);
	    this.doll2.disableListeners();
	    
	    this.alisaBack = this.game.add.sprite(2, 114,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.RivalB,
	    );
	    this.alisaFront = this.game.add.sprite(0, 114,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.RivalF,
	    );
	    this.alisaFront.alpha = 0;
	
	    this.mark = this.game.add.sprite(2, 114,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.Warn,
	    );
	    GuiUtils.centrize(this.mark);
	    this.mark.position.setTo(270, 125);
	    this.mark.scale.setTo(.5);
	    this.mark.alpha = 0;

	    this.sadSophie = this.game.add.sprite(4 + 540, 169,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.SadGirl,
	    );

	    this.particle = new BlowParticles(.5, 1);
	    this.particle.init(
		    ImageUtils.getAtlasClass('AtlasesEffects').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star1,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star2,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star3,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star4,
		    ]);

	    this.container = this.game.add.group();
	    this.container.position.setTo(0, 300);
	    this.back = this.game.add.sprite(2, 805,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.Chest,
		    this.container
	    );
	    this.dressBtn =
		    GuiUtils.makeButton(
			    this, this.container,
			    40, 823, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.DrBtn,
			    true, false, true, this.onTool,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.shoeBtn =
		    GuiUtils.makeButton(
			    this, this.container,
			    153, 823, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.ShBtn,
			    true, false, true, this.onTool,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.hairBtn =
		    GuiUtils.makeButton(
			    this, this.container,
			    264, 823, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.HrBtn,
			    true, false, true, this.onTool,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.acsBtn =
		    GuiUtils.makeButton(
			    this, this.container,
			    375, 823, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.AcBtn,
			    true, false, true, this.onTool,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.front = this.game.add.sprite(9, 808,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.Door,
		    this.container
	    );
	    
	    /// Tips
	
	    this.fader = this.game.add.graphics(0, 0);
	    this.fader.beginFill(0, .85);
	    this.fader.drawRect(0, 0, 540, 960);
	    this.fader.alpha = 0;
	    this.fader.inputEnabled = false;

	    this.cloud1 = this.game.add.sprite(6, 189 - 600,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.Cloud1);
	    this.txt1 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames['Txt1' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt1);
	    this.txt1.position.setTo(260, 342);
	    this.txt1.alpha = 0;
	    this.cloud2 = this.game.add.sprite(103 + 540, 272,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.Cloud2);
	    this.txt2 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames['Txt2' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt2);
	    this.txt2.position.setTo(295, 461);
	    this.txt2.alpha = 0;

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
	    this.closeBtn = this.gui.addExtraBtn(428, 152,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud1).to({ y: 189 - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt1).to({ y: this.txt1.y - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 162 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
				    // Highlight items once
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
					    this.tipShowing = false;
					    TweenUtils.fadeAndScaleIn(this.upBtn, Phaser.Timer.SECOND * .75);
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.RIGHT, () => {
		    TweenUtils.fadeAndScaleOut(this.playBtn, 500, 0, this.nextState, this);
	    }, 216, 840);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);
	    this.upBtn = this.gui.addExtraBtn(190, 792,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.UpBtn, this.onUp,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
	    );
	    this.upBtn.alpha = 0;
	    this.upBtn.scale.setTo(0);
	    this.downBtn = this.gui.addExtraBtn(190, 654,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsSlacking').Frames.DownBtn, this.onDown,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandler : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandler : null
	    );
	    this.downBtn.alpha = 0;
	    this.downBtn.scale.setTo(0);
	    this.againBtn = this.gui.addExtraBtn(147, 848,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.AgainBtn, () => {
	    	    this.NEXT = 'SlackRivals';
	    	    this.nextState();
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
	    );
	    this.againBtn.alpha = 0;
	    this.againBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 162, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
		    // TweenUtils.fadeOut(this.doll.getLayerSprite('sad'), 250);
	    }, this);
	    this.game.add.tween(this.cloud1).to({ y: 189 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
	    TweenUtils.fadeIn(this.txt1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.5, () => {
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
    	if (this.tipShowing) return;
		if (sprite === this.dressBtn) {
			this.curDr++;
			if (this.curDr > 5) this.curDr = 1;
			this.doll2.on('dress', this.curDr);
			this.doll2.on('dress_b', this.curDr);
			this.doll2.on('dress_f', this.curDr);
			this.dressDressed = true;
			this.doll2.stopFlash();
		}
		else if (sprite === this.shoeBtn) {
			this.curSh++;
			if (this.curSh > 4) this.curSh = 1;
			this.doll2.on('shoe', this.curSh);
			this.shoeDressed = true;
		}
		else if (sprite === this.acsBtn) {
			this.curAc++;
			if (this.curAc > 5) this.curAc = 1;
			this.doll2.on('acs_z', this.curAc);
			this.doll2.on('acs_x', this.curAc);
			this.doll2.on('acs_c', this.curAc);
			this.doll2.on('acs_v', this.curAc);
			this.acsDressed = true;
		}
		else if (sprite === this.hairBtn) {
			this.curHr++;
			if (this.curHr > 4) this.curHr = 1;
			this.doll2.on('hair', this.curHr);
			this.doll2.on('hair_b', this.curHr);
			this.hairDressed = true;
		}
		if (this.dressDressed && this.acsDressed && this.hairDressed && this.shoeDressed && !this.completed) {
			this.completed = true;
			this.doll2.enableListeners();
			this.doll2.getBody().filters = [EffectUtils.makeGlowAnimation(0xffff00)];
		}
	}
	
	private onUp() {
		if (this.tipShowing) return;
		if (this.animating) return;
		this.animating = true;
		this.panelIsShowing = true;
		TweenUtils.fadeAndScaleOut(this.upBtn);
		TweenUtils.moveIn(this.container, 0, 0, 500, 0, () => {
			this.animating = false;
			TweenUtils.fadeOut(this.front);
			TweenUtils.fadeAndScaleIn(this.downBtn, 750);
		}, this);
	}
	
	private onDown() {
		if (this.animating) return;
		this.animating = true;
		this.panelIsShowing = false;
		TweenUtils.fadeAndScaleOut(this.downBtn);
		TweenUtils.fadeIn(this.front, 500, 0, () => {
			TweenUtils.moveOut(this.container, 0, 300, 500, 0, () => {
				this.animating = false;
				if (!this.failed && !this.checking)
					TweenUtils.fadeAndScaleIn(this.upBtn, 750);
			}, this);
		}, this);
	}
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud1).to({ y: 189 - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt1).to({ y: this.txt1.y - 600 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			TweenUtils.slideOut(this.doll.getBody(), 162 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
				if (this.fader.inputEnabled) {
					TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
						this.fader.inputEnabled = false;
						this.animating = false;
						if (!this.panelIsShowing) {
							TweenUtils.fadeAndScaleIn(this.upBtn, 750);
						}
						else {
							TweenUtils.fadeAndScaleIn(this.downBtn, 750);
						}
					}, this);
				}
			}, this);
			this.tipShowing = false;
		}
		else {
			if (!this.panelIsShowing) {
				TweenUtils.fadeAndScaleOut(this.upBtn);
			}
			else {
				TweenUtils.fadeAndScaleOut(this.downBtn);
			}
			this.fader.inputEnabled = true;
			this.txt1.position.setTo(260, 342);
			this.txt1.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 162, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud1).to({ y: 189 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
				this.animating = false;
			}, this);
			this.tipShowing = true;
		}
	}

    public update(): void {
        super.update(this.game);
        if (!this.tipShowing) {
        	this.curTime++;
        	if (this.curTime === this.nextCheck) {
		        TweenUtils.fadeAndScaleOut(this.hintBtn);
        		EffectUtils.makeAlphaAnimation(this.mark, 1, 400, true, 2);
        		EffectUtils.makeScaleAnimation(this.mark, 1.15, 400, true, 2);
        		TweenUtils.delayedCall(2500, this.check, this);
        		TweenUtils.delayedCall(1900, () => {
        			if (!this.panelIsShowing) {
				        TweenUtils.fadeAndScaleOut(this.upBtn);
			        }
			        this.tipShowing = true;
			        this.checking = true;
		        }, this);
	        }
        }
    }
    
    private check() {
    	TweenUtils.fadeOut(this.alisaBack);
    	TweenUtils.fadeIn(this.alisaFront, 500, 0, () => {
    	    if (this.panelIsShowing) {
		        this.txt2.position.setTo(295, 461);
		        this.txt2.alpha = 0;
    	    	this.failed = true;
    	    	this.onDown();
		        this.game.add.tween(this.cloud2).to({ x: 103 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1);
		        TweenUtils.fadeIn(this.txt2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2.5, () => {
		        	this.game.add.tween(this.cloud2).to({ x: 103 + 540 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 3);
			        this.game.add.tween(this.txt2).to({ x: this.txt1.x + 540 },
				        Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 3)
				        .onComplete.add(() => {
				        TweenUtils.fadeOut(this.alisaFront, 500, 0);
				        TweenUtils.fadeIn(this.alisaBack, 500, 0, () => {
					        TweenUtils.slideIn(this.sadSophie, 4, 1000, 0, () => {
						        TweenUtils.fadeAndScaleIn(this.againBtn, 750);
					        }, this);
				        }, this);
			        }, this);
		        }, this);
	        }
	        else {
    	    	TweenUtils.delayedCall(2000, () => {
			        TweenUtils.fadeOut(this.alisaFront, 500, 0);
			        TweenUtils.fadeIn(this.alisaBack, 500, 0, () => {
				        this.curTime = 0;
				        this.nextCheck = this.game.rnd.between(240, 420);
				        TweenUtils.fadeAndScaleIn(this.hintBtn, 750);
				        TweenUtils.fadeAndScaleIn(this.upBtn, 750);
				        this.tipShowing = false;
				        this.checking = false;
			        }, this);
		        }, this);
	        }
	    }, this);
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
            this.game.state.start(this.NEXT, false, false, this.curDr, this.curSh, this.curHr, this.curAc);
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

