import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {BlowParticles} from './spec-effects/particle/blow.particle';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class SelectStage extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private particle: IParticle = null;
    private ofTxt: Phaser.Sprite = null;
    private numTxt: Phaser.Sprite = null;
    private leg1: Phaser.Sprite = null;
    private leg2: Phaser.Sprite = null;
    private legs: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private legContainer: Phaser.Group = null;
    private leftBtn: Phaser.Button = null;
    private rightBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private btns: Phaser.Button[] = [];

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    
    private selected: number = 0;
    private animating: boolean = false;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.btns = [];
	    this.selected = 0;
	    SoundUtils.play('MainTheme');
    }

    public preload(): void {
    	// TODO remove all
	    GameConfig.PROGRESS = 4;
	    this.selected = GameConfig.PROGRESS;
    }

    public create(): void {
	
	    this.container = this.game.add.group();
	    for (let i = 12; i >= 0; i--) {
	    	const num = i / 2;
		    this.container.add(this.game.add.sprite(i * 540, 0,
			    ImageUtils.getAtlasClass('AtlasesStateSelectStage2').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateSelectStage2').Frames.Bg4));
		    this.container.add(this.game.add.sprite(i * 540, 25,
			    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Light));
		    this.container.add(this.game.add.sprite(i * 540, 447,
			    ImageUtils.getAtlasClass('AtlasesStateSelectStage2').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateSelectStage2').Frames.Lamps));
		    if (i % 2 === 0 && num !== 0) {
		    	const temp = GuiUtils.makeButton(this, this.container, 0, 0, 1, 'level' + num,
				    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['Level' + num + GameConfig.LOCALE],
				    true, true, true,
				    this.preNextState,
				    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
				    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
			    );
		    	temp.position.setTo(i * 540 + 270, 715);
		    	this.btns.push(temp);
		    }
	    }
	    for (let b of this.btns) {
		    b.inputEnabled = false;
	    }
	
	    this.legContainer = this.game.add.group();
	    this.leg1 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Leg,
		    this.legContainer
	    );
	    GuiUtils.centrizeCustom(this.leg1, .5, 0);
	    this.leg1.position.setTo(0, -4); // 0
	    this.leg1.angle = -14; // -18
	    this.leg2 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Leg,
		    this.legContainer
	    );
	    GuiUtils.centrizeCustom(this.leg2, .5, 0);
	    this.leg2.position.setTo(0, 0);
	    this.leg2.angle = 18; // 22
	    this.legContainer.position.setTo(283 - 540, -212);
	
	    this.legs = this.game.add.sprite(168, -204,
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames.Legs);
	    this.legs.alpha = 0;
	    
	    this.particle = new BlowParticles(1, 1.5);
	    this.particle.init(
		    ImageUtils.getAtlasClass('AtlasesEffects').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star1,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star2,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star3,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star4,
		    ], 250);
	    
	    this.ofTxt = this.game.add.sprite(216, 878,
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['Off' + GameConfig.LOCALE]);
	    this.numTxt = this.game.add.sprite(164, 878,
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['N1']);
	    this.ofTxt.alpha = 0;
	    this.numTxt.alpha = 0;
	    
        // GUI Buttons
	    this.gui.addGui();
	    this.leftBtn = this.gui.addExtraBtn(0, 447,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.LeftBtn,
		    this.moveSelection,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.rightBtn = this.gui.addExtraBtn(427, 447,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn,
		    this.moveSelection,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.DONE, this.nextState, 213, 848);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);
	    this.leftBtn.alpha = 0;
	    this.leftBtn.scale.setTo(0);
	    this.rightBtn.alpha = 0;
	    this.rightBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    this.moveLegs();
	    TweenUtils.move(this.legContainer, 283, -212, 2000, 0, () => {
		    for (let i = 0; i < this.selected * 2 + 2; i++) {
			    TweenUtils.delayedCall(2000 * i, this.moveLegs, this);
		    }
		    TweenUtils.move(this.container, this.container.x - 540 * 2 - 540 * 2 * this.selected, 0, 4000 + 4000 * this.selected, 0, () => {
		    	this.moveAndStopLegs();
			    this.selected++;
			    this.leftBtn.angle = 0;
			    this.leftBtn.filters = null;
			    this.leftBtn.scale.setTo(1);
			    this.rightBtn.angle = 0;
			    this.rightBtn.filters = null;
			    this.rightBtn.scale.setTo(1);
			    this.animating = false;
			    for (let b of this.btns) {
				    b.inputEnabled = true;
			    }
			    if (this.selected === 1) {
				    if (this.selected !== (GameConfig.PROGRESS + 1))
				        TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
			    }
			    else if (this.selected === (GameConfig.PROGRESS + 1)) {
				    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
			    }
			    else {
				    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
			    }
			    this.numTxt.loadTexture(
				    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['N' + this.selected]);
			    TweenUtils.fadeIn(this.ofTxt);
			    TweenUtils.fadeIn(this.numTxt);
		    }, this);
	    }, this);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }
    
    private moveLegs() {
	    TweenUtils.moveAndRotate(this.leg2, 0, -4, -14, 1000, 0, () => {
		    TweenUtils.moveAndRotate(this.leg2, 0, 0, 18, 1000, 0, () => {
			    //
		    }, this);
	    }, this);
	    TweenUtils.moveAndRotate(this.leg1, 0, -8, 18, 1000, 0, () => {
		    TweenUtils.moveAndRotate(this.leg1, 0, -4, -14, 1000, 0, () => {
			    //
		    }, this);
	    }, this);
    }
	
	private moveAndStopLegs() {
		TweenUtils.moveAndRotate(this.leg2, -3, -1, 8.2, 500, 0, () => {
			TweenUtils.moveAndRotate(this.leg2, 67, -44, 15.4, 500, 0, () => {
				TweenUtils.moveAndRotate(this.leg2, -3, -1, 8.2, 500, 0, () => {
					(this.particle as BlowParticles).setPos(
						this.legContainer.scale.x === 1 ? 210 : 330, 385);
					this.particle.start();
					TweenUtils.fadeIn(this.legs, 300);
					TweenUtils.fadeOut(this.legContainer, 300);
				}, this);
			}, this);
		}, this);
		TweenUtils.moveAndRotate(this.leg1, 0, 0, -3.2, 500, 0);
	}
    
    private moveSelection(sprite: Phaser.Button) {
    	if (this.animating) return;
    	this.animating = true;
    	for (let b of this.btns) {
    		b.filters = null;
    		b.inputEnabled = false;
	    }
	    TweenUtils.fadeAndScaleOut(this.leftBtn, 300);
	    TweenUtils.fadeAndScaleOut(this.rightBtn, 300);
	    TweenUtils.fadeOut(this.ofTxt, 300);
	    TweenUtils.fadeOut(this.numTxt, 300);
	    TweenUtils.fadeOut(this.legs, 300);
	    TweenUtils.fadeIn(this.legContainer, 300, 0, () => {
		    if (sprite === this.rightBtn) {
		    	this.legContainer.scale.set(1, 1);
			    this.legContainer.position.setTo(283, -212);
			    this.selected++;
			    this.moveLegs();
			    TweenUtils.delayedCall(2000, this.moveLegs, this);
			    TweenUtils.move(this.container, this.container.x - 540 * 2, 0, 4000, 0, () => {
				    this.moveAndStopLegs();
				    this.leftBtn.angle = 0;
				    this.leftBtn.filters = null;
				    this.rightBtn.angle = 0;
				    this.rightBtn.filters = null;
				    this.leftBtn.inputEnabled = false;
				    this.rightBtn.inputEnabled = false;
				    this.animating = false;
				    for (let b of this.btns) {
					    b.inputEnabled = true;
				    }
				    if (this.selected === 1) {
					    if (this.selected !== (GameConfig.PROGRESS + 1)) {
						    this.rightBtn.inputEnabled = true;
						    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
					    }
				    }
				    else if (this.selected === (GameConfig.PROGRESS + 1)) {
					    this.rightBtn.inputEnabled = true;
					    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				    }
				    else {
					    this.leftBtn.inputEnabled = true;
					    this.rightBtn.inputEnabled = true;
					    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
					    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
				    }
				    this.numTxt.loadTexture(
					    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
					    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['N' + this.selected]);
				    TweenUtils.fadeIn(this.ofTxt);
				    TweenUtils.fadeIn(this.numTxt);
			    }, this);
		    }
		    else {
			    this.legContainer.scale.set(-1, 1);
			    this.legContainer.position.setTo(257, -212);
			    this.selected--;
			    this.moveLegs();
			    TweenUtils.delayedCall(2000, this.moveLegs, this);
			    TweenUtils.move(this.container, this.container.x + 540 * 2, 0, 4000, 0, () => {
				    this.moveAndStopLegs();
				    this.leftBtn.angle = 0;
				    this.leftBtn.filters = null;
				    this.rightBtn.angle = 0;
				    this.rightBtn.filters = null;
				    this.leftBtn.inputEnabled = false;
				    this.rightBtn.inputEnabled = false;
				    this.animating = false;
				    for (let b of this.btns) {
					    b.inputEnabled = true;
				    }
				    if (this.selected === 1) {
					    if (this.selected !== (GameConfig.PROGRESS + 1)) {
						    this.rightBtn.inputEnabled = true;
					    	TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
					    }
				    }
				    else if (this.selected === (GameConfig.PROGRESS + 1)) {
					    this.rightBtn.inputEnabled = true;
					    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				    }
				    else {
					    this.leftBtn.inputEnabled = true;
					    this.rightBtn.inputEnabled = true;
					    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
					    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
				    }
				    this.numTxt.loadTexture(
					    ImageUtils.getAtlasClass('AtlasesStateSelectStage').getName(),
					    ImageUtils.getAtlasClass('AtlasesStateSelectStage').Frames['N' + this.selected]);
				    TweenUtils.fadeIn(this.ofTxt);
				    TweenUtils.fadeIn(this.numTxt);
			    }, this);
		    }
	    }, this);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.container.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
        this.gui.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }
	
	private preNextState(sprite: Phaser.Button): void {
    	this.NEXT = 'END';
    	this.nextState();
	}

    private nextState(): void {
        // this.selected;
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

