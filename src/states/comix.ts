import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';

export default class Comix extends Phaser.State {

    private NEXT = 'SelectStage';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private txt1: Phaser.Sprite = null;
    private txt2: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
    private nome: Phaser.Sprite = null;
    
    private doll: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;


    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg3').getName());

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
	    
	    this.cloud = this.game.add.sprite(19, 421 + 550,
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').Frames.Cloud);
	    this.nome = this.game.add.sprite(276, 770,
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').Frames['Name' + GameConfig.SELECTED_ACTOR + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.nome);
	    this.nome.position.setTo(270, 550);
	    this.txt1 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').Frames['Txt1' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt1);
	    this.txt1.position.setTo(270, 664);
	    this.txt2 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').Frames['Txt2' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt2);
	    this.txt2.position.setTo(270, 790);
	    this.txt1.alpha = 0;
	    this.txt2.alpha = 0;
	    this.nome.alpha = 0;

        // GUI Buttons
	    this.gui.addGui();
	    const playBtn = this.gui.addPlayBtn(GuiButtons.GO, () => {
	    	TweenUtils.fadeAndScaleOut(playBtn);
		    this.game.add.tween(this.cloud).to({ y: 421 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    this.game.add.tween(this.nome).to({ y: this.nome.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    this.game.add.tween(this.txt1).to({ y: this.txt1.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    this.game.add.tween(this.txt2).to({ y: this.txt2.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, this.nextState, this);
	    }, 204, 834);
	    playBtn.alpha = 0;
	    playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
	    this.game.add.tween(this.cloud).to({ y: 421 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
		TweenUtils.fadeIn(this.nome, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3.5);
		TweenUtils.fadeIn(this.txt1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 4.5);
		TweenUtils.fadeIn(this.txt2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 5.5, () => {
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

