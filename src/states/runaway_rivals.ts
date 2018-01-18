import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {ShareWindow} from '../utils/viral/share.window';
import {ViralUtils} from '../utils/viral/viral.utils';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class RunawayRivals extends Phaser.State {

    private NEXT = 'Done';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private container: Phaser.Group = null;
    private lll: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
	private laser: ILaser = null;
	private doll: Doll = null;
	private fl1: Phaser.Sprite = null;
	private fl2: Phaser.Sprite = null;
	private fl3: Phaser.Sprite = null;
	private viral: ShareWindow = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	private curDr: number = -1;
	private curSh: number = -1;
	private curAc: number = -1;
	private curHr: number = -1;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.curDr = args[0] as number;
	    this.curSh = args[1] as number;
	    this.curHr = args[2] as number;
	    this.curAc = args[3] as number;
    }

    public preload(): void {
    }

    public create(): void {

    	this.container = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg13').getName());

	    this.laser = EffectUtils.makeLaser(LaserType.START_LASER);
	    this.laser.init(
		    ImageUtils.getAtlasClass('AtlasesEffects').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Pr1,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Pr2,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Pr3,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Pr1,
		    ]);
	    this.laser.start();

	    this.fl1 = this.game.add.sprite(105, 323,
		    ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Flash1);
	    this.fl2 = this.game.add.sprite(0, 425,
		    ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Flash2);
	    this.fl3 = this.game.add.sprite(378, 373,
		    ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStart').Frames.Flash3);
	    this.fl1.alpha = 0;
	    this.fl2.alpha = 0;
	    this.fl3.alpha = 0;
	
	    this.doll = new Doll(this, 301, 99)
		    .layer(39, -70, 'hair_b',
			    'AtlasesDollAlisaRunawayRivals',
			    'HB', null)
		    .layer(-94, 64, 'acs_z',
			    'AtlasesDollAlisaRunawayRivals',
			    'AcZ', null)
		    .layer(-24, 363, 'dress_b',
			    'AtlasesDollAlisaRunawayRivals',
			    'DB', null)
		    .layer(0, 0, 'body',
			    'AtlasesDollAlisaRunawayRivals',
			    'Body', 'Body')
		    .layer(44, 271, 'dress_l',
			    'AtlasesDollAlisaRunawayRivals',
			    'DL', null)
		    .layer(42, 250, 'shoe_b',
			    'AtlasesDollAlisaRunawayRivals',
			    'SB', null)
		    .layer(-64, 305, 'acs_x',
			    'AtlasesDollAlisaRunawayRivals',
			    'AcX', null)
		    .layer(25, 71, 'dress_c',
			    'AtlasesDollAlisaRunawayRivals',
			    'DC', null)
		    .layer(71, 651, 'shoe',
			    'AtlasesDollAlisaRunawayRivals',
			    'S', null)
		    .layer(-18, 37, 'dress',
			    'AtlasesDollAlisaRunawayRivals',
			    'D', null)
		    .layer(69, -58, 'head',
			    'AtlasesDollAlisaRunawayRivals',
			    'Head', 'Head')
		    .lipsL(69, -58, 'lips',
			    'AtlasesDollAlisaRunawayRivals',
			    'Lp', 'Lp')
		    .eyesL(69, -58, 'eyes',
			    'AtlasesDollAlisaRunawayRivals',
			    'Ee', 'Ee')
		    .layer(69, -58, 'sad',
			    'AtlasesDollAlisaRunawayRivals',
			    'Sad', 'Sad')
		    .layer(69, -58, 'smile',
			    'AtlasesDollAlisaRunawayRivals',
			    'Smile', 'Smile')
		    .layer(69, -58, 'angry',
			    'AtlasesDollAlisaRunawayRivals',
			    'Angry', 'Angry')
		    .layer(-94, -117, 'dress_f',
			    'AtlasesDollAlisaRunawayRivals',
			    'DF', null)
		    .layer(-94, 65, 'acs_c',
			    'AtlasesDollAlisaRunawayRivals',
			    'AcC', null)
		    .layer(15, -117, 'hair',
			    'AtlasesDollAlisaRunawayRivals',
			    'H', null)
		    .layer(-57, -67, 'dress_t',
			    'AtlasesDollAlisaRunawayRivals',
			    'DT', null)
		    .layer(13, -61, 'acs_v',
			    'AtlasesDollAlisaRunawayRivals',
			    'AcV', null);
	    this.doll.on('dress', this.curDr);
	    this.doll.on('dress_b', this.curDr);
	    this.doll.on('dress_f', this.curDr);
	    this.doll.on('dress_t', this.curDr);
	    this.doll.on('dress_l', this.curDr);
	    this.doll.on('dress_c', this.curDr);
	    this.doll.on('hair', this.curHr);
	    this.doll.on('hair_b', this.curHr);
	    this.doll.on('shoe', this.curSh);
	    this.doll.on('shoe_b', this.curSh);
	    this.doll.on('acs_z', this.curAc);
	    this.doll.on('acs_x', this.curAc);
	    this.doll.on('acs_c', this.curAc);
	    this.doll.on('acs_v', this.curAc);
	    this.doll.setPosition(230, 225);
	    this.doll.setScale(.396);
	    this.doll.setAlpha(0);
	    this.doll.getLayerSprite('sad').alpha = 0;
	    this.doll.getLayerSprite('angry').alpha = 0;

	    this.container.add(this.bg);
	    this.container.add(this.laser.getContainer());
	    this.container.add(this.fl1);
	    this.container.add(this.fl2);
	    this.container.add(this.fl3);
	    this.container.add(this.doll.getBody());
	
	    this.lll = this.game.add.graphics(0, 0);
	    this.lll.beginFill(0xffffff);
	    this.lll.drawRect(0, 0, 540, 960);
	    this.lll.alpha = 0;
	    
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
	    const nextBtn = this.gui.addExtraBtn(216, 840,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn, this.nextState,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
	    );
	    nextBtn.alpha = 0;
	    nextBtn.scale.setTo(0);
	    const playBtn = this.gui.addPlayBtn(GuiButtons.DONE, () => {
	    	TweenUtils.fadeAndScaleOut(playBtn);
	    	// stop scene
		    this.doll.stopEyes();
		    this.doll.stopLips();
	    	this.laser.stop();
		    this.game.tweens.removeFrom(this.fl1);
		    this.game.tweens.removeFrom(this.fl2);
		    this.game.tweens.removeFrom(this.fl3);
		    EffectUtils.makeShootAnimation(this.lll);
			// bluring stage
		    TweenUtils.delayedCall(500, () => {
			    EffectUtils.makeBlurAnimation(this.container, 16, 1500, false, 0);
		    }, this);
		    // screenshot
		    const bmd = this.game.add.bitmapData(this.game.width, this.game.height);
		    this.viral.setScreen(bmd.addToWorld(270, 600, .5, .5, 0.85, 0.85));
		    this.game.stage.updateTransform();
		    bmd.drawGroup(this.container); //  this.game.world);
		    // viral
		    TweenUtils.delayedCall(1000, () => {
			    this.viral.show();
			    TweenUtils.fadeAndScaleIn(nextBtn, 750, 1000);
		    }, this);
	    }, 216, 840);
	    playBtn.alpha = 0;
	    playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    EffectUtils.makeAlphaAnimation(this.fl1, 1, Phaser.Timer.SECOND * .5);
	    EffectUtils.makeAlphaAnimation(this.fl2, 1, Phaser.Timer.SECOND * .7);
	    EffectUtils.makeAlphaAnimation(this.fl3, 1, Phaser.Timer.SECOND * .6);
	    TweenUtils.fadeIn(this.doll.getBody(), Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 1, () => {
	    	TweenUtils.moveAndScaleIn(this.doll.getBody(), 152, 166, 1, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 0, () => {
	    		TweenUtils.delayedCall(50, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile1');
			    }, this);
			    TweenUtils.delayedCall(100, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile2');
			    }, this);
			    TweenUtils.delayedCall(300, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile2');
			    }, this);
			    TweenUtils.delayedCall(400, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile1');
			    }, this);
			    TweenUtils.delayedCall(500, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile1');
			    }, this);
			    TweenUtils.delayedCall(700, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile2');
			    }, this);
			    TweenUtils.delayedCall(900, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile1');
			    }, this);
			    TweenUtils.delayedCall(900, () => {
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Smile2');
			    }, this);
	    		TweenUtils.fadeIn(this.doll.getLayerSprite('angry'), 500, 1000, () => {
				    TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
			    }, this);
		    }, this);
	    }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
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

