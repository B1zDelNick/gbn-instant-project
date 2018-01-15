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

export default class RunawayRivals extends Phaser.State {

    private NEXT = 'Select';
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

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
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
		    .layer(1, -19, 'hair_b',
			    'AtlasesDollManek',
			    'HB', null)
		    .layer(-135, 114, 'acs_z',
			    'AtlasesDollManek',
			    'AcZ', null)
		    .layer(-65, 405, 'dress_b',
			    'AtlasesDollManek',
			    'DB', null)
		    .layer(0, 0, 'body',
			    'AtlasesStateRivalsSlacking',
			    'Man', 'Man')
		    .layer(61, 298, 'shoe',
			    'AtlasesDollManek',
			    'S', null)
		    .layer(-65, 405, 'dress_l',
			    'AtlasesDollManek',
			    'DL', null)
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
	    	TweenUtils.moveAndScaleIn(this.doll.getBody(), 34, 149, 1, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 0, () => {
	    		TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
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

