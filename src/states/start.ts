import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {ILaser} from './spec-effects/laser/i.laser';
import {EffectUtils} from '../utils/effect.utils';
import {LaserType} from './spec-effects/laser/enum.laser';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';

export default class Start extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private laser: ILaser = null;
    private title: Phaser.Sprite = null;
    private fl1: Phaser.Sprite = null;
    private fl2: Phaser.Sprite = null;
    private fl3: Phaser.Sprite = null;
    private doll: Doll = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;

    public init(...args: any[]): void {
        this.gui = new InstantGui(this);
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg1').getName());
    
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

        this.doll = new Doll(this, 160, 162)
	        .layer(0, -216, 'glow',
                'AtlasesDollStart',
                'Glow', 'Glow')
		    .layer(202, -205, 'hair_b',
                'AtlasesDollStart',
                'HB', 'HB')
	        .layer(0, 0, 'body',
                'AtlasesDollStart',
                'Body', 'Body')
	        .layer(262, -107, 'head',
                'AtlasesDollStart',
                'Head', 'Head')
	        .lipsL(250, -89, 'lips',
                'AtlasesDollStart',
                'Lp', 'Lp')
	        .eyesL(250, -89, 'eyes',
                'AtlasesDollStart',
                'Ee', 'Ee')
	        .layer(243, -207, 'hair',
                'AtlasesDollStart',
                'H', 'H');
        this.doll.setScale(.342);

        this.title = this.game.add.sprite(0, 548, ImageUtils.getImageClass('ImagesTitle' + GameConfig.LOCALE).getName());
        this.fl1.alpha = 0;
        this.fl2.alpha = 0;
        this.fl3.alpha = 0;
        GuiUtils.centrize(this.title);
        this.title.alpha = 0;
        this.title.scale.setTo(0);

        // GUI Buttons
        this.gui.addGui();
        this.gui.addPhotoBtn(null);
        this.gui.addCopyrightBtn(null);
        this.gui.addHintBtn(null);
        const playBtn = this.gui.addPlayBtn(GuiButtons.START, this.nextState, 199, 819);
        playBtn.alpha = 0;
        playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000);
        EffectUtils.makeAlphaAnimation(this.fl1, 1, Phaser.Timer.SECOND * .5);
        EffectUtils.makeAlphaAnimation(this.fl2, 1, Phaser.Timer.SECOND * .7);
        EffectUtils.makeAlphaAnimation(this.fl3, 1, Phaser.Timer.SECOND * .6);
        TweenUtils.moveAndScaleIn(this.doll.getBody(), -97, 269, 1, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 1.5, () => {
            TweenUtils.fadeAndScaleAndRotate(this.title, 1, 1, 720 + 360, Phaser.Timer.SECOND * 2.5, Phaser.Timer.SECOND * 1, () => {
                EffectUtils.makeScaleAnimation(this.title, 1.03, Phaser.Timer.SECOND * 1.2);
                TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
            }, this);
        }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            // Loads
            // PreloaderUtils.preloadComixState();
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        if (this.bg) this.bg.destroy(true);
        if (this.title) this.title.destroy(true);
        if (this.fl1) this.fl1.destroy(true);
        if (this.fl2) this.fl2.destroy(true);
        if (this.fl3) this.fl3.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        this.doll.getBody().visible = false;
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
            this.game.state.start(this.NEXT, false, false);
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

