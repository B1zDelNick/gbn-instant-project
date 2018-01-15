import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {EffectUtils} from '../utils/effect.utils';

export default class ComixRivals extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private table: Phaser.Sprite = null;
    private coff: Phaser.Sprite = null;
    private spot: Phaser.Sprite = null;
    
    private alisa: Doll = null;
    private sophia: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;


    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg10').getName());

	    this.alisa = new Doll(this, 129 - 540, 162)
		    .layer(98, -63, 'hair_b',
			    'AtlasesDollAlisaRivals',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollAlisaRivals',
			    'Body', 'Body')
		    .layer(115, -42, 'head',
			    'AtlasesDollAlisaRivals',
			    'Head', 'Head')
		    .layer(115, -42, 'smile',
			    'AtlasesDollAlisaRivals',
			    'Smile', 'Smile')
		    .layer(-67, 147, 'hand',
			    'AtlasesDollAlisaRivals',
			    'Hand', 'Hand')
		    .layer(86, -74, 'hair',
			    'AtlasesDollAlisaRivals',
			    'H', 'H');
	    GuiUtils.centrizeCustom(this.alisa.getLayerSprite('hand'), .72, .047);
	    this.alisa.getLayerSprite('smile').alpha = 0;
	    
	    this.cloud = this.game.add.sprite(10, 70 - 400,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').Frames.Cloud);
	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').Frames['Txt' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(260, 207);
	    this.txt.alpha = 0;
	
	    this.sophia = new Doll(this, 34, 373)
		    .layer(0, 0, 'body',
			    'AtlasesDollSophiaRivals',
			    'Body', 'Body')
		    .layer(275, 150, 'spot',
			    'AtlasesDollSophiaRivals',
			    'Spot', 'Spot')
		    .layer(310, -42, 'head',
			    'AtlasesDollSophiaRivals',
			    'Head', 'Head')
		    .layer(310, -42, 'sad',
			    'AtlasesDollSophiaRivals',
			    'Sad', 'Sad')
		    .layer(-67, 147, 'hand',
			    'AtlasesDollSophiaRivals',
			    'Hand', 'Hand')
		    .layer(309, -103, 'hair',
			    'AtlasesDollSophiaRivals',
			    'H', 'H');
	    this.sophia.getLayerSprite('sad').alpha = 0;
	    this.sophia.getLayerSprite('spot').alpha = 0;
	
	    this.table = this.game.add.sprite(126, 731,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').Frames.Table);
	    this.spot = this.game.add.sprite(274, 731,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').Frames.Spot1);
	    this.coff = this.game.add.sprite(172, 625,
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateRivalsComix').Frames.Coff1);
	    GuiUtils.centrizeCustom(this.coff, .5, .95);
	    this.spot.alpha = 0;

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    const playBtn = this.gui.addPlayBtn(GuiButtons.GO, () => {
	    	TweenUtils.fadeAndScaleOut(playBtn);
		    this.game.add.tween(this.cloud).to({ y: 70 - 400 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    this.game.add.tween(this.txt).to({ y: this.txt.y - 400 }, Phaser.Timer.SECOND * 1,
			    Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5)
			    .onComplete.add(this.nextState, this);
	    }, 204, 834);
	    playBtn.alpha = 0;
	    playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.alisa.getBody(), 90, Phaser.Timer.SECOND * 1.5, Phaser.Timer.SECOND * 2, () => {
		    //
	    }, this);
	    TweenUtils.rotate(this.alisa.getLayerSprite('hand'), 15, 300, 2500, 0, false, Phaser.Easing.Linear.None, () => {
		    TweenUtils.rotate(this.alisa.getLayerSprite('hand'), -10, 500, 0, 0, false, Phaser.Easing.Linear.None, () => {
		    	TweenUtils.rotate(this.alisa.getLayerSprite('hand'), 7, 500, 0, 0, false);
		    }, this);
	    }, this);
	    TweenUtils.moveAndRotate(this.coff, 238, 721, 86, 500, 3000, () => {
	    	TweenUtils.fadeIn(this.spot);
	    	TweenUtils.fadeIn(this.sophia.getLayerSprite('spot'));
	    	TweenUtils.fadeIn(this.sophia.getLayerSprite('sad'), 500, 0, () => {
			    TweenUtils.fadeIn(this.alisa.getLayerSprite('smile'), 500, 0, () => {
				    this.alisa.getLayerSprite('head').visible = false;
			    	EffectUtils.makeMoveAnimation(
			    		this.alisa.getLayerSprite('smile'),
					    this.alisa.getLayerSprite('smile').x,
					    this.alisa.getLayerSprite('smile').y + 5,
					    100, true, 5
				    );
				    EffectUtils.makeMoveAnimation(
					    this.alisa.getLayerSprite('hair'),
					    this.alisa.getLayerSprite('hair').x,
					    this.alisa.getLayerSprite('hair').y + 5,
					    100, true, 5
				    );
				    EffectUtils.makeMoveAnimation(
					    this.alisa.getLayerSprite('hair_b'),
					    this.alisa.getLayerSprite('hair_b').x,
					    this.alisa.getLayerSprite('hair_b').y + 5,
					    100, true, 5
				    );
				    TweenUtils.delayedCall(1500, () => {
					    TweenUtils.slideOut(this.alisa.getBody(), 540, 1000, 0);
				    }, this);
			    }, this);
		    }, this);
	    }, this);
	    this.game.add.tween(this.cloud).to({ y: 70 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 7);
		TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 8.5, () => {
			TweenUtils.fadeAndScaleIn(playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
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
		this.alisa.dispose();
		this.sophia.dispose();
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

