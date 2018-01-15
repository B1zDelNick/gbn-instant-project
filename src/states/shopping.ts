import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {HandyUtils} from '../utils/utility/handy.utils';
import {IParticle} from './spec-effects/particle/i.particle';
import {BlowParticles} from './spec-effects/particle/blow.particle';
import {EffectUtils} from '../utils/effect.utils';

export default class Shopping extends Phaser.State {

    private NEXT = 'DressShopping';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private particle: IParticle = null;
    private fader: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
    private panel: Phaser.Sprite = null;
    private stagePanel: Phaser.Sprite = null;
    private label: Phaser.Sprite = null;
    private basket: Phaser.Sprite = null;
    private basketB: Phaser.Sprite = null;
    private basketBtn: Phaser.Graphics = null;
    private cloud: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private stageTxt: Phaser.Sprite = null;
    private goBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    private closeBtn: Phaser.Button = null;
    private hintBtn: Phaser.Button = null;
    private container: Phaser.Group = null;
	private scoreText: Phaser.BitmapText = null;
    private doll: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    private tipShowing: boolean = true;
    private animating: boolean = false;
    private completed: boolean = false;
    private assocArray = {};
    private itemsArray: string[];
    private fallingArray: Phaser.Sprite[];
    private clickX: number = 0;
    private itemSpawn: number = 500;
    private itemSpeed: number = 5;
    private curTime: number = 0;
    private curItem: number = 0;
    private total: number = 0;
    private score: number = 0;
    private curStage: number = 0;
    private curTimeInSeconds: number = 0;
    private gameDuration: number = 10; // TODO change!!!

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.assocArray = {};
	    this.itemsArray = [];
	    this.fallingArray = [];
	    this.curTimeInSeconds = 0;
	    this.score = 0;
	    this.total = 0;
	    this.total = 0;
	    this.tipShowing = true;
	    this.animating = true;
	    this.completed = true;
	    this.curStage = 1;
    }

    public preload(): void {
    }

    public create(): void {

    	////// GAME PLAY

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg5').getName());
	    this.basketB = this.game.add.sprite(100, 709 + 400,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.BasketB);
	    this.basket = this.game.add.sprite(107, 711 + 400,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Basket);
	    GuiUtils.centrize(this.basketB);
	    GuiUtils.centrize(this.basket);
	
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

	    ///// ITEMS
	    
	    this.addItem('yes1', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y1);
	    this.addItem('yes2', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y2);
	    this.addItem('yes3', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y3);
	    this.addItem('yes4', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y4);
	    this.addItem('yes5', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y5);
	    this.addItem('yes6', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y6);
	    this.addItem('yes7', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y7);
	    this.addItem('yes8', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y8);
	    this.addItem('yes9', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y9);
	    this.addItem('yes10', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y10);
	    this.addItem('yes11', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y11);
	    this.addItem('yes12', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y12);
	    this.addItem('yes13', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y13);
	    this.addItem('yes14', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y14);
	    this.addItem('yes15', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Y15);
	    this.addItem('no1', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N1);
	    this.addItem('no2', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N2);
	    this.addItem('no3', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N3);
	    this.addItem('no4', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N4);
	    this.addItem('no5', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N5);
	    this.addItem('no6', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N6);
	    this.addItem('no7', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N7);
	    this.addItem('no8', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N8);
	    this.addItem('no9', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N9);
	    this.addItem('no10', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N10);
	    this.addItem('no11', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N11);
	    this.addItem('no12', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N12);
	    this.addItem('no13', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N13);
	    this.addItem('no14', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N14);
	    this.addItem('no15', ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.N15);

	    this.basketBtn = this.game.add.graphics(0, 700);
	    this.basketBtn.beginFill(0xffff00, 0);
	    this.basketBtn.drawRect(0, 0, 540, 260);
	    this.basketBtn.inputEnabled = true;
	    this.basketBtn.events.onInputDown.add(() => {
	    	this.clickX = Math.round(this.game.input.x);
	    	if (this.clickX < 50) this.clickX = 50;
	    	else if (this.clickX > 490) this.clickX = 490;
	    }, this);
	    this.basketBtn.inputEnabled = false;
	
	    this.stagePanel = this.game.add.sprite(43, 285 - 500,
		    ImageUtils.getAtlasClass('AtlasesStages').getName(),
		    ImageUtils.getAtlasClass('AtlasesStages').Frames.Panel);
	    this.stageTxt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStages').getName(),
		    ImageUtils.getAtlasClass('AtlasesStages').Frames['Level' + this.curStage + GameConfig.LOCALE]);
	    this.stageTxt.anchor.setTo(0.5);
	    GuiUtils.centrize(this.stageTxt);
	    this.stageTxt.position.setTo(267, 406 - 500);
	    
	    /////// COMMON STUFF

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
	    
	    this.cloud = this.game.add.sprite(19, 421 + 550,
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateStartComix').Frames.Cloud);
	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames['Txt' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(270, 675);
	    this.txt.alpha = 0;

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(422, 427,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
		        TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 421 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt).to({ y: this.txt.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
			    	TweenUtils.moveIn(this.panel, 152, 0, Phaser.Timer.SECOND * 1, 0);
			    	TweenUtils.moveIn(this.label, this.label.x, this.label.y + 300, Phaser.Timer.SECOND * 1, 0);
			    	TweenUtils.moveIn(this.scoreText, this.scoreText.x, this.scoreText.y + 300, Phaser.Timer.SECOND * 1, 0);
			    	TweenUtils.moveIn(this.basketB, this.basketB.x, this.basketB.y - 400, Phaser.Timer.SECOND * 1, 0);
			    	TweenUtils.moveIn(this.basket, this.basket.x, this.basket.y - 400, Phaser.Timer.SECOND * 1, 0, () => {
			    		this.clickX = this.basket.x;
					    this.basketBtn.inputEnabled = true;
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
				    this.completed = false;
				    this.tipShowing = false;
				    this.animating = false;
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
	    this.game.add.tween(this.cloud).to({ y: 421 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
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
    	HandyUtils.shuffleArray(this.itemsArray);
    	this.curTime = 0;
	    this.curTimeInSeconds = 0;
    	if (this.curStage === 1) {
		    this.itemSpawn = 110;
		    this.itemSpeed = 3;
	    }
	    else if (this.curStage === 2) {
		    this.itemSpawn = 85;
		    this.itemSpeed = 3.5;
	    }
	    else if (this.curStage === 3) {
		    this.itemSpawn = 65;
		    this.itemSpeed = 4;
	    }
    	this.curItem = 0;
    	this.total = 0;
	    this.launchNextItem();
	    // TweenUtils.delayedCall(Phaser.Timer.SECOND * 10, this.endLevel, this);
    }
    
    private launchNextItem() {
        const temp = this.assocArray[this.itemsArray[this.curItem++]] as Phaser.Sprite;
        temp.scale.setTo(1);
	    temp.scale.setTo(temp.height > 250 ? 250 / temp.height : 1);
        temp.angle = this.game.rnd.between(-40, 40);
        temp.x = this.game.rnd.between(65, 475);
        temp.y = -350;
        temp.alpha = 1;
        for (let tp of this.fallingArray) {
        	if (tp === temp) {
        		console.log('prevent duplicate');
        		this.launchNextItem();
        		return;
	        }
        }
        this.fallingArray.push(temp);
    }
    
    private addItem(name: string, asset: any) {
    	const temp = this.game.add.sprite(0, -700,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(), asset, this.container);
    	temp.name = name;
    	GuiUtils.centrize(temp);
    	this.itemsArray.push(name);
    	this.assocArray[name] = temp;
    }
    
    private showTip() {
    	if (this.animating) return;
    	this.animating = true;
    	if (this.tipShowing) {
		    this.game.add.tween(this.cloud).to({ y: 421 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
		    this.game.add.tween(this.txt).to({ y: this.txt.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
		    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
			    if (this.fader.inputEnabled) {
				    TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
					    this.fader.inputEnabled = false;
					    this.basketBtn.inputEnabled = true;
					    this.animating = false;
					    this.tipShowing = false;
				    }, this);
			    }
		    }, this);
	    }
	    else {
		    this.basketBtn.inputEnabled = false;
		    this.fader.inputEnabled = true;
		    this.txt.position.setTo(270, 675);
		    this.txt.alpha = 0;
		    TweenUtils.fadeIn(this.fader);
    		TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
		    this.game.add.tween(this.cloud).to({ y: 421 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
		    TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
		    	this.animating = false;
		    }, this);
		    this.tipShowing = true;
	    }
    }
    
    private endLevel() {
	    /*this.total++;
	    if (this.total === 30) {
		    this.completed = true;
		    TweenUtils.fadeAndScaleIn(this.playBtn, Phaser.Timer.SECOND * .75);
	    }*/
	    this.completed = true;
	    let delay = .25;
	    for (let i = 0; i < this.fallingArray.length; i++) {
	    	if (this.fallingArray[i].y > -50) {
			    TweenUtils.delayedCall(Phaser.Timer.SECOND * delay, () => {
				    TweenUtils.fadeAndScaleOut(this.fallingArray[i]);
				    (this.particle as BlowParticles).setPos(this.fallingArray[i].x, this.fallingArray[i].y);
				    this.particle.start();
			    }, this);
			    delay += .25;
		    }
	    	else {
			    TweenUtils.fadeAndScaleOut(this.fallingArray[i]);
		    }
	    }
	    TweenUtils.delayedCall(Phaser.Timer.SECOND * (delay + .5), () => {
		    this.fallingArray = [];
		    this.curStage++;
		    this.stageTxt.loadTexture(
			    ImageUtils.getAtlasClass('AtlasesStages').getName(),
			    ImageUtils.getAtlasClass('AtlasesStages').Frames['Level' + this.curStage + GameConfig.LOCALE]);
		    TweenUtils.fadeAndScaleOut(this.hintBtn);
		    this.goBtn.angle = 0;
		    this.goBtn.filters = null;
		    TweenUtils.scaleAndMoveAndBounceIn(this.scoreText, 270, 380, 2.5, Phaser.Timer.SECOND * 1, 0, () => {
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

    public update(): void {
        super.update(this.game);
        if (!this.tipShowing && !this.completed) {
        	this.curTimeInSeconds++;
        	this.curTime++;
        	// check game and
	        if (Math.floor(this.curTimeInSeconds / this.game.time.desiredFps) === this.gameDuration) {
	        	this.endLevel();
	        	return;
	        }
        	// Basket
        	const add = Math.round((this.clickX - this.basket.x) / 11);
        	this.basket.x += add;
        	this.basketB.x += add;
        	// Check Spawn
	        if (this.curTime >= this.itemSpawn) {
		        this.curTime = 0;
	        	if (this.curItem < 30) {
			        this.launchNextItem();
		        }
	        	else {
	        		console.log('reshuffle');
	        		this.curItem = 0;
			        HandyUtils.shuffleArray(this.itemsArray);
			        this.launchNextItem();
		        }
	        }
	        // Move items and Check for collisions
        	if (this.fallingArray.length !== 0) {
        		for (let i of this.fallingArray) {
        			i.y += this.itemSpeed;
        			if (i.y > 780 && i.y < 850) {
        				if ((i.x > this.basket.x - 80) && (i.x < this.basket.x + 80)) {
        					for (let d = 0; d < this.fallingArray.length; d++) {
        						if (this.fallingArray[d] === i) {
        							this.fallingArray.splice(d, 1);
        							TweenUtils.fadeAndScaleOut(i);
        							break;
						        }
					        }
					        if (i.name.toLowerCase().indexOf('yes') !== -1) {
						        (this.particle as BlowParticles).setPos(i.x, i.y);
						        this.particle.start();
						        this.score += 50;
						        this.scoreText.setText(' ' + this.score + ' ');
						        this.scoreText.updateText();
						        this.scoreText.updateTransform();
					        }
					        else {
					        	this.basket.filters = [EffectUtils.makeGlowAnimation(0xff0000, 200, true, 2)];
					        }
				        }
			        }
			        if (i.y > 1059) {
				        for (let d = 0; d < this.fallingArray.length; d++) {
					        if (this.fallingArray[d] === i) {
						        this.fallingArray.splice(d, 1);
						        TweenUtils.fadeAndScaleOut(i);
						        break;
					        }
				        }
			        }
		        }
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
        this.particle.dispose();
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

