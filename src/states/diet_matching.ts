import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {IParticle} from './spec-effects/particle/i.particle';
import {BlowParticles} from './spec-effects/particle/blow.particle';
import {HandyUtils} from '../utils/utility/handy.utils';
import {MatchCard} from './template/match/MatchCard';
import {isNull} from 'util';
import {EffectUtils} from '../utils/effect.utils';

export default class DietMatching extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private particle: IParticle = null;
	private fader: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
	private cloud: Phaser.Sprite = null;
	private txt: Phaser.Sprite = null;
	private panel: Phaser.Sprite = null;
	private stagePanel: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private stageTxt: Phaser.Sprite = null;
	private scoreText: Phaser.BitmapText = null;
	private goBtn: Phaser.Button = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
	private container: Phaser.Group = null;
    private doll: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private completed: boolean = false;
	
	private curStage: number = 0;
	private total: number = 0;
	
	private items: string[] = [];
	private cards: MatchCard[] = [];
	private firstCard: MatchCard = null;
	private secondCard: MatchCard = null;
	private curTimeInSeconds: number = 0;
	private gameDuration: number = 5;
	private score: number = 0;
    
    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.tipShowing = true;
	    this.animating = true;
	    this.completed = true;
	    this.curStage = 1;
	    this.total = 0;
	    this.curTimeInSeconds = 0;
	    this.score = 0;
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg8').getName());
	
        /// game
        
	    this.container = this.game.add.group();
	
	    this.particle = new BlowParticles(.5, 1);
	    this.particle.init(
		    ImageUtils.getAtlasClass('AtlasesEffects').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star1,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star2,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star3,
			    ImageUtils.getAtlasClass('AtlasesEffects').Frames.Star4,
		    ]);
	    
	    // scoring
	
	    this.panel = this.game.add.sprite(152, 0 - 300,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Panel);
	    this.label = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames['Score' + GameConfig.LOCALE]);
	    this.scoreText = this.game.add.bitmapText(
		    this.game.world.centerX, 70 - 300,
		    ImageUtils.getBitmapFontClass('FontsFontBig').getName(),
		    '0', 65);
	    this.scoreText.anchor.setTo(0.5);
	    GuiUtils.centrize(this.label);
	    this.label.position.setTo(270, 30 - 300);
	    
	    //// stage labels
	
	    this.stagePanel = this.game.add.sprite(43, 285 - 500,
		    ImageUtils.getAtlasClass('AtlasesStages').getName(),
		    ImageUtils.getAtlasClass('AtlasesStages').Frames.Panel);
	    this.stageTxt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStages').getName(),
		    ImageUtils.getAtlasClass('AtlasesStages').Frames['Level' + this.curStage + GameConfig.LOCALE]);
	    this.stageTxt.anchor.setTo(0.5);
	    GuiUtils.centrize(this.stageTxt);
	    this.stageTxt.position.setTo(267, 406 - 500);
	    
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
	
	    this.cloud = this.game.add.sprite(43, 501 + 550,
		    ImageUtils.getAtlasClass('AtlasesStateDietMatching').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDietMatching').Frames.Cloud);
	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateDietMatching').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDietMatching').Frames['Txt' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(270, 710);
	    this.txt.alpha = 0;

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(412, 495,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 501 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt).to({ y: this.txt.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.moveIn(this.panel, 152, 0, Phaser.Timer.SECOND * 1, 0);
				    TweenUtils.moveIn(this.label, this.label.x, this.label.y + 300, Phaser.Timer.SECOND * 1, 0);
				    TweenUtils.moveIn(this.scoreText, this.scoreText.x, this.scoreText.y + 300, Phaser.Timer.SECOND * 1, 0, () => {
					    TweenUtils.moveIn(this.stagePanel, 43, 285, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
					    TweenUtils.moveIn(this.stageTxt, 267, 406, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
					    TweenUtils.fadeAndScaleIn(this.goBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
	    this.goBtn = this.gui.addExtraBtn(201, 446,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.GoBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.goBtn);
			    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
			    TweenUtils.moveOut(this.stagePanel, 43, 285 - 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0);
			    TweenUtils.moveOut(this.stageTxt, 267, 406 - 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 0, () => {
				    /*this.completed = false;
				    this.tipShowing = false;
				    this.animating = false;*/
			    	this.startLevel();
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.goBtn.alpha = 0;
	    this.goBtn.scale.setTo(0);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.RIGHT, this.nextState, 204, 834);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
	    this.game.add.tween(this.cloud).to({ y: 501 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
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
	
	private startLevel() {
    	this.total = 0;
		this.curTimeInSeconds = 0;
    	this.items = [];
    	this.cards = [];
		this.firstCard = null;
		this.secondCard = null;
    	if (this.curStage === 1) {
    		this.gameDuration = 30;
    		this.items.push('card1');
    		this.items.push('card1');
    		this.items.push('card2');
    		this.items.push('card2');
    		this.items.push('card3');
    		this.items.push('card3');
    		this.items.push('card4');
    		this.items.push('card4');
    		this.items.push('card5');
    		this.items.push('card5');
    		this.items.push('card6');
    		this.items.push('card6');
    		HandyUtils.shuffleArray(this.items);
    		let i: number = 0;
    		for (let x: number = 0; x < 3; x++) {
			    for (let y: number = 0; y < 4; y++) {
			    	const name = this.items[i++];
			    	this.addItem(name, 109 + x * 103, 241 + y * 140);
			    }
		    }
	    }
	    else if (this.curStage === 2) {
		    this.gameDuration = 45;
		    this.items.push('card1');
		    this.items.push('card1');
		    this.items.push('card2');
		    this.items.push('card2');
		    this.items.push('card3');
		    this.items.push('card3');
		    this.items.push('card4');
		    this.items.push('card4');
		    this.items.push('card5');
		    this.items.push('card5');
		    this.items.push('card6');
		    this.items.push('card6');
		    this.items.push('card7');
		    this.items.push('card7');
		    this.items.push('card8');
		    this.items.push('card8');
		    this.items.push('card9');
		    this.items.push('card9');
		    HandyUtils.shuffleArray(this.items);
		    let i: number = 0;
		    for (let x: number = 0; x < 4; x++) {
			    const name = this.items[i++];
			    this.addItem(name, 59 + x * 103, 241);
		    }
		    for (let x: number = 0; x < 5; x++) {
			    const name = this.items[i++];
			    this.addItem(name, 7 + x * 103, 241 + 140);
		    }
		    for (let x: number = 0; x < 5; x++) {
			    const name = this.items[i++];
			    this.addItem(name, 7 + x * 103, 241 + 140 * 2);
		    }
		    for (let x: number = 0; x < 4; x++) {
			    const name = this.items[i++];
			    this.addItem(name, 59 + x * 103, 241 + 140 * 3);
		    }
	    }
	    else if (this.curStage === 3) {
		    this.gameDuration = 60;
		    this.items.push('card1');
		    this.items.push('card1');
		    this.items.push('card2');
		    this.items.push('card2');
		    this.items.push('card3');
		    this.items.push('card3');
		    this.items.push('card4');
		    this.items.push('card4');
		    this.items.push('card5');
		    this.items.push('card5');
		    this.items.push('card6');
		    this.items.push('card6');
		    this.items.push('card7');
		    this.items.push('card7');
		    this.items.push('card8');
		    this.items.push('card8');
		    this.items.push('card9');
		    this.items.push('card9');
		    this.items.push('card10');
		    this.items.push('card10');
		    this.items.push('card11');
		    this.items.push('card11');
		    this.items.push('card12');
		    this.items.push('card12');
		    this.items.push('card13');
		    this.items.push('card13');
		    this.items.push('card14');
		    this.items.push('card14');
		    this.items.push('card15');
		    this.items.push('card15');
		    HandyUtils.shuffleArray(this.items);
		    let i: number = 0;
		    for (let x: number = 0; x < 5; x++) {
			    for (let y: number = 0; y < 6; y++) {
				    const name = this.items[i++];
				    this.addItem(name, 7 + x * 103, 110 + y * 140);
			    }
		    }
	    }
		for (let c of this.cards) {
			c.disable();
		}
	    let delay: number = 0;
	    for (let c of this.cards) {
    		c.show(delay);
    		if (this.curStage === 1) {
    			delay += 150;
		    }
		    else if (this.curStage === 2) {
			    delay += 100;
		    }
		    else if (this.curStage === 3) {
			    delay += 75;
		    }
	    }
	    TweenUtils.delayedCall(delay + 500, () => {
		    this.completed = false;
		    this.tipShowing = false;
		    this.animating = false;
	    	for (let c of this.cards) {
			    c.enable();
		    }
	    }, this);
	}
	
	private endLevel() {
		this.completed = true;
		let delay = .1;
		for (let c of this.cards) {
			if (!c.isCompleted()) {
				TweenUtils.delayedCall(Phaser.Timer.SECOND * delay, () => {
					c.hide(delay);
				}, this);
				delay += .1;
			}
		}
		TweenUtils.delayedCall(Phaser.Timer.SECOND * (delay + .5), () => {
			for (let c of this.cards) {
				c.dispose();
				c = null;
			}
			this.curStage++;
			this.stageTxt.loadTexture(
				ImageUtils.getAtlasClass('AtlasesStages').getName(),
				ImageUtils.getAtlasClass('AtlasesStages').Frames['Level' + this.curStage + GameConfig.LOCALE]);
			TweenUtils.fadeAndScaleOut(this.hintBtn);
			this.goBtn.angle = 0;
			this.goBtn.filters = null;
			TweenUtils.scaleAndMoveAndBounceIn(this.scoreText, 270, 380, 2.5, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				this.scoreText.filters = [EffectUtils.makeLightGlowAnimation(0x00cc00, 350, true, 2, 250)];
				TweenUtils.moveAndScaleOut(this.scoreText, 270, 70, 1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 2, () => {
					if (this.curStage === 4) {
						TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
					}
					else {
						TweenUtils.moveIn(this.stagePanel, 43, 285, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
						TweenUtils.moveIn(this.stageTxt, 267, 406, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
						TweenUtils.fadeAndScaleIn(this.goBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
					}
				}, this);
			}, this);
		}, this);
	}
	
	private addItem(name: string, x: number, y: number) {
		const temp = new MatchCard(this,
			this.container, name, 'AtlasesStateDietMatching', 'CardBack', 'Card', x, y, this.onTurn
		);
		this.cards.push(temp);
	}
	
	private onTurn(card: MatchCard) {
		if (isNull(this.firstCard)) {
			this.firstCard = card.turnOn();
		}
		else {
			this.secondCard = card.turnOn();
			for (let c of this.cards) {
				c.disable();
			}
			TweenUtils.delayedCall(Phaser.Timer.SECOND * .61, this.checkCards, this);
		}
	}
	
	private checkCards() {
    	if (this.firstCard.getName() === this.secondCard.getName()) {
    		this.firstCard.glowSuccess();
    		this.secondCard.glowSuccess();
		    (this.particle as BlowParticles).setPos(this.firstCard.getCenter().x, this.firstCard.getCenter().y);
		    this.particle.start();
		    (this.particle as BlowParticles).setPos(this.secondCard.getCenter().x, this.secondCard.getCenter().y);
		    this.particle.start();
		    this.score += 50;
		    this.scoreText.setText(' ' + this.score + ' ');
		    this.scoreText.updateText();
		    this.scoreText.updateTransform();
    		TweenUtils.delayedCall(Phaser.Timer.SECOND * 1.5, () => {
    			this.total++;
    			if (this.curStage === 1 && this.total === 6) {
				    this.endLevel();
				    this.firstCard = null;
				    this.secondCard = null;
			    }
			    else if (this.curStage === 2 && this.total === 9) {
				    this.endLevel();
				    this.firstCard = null;
				    this.secondCard = null;
			    }
			    else if (this.curStage === 3 && this.total === 15) {
				    this.endLevel();
				    this.firstCard = null;
				    this.secondCard = null;
			    }
			    else {
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * .1, () => {
					    for (let c of this.cards) {
						    c.enable();
					    }
					    this.firstCard = null;
					    this.secondCard = null;
				    }, this);
			    }
		    }, this);
	    }
	    else {
    		this.firstCard.glowFailure();
    		this.secondCard.glowFailure();
		    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
			    this.firstCard.turnOff();
			    this.secondCard.turnOff();
			    
			    TweenUtils.delayedCall(Phaser.Timer.SECOND * .61, () => {
				    for (let c of this.cards) {
					    c.enable();
				    }
				    this.firstCard = null;
				    this.secondCard = null;
			    }, this);
		    }, this);
	    }
	}
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud).to({ y: 501 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt).to({ y: this.txt.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
				if (this.fader.inputEnabled) {
					TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
						this.fader.inputEnabled = false;
						this.animating = false;
						this.tipShowing = false;
					}, this);
				}
			}, this);
		}
		else {
			this.fader.inputEnabled = true;
			this.txt.position.setTo(270, 710);
			this.txt.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud).to({ y: 501 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
				this.animating = false;
			}, this);
			this.tipShowing = true;
		}
	}

    public update(): void {
        super.update(this.game);
	    if (!this.tipShowing && !this.completed) {
		    this.curTimeInSeconds++;
		    // check game and
		    if (Math.floor(this.curTimeInSeconds / this.game.time.desiredFps) >= this.gameDuration) {
		    	if (!isNull(this.secondCard)) {
		    		return;
			    }
			    for (let c of this.cards) {
				    c.disable();
			    }
			    this.completed = true;
			    TweenUtils.delayedCall(1000, this.endLevel, this);
			    return;
		    }
	    }
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

