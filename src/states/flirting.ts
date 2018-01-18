import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {EffectUtils} from '../utils/effect.utils';
import {SoundUtils} from '../utils/sound/sound.utils';
import {ProgressBar} from './progress/progress.bar';
import {IParticle} from './spec-effects/particle/i.particle';
import {HeartsParticles} from './spec-effects/particle/hearts.particle';

export default class Flirting extends Phaser.State {

    private NEXT = 'SelectStage';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private particle: IParticle = null;
	private container: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
	private panel: Phaser.Sprite = null;
	private panel2: Phaser.Sprite = null;
	private label: Phaser.Sprite = null;
	private label2: Phaser.Sprite = null;
	private scoreText: Phaser.BitmapText = null;
	private scoreText2: Phaser.BitmapText = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
	private leftBtn: Phaser.Button = null;
	private rightBtn: Phaser.Button = null;
    private heroBar: ProgressBar = null;
    private rivalBar: ProgressBar = null;
    private doll: Doll = null;
    private hero: Doll = null;
    private rival: Doll = null;
    private man1: Doll = null;
    private man2: Doll = null;
    private man3: Doll = null;
    private man4: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private completed: boolean = false;
	private tumming: boolean = false;
	private tumming2: boolean = false;
	private tummingHero: number = 0;
	private tummingRival: number = 0;
	private curTimeInSeconds: number = 0;
	private gameDuration: number = 5;
	private score: number = 0;
	private selected: number = 0;
	private total: number = 0;
	private rivalTotal: number = 0;
	private currentMan: Doll = null;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.tipShowing = true;
	    this.animating = false;
	    this.completed = false;
	    this.tumming = false;
	    this.tumming2 = false;
	    this.curTimeInSeconds = 0;
	    this.score = 0;
	    this.total = 0;
	    this.rivalTotal = 0;
	    this.selected = 2;
	    this.currentMan = null;
	    // SoundUtils.play('DietTheme');
    }

    public preload(): void {
	    GameConfig.SELECTED_ACTOR = 1; // TODO
    }

    public create(): void {

	    this.container = this.game.add.group();
	    this.container.add(this.game.add.sprite(4 * 540, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Bg15));
	    this.container.add(this.game.add.sprite(3 * 540, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Bg15));
	    this.container.add(this.game.add.sprite(2 * 540, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Bg15));
	    this.container.add(this.game.add.sprite(1 * 540, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Bg15));
	    this.container.add(this.game.add.sprite(0 * 540, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Bg15));
	    this.container.x = -540 * this.selected;
	
	    this.particle = new HeartsParticles(.75, 1.25);
	    this.particle.init(
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    [
			    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Hrt1,
			    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Hrt2,
		    ], 40);
		(this.particle as HeartsParticles).addToContainer(this.container);
	    this.particle.start();
	    (this.particle as HeartsParticles).off();
	    
	    /// mans
	
	    this.man1 = new Doll(this, 151, 161)
		    .setListeners(this, this.onStartTamming)
		    .layer(0, 0, 'body',
			    'AtlasesDollChallFlirtingMan1',
			    'Body', 'Body')
		    .lipsL(62, 0, 'lips',
			    'AtlasesDollChallFlirtingMan1',
			    'Lp', 'Lp')
		    .eyesL(62, 0, 'eyes',
			    'AtlasesDollChallFlirtingMan1',
			    'Ee', 'Ee')
		    .layer(62, 0, 'sad',
			    'AtlasesDollChallFlirtingMan1',
			    'Sad', 'Sad')
		    .layer(48, -15, 'hair',
			    'AtlasesDollChallFlirtingMan1',
			    'H', 'H')
		    .layer(59, 48, 'hl',
			    'AtlasesDollChallFlirtingMan1',
			    'Hl', 'Hl')
		    .layer(91, 41, 'hr',
			    'AtlasesDollChallFlirtingMan1',
			    'Hr', 'Hr');
	    this.container.add(this.man1.getBody());
	    this.man2 = new Doll(this, 151 + 540, 161)
		    .setListeners(this, this.onStartTamming)
		    .layer(0, 0, 'body',
			    'AtlasesDollChallFlirtingMan2',
			    'Body', 'Body')
		    .lipsL(62, 0, 'lips',
			    'AtlasesDollChallFlirtingMan2',
			    'Lp', 'Lp')
		    .eyesL(62, 0, 'eyes',
			    'AtlasesDollChallFlirtingMan2',
			    'Ee', 'Ee')
		    .layer(62, 0, 'sad',
			    'AtlasesDollChallFlirtingMan2',
			    'Sad', 'Sad')
		    .layer(56, 34, 'glass',
			    'AtlasesDollChallFlirtingMan2',
			    'Gs', 'Gs')
		    .layer(44, -20, 'hair',
			    'AtlasesDollChallFlirtingMan2',
			    'H', 'H')
		    .layer(59, 48, 'hl',
			    'AtlasesDollChallFlirtingMan2',
			    'Hl', 'Hl')
		    .layer(91, 41, 'hr',
			    'AtlasesDollChallFlirtingMan2',
			    'Hr', 'Hr');
	    this.container.add(this.man2.getBody());
	    this.man3 = new Doll(this, 151 + 540 * 3, 161)
		    .setListeners(this, this.onStartTamming)
		    .layer(0, 0, 'body',
			    'AtlasesDollChallFlirtingMan3',
			    'Body', 'Body')
		    .lipsL(67, 0, 'lips',
			    'AtlasesDollChallFlirtingMan3',
			    'Lp', 'Lp')
		    .eyesL(67, 0, 'eyes',
			    'AtlasesDollChallFlirtingMan3',
			    'Ee', 'Ee')
		    .layer(67, 0, 'sad',
			    'AtlasesDollChallFlirtingMan3',
			    'Sad', 'Sad')
		    .layer(60, 38, 'glass',
			    'AtlasesDollChallFlirtingMan3',
			    'Gs', 'Gs')
		    .layer(58, -10, 'hair',
			    'AtlasesDollChallFlirtingMan3',
			    'H', 'H')
		    .layer(62, 47, 'hl',
			    'AtlasesDollChallFlirtingMan3',
			    'Hl', 'Hl')
		    .layer(93, 41, 'hr',
			    'AtlasesDollChallFlirtingMan3',
			    'Hr', 'Hr');
	    this.container.add(this.man3.getBody());
	    this.man4 = new Doll(this, 151 + 540 * 4, 161)
		    .setListeners(this, this.onStartTamming)
		    .layer(0, 0, 'body',
			    'AtlasesDollChallFlirtingMan4',
			    'Body', 'Body')
		    .lipsL(64, 0, 'lips',
			    'AtlasesDollChallFlirtingMan4',
			    'Lp', 'Lp')
		    .eyesL(64, 0, 'eyes',
			    'AtlasesDollChallFlirtingMan4',
			    'Ee', 'Ee')
		    .layer(64, 0, 'sad',
			    'AtlasesDollChallFlirtingMan4',
			    'Sad', 'Sad')
		    .layer(49, -15, 'hair',
			    'AtlasesDollChallFlirtingMan4',
			    'H', 'H')
		    .layer(63, 43, 'hl',
			    'AtlasesDollChallFlirtingMan4',
			    'Hl', 'Hl')
		    .layer(90, 39, 'hr',
			    'AtlasesDollChallFlirtingMan4',
			    'Hr', 'Hr');
	    this.container.add(this.man4.getBody());
	    
	    this.man1.getBody().filters = [EffectUtils.makeGlowAnimation(0xffff66, 500)];
	    this.man2.getBody().filters = [EffectUtils.makeGlowAnimation(0xffff66, 500)];
	    this.man3.getBody().filters = [EffectUtils.makeGlowAnimation(0xffff66, 500)];
	    this.man4.getBody().filters = [EffectUtils.makeGlowAnimation(0xffff66, 500)];
	    
	    GuiUtils.centrize(this.man1.getLayerSprite('hl'));
	    this.man1.getLayerSprite('hl').alpha = 0;
	    this.man1.getLayerSprite('hl').scale.setTo(0);
	    GuiUtils.centrize(this.man2.getLayerSprite('hl'));
	    this.man2.getLayerSprite('hl').alpha = 0;
	    this.man2.getLayerSprite('hl').scale.setTo(0);
	    GuiUtils.centrize(this.man3.getLayerSprite('hl'));
	    this.man3.getLayerSprite('hl').alpha = 0;
	    this.man3.getLayerSprite('hl').scale.setTo(0);
	    GuiUtils.centrize(this.man4.getLayerSprite('hl'));
	    this.man4.getLayerSprite('hl').alpha = 0;
	    this.man4.getLayerSprite('hl').scale.setTo(0);
	    GuiUtils.centrize(this.man1.getLayerSprite('hr'));
	    this.man1.getLayerSprite('hr').alpha = 0;
	    this.man1.getLayerSprite('hr').scale.setTo(0);
	    GuiUtils.centrize(this.man2.getLayerSprite('hr'));
	    this.man2.getLayerSprite('hr').alpha = 0;
	    this.man2.getLayerSprite('hr').scale.setTo(0);
	    GuiUtils.centrize(this.man3.getLayerSprite('hr'));
	    this.man3.getLayerSprite('hr').alpha = 0;
	    this.man3.getLayerSprite('hr').scale.setTo(0);
	    GuiUtils.centrize(this.man4.getLayerSprite('hr'));
	    this.man4.getLayerSprite('hr').alpha = 0;
	    this.man4.getLayerSprite('hr').scale.setTo(0);
	
	    this.hero = new Doll(this, 140 + 540, 210) // 240
		    .layer(64, 0, 'leg_b',
			    'AtlasesDollChallFlirtingMonica',
			    'Leg', 'Leg')
		    .layer(44, 325, 'leg_f',
			    'AtlasesDollChallFlirtingMonica',
			    'Leg', 'Leg')
		    .layer(-3, 80, 'hand_b',
			    'AtlasesDollChallFlirtingMonica',
			    'HandF', 'HandF')
		    .layer(61, -57, 'hair_b',
			    'AtlasesDollChallFlirtingMonica',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollChallFlirtingMonica',
			    'Body', 'Body')
		    .layer(135, 72, 'hand_f',
			    'AtlasesDollChallFlirtingMonica',
			    'HandB', 'HandB')
		    .layer(61, -57, 'head',
			    'AtlasesDollChallFlirtingMonica',
			    'Head', 'Head')
		    .layer(61, -57, 'lip',
			    'AtlasesDollChallFlirtingMonica',
			    'Lip', 'Lip')
		    .layer(61, -57, 'kiss',
			    'AtlasesDollChallFlirtingMonica',
			    'Kiss', 'Kiss');
	    this.hero.getLayerSprite('leg_f').anchor.setTo(.5, 0);
	    this.hero.getLayerSprite('leg_b').anchor.setTo(.5, 0);
	    this.hero.getLayerSprite('leg_f').position.setTo(119, 329);
	    this.hero.getLayerSprite('leg_f').angle = -9;
	    this.hero.getLayerSprite('leg_b').position.setTo(114, 319);
	    this.hero.getLayerSprite('leg_b').angle = -2;
	    GuiUtils.centrizeCustom(this.hero.getLayerSprite('hand_f'), .25, .06);
	    GuiUtils.centrizeCustom(this.hero.getLayerSprite('hand_b'), .9, .1);
	    this.hero.getLayerSprite('hand_f').angle = 20;
	    this.hero.getLayerSprite('hand_b').angle = -20;
	
	    this.rival = new Doll(this, 140 + 540, 210) // 240
		    .layer(64, 0, 'leg_b',
			    'AtlasesDollChallFlirtingOlivia',
			    'Leg', 'Leg')
		    .layer(63, 323, 'leg_f',
			    'AtlasesDollChallFlirtingOlivia',
			    'Leg', 'Leg')
		    .layer(-54, 79, 'hand_b',
			    'AtlasesDollChallFlirtingOlivia',
			    'HandB', 'HandB')
		    .layer(0, 0, 'body',
			    'AtlasesDollChallFlirtingOlivia',
			    'Body', 'Body')
		    .layer(85, 70, 'hand_f',
			    'AtlasesDollChallFlirtingOlivia',
			    'HandF', 'HandF')
		    .layer(34, -64, 'head',
			    'AtlasesDollChallFlirtingOlivia',
			    'Head', 'Head')
		    .layer(34, -64, 'lip',
			    'AtlasesDollChallFlirtingOlivia',
			    'Lip', 'Lip')
		    .layer(34, -64, 'kiss',
			    'AtlasesDollChallFlirtingOlivia',
			    'Kiss', 'Kiss');
	    this.rival.getLayerSprite('leg_f').anchor.setTo(.5, 0);
	    this.rival.getLayerSprite('leg_b').anchor.setTo(.5, 0);
	    this.rival.getLayerSprite('leg_f').position.setTo(68, 323);
	    this.rival.getLayerSprite('leg_f').angle = -9; // 5.5
	    this.rival.getLayerSprite('leg_b').position.setTo(72, 316);
	    this.rival.getLayerSprite('leg_b').angle = -2; //
	    GuiUtils.centrizeCustom(this.rival.getLayerSprite('hand_f'), .25, .06);
	    GuiUtils.centrizeCustom(this.rival.getLayerSprite('hand_b'), .9, .1);
	    this.rival.getLayerSprite('hand_f').angle = 20;
	    this.rival.getLayerSprite('hand_b').angle = -20;
	    
	    /// bars
	    
	    this.heroBar = new ProgressBar(85, 27)
		    .addFrame(0, 0, 'AtlasesStateFlirting', 'BarBase1')
		    .addBar(49, 13, 'AtlasesStateFlirting', 'BarBar1')
		    .addSprite(298, 0, 'AtlasesStateFlirting', 'Sparks');
	    this.rivalBar = new ProgressBar(85, 76)
		    .addFrame(0, 0, 'AtlasesStateFlirting', 'BarBase2')
		    .addBar(50, 12, 'AtlasesStateFlirting', 'BarBar2')
		    .addSprite(298, 0, 'AtlasesStateFlirting', 'Sparks');
	    this.heroBar.getBody().alpha = 0;
	    this.rivalBar.getBody().alpha = 0;
	
	    // scoring
	
	    this.panel = this.game.add.sprite(152, 830 + 300,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames.Panel,
	    );
	    this.label = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateShopping').Frames['Score' + GameConfig.LOCALE],
	    );
	    this.scoreText = this.game.add.bitmapText(
		    this.game.world.centerX, 900 + 300,
		    ImageUtils.getBitmapFontClass('FontsFontBig').getName(),
		    '0', 65,
	    );
	    this.scoreText.anchor.setTo(0.5);
	    GuiUtils.centrize(this.label);
	    this.label.position.setTo(270, 860 + 300);

	    this.panel2 = this.game.add.sprite(42, 6 - 400,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Score,
	    );
	    this.label2 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames['Label' + GameConfig.LOCALE],
	    );
	    this.scoreText2 = this.game.add.bitmapText(
		    this.game.world.centerX, 900 + 300,
		    ImageUtils.getBitmapFontClass('FontsFontBig').getName(),
		    '0', 65,
	    );
	    this.scoreText2.anchor.setTo(0.5);
	    GuiUtils.centrize(this.label2);
	    this.label2.position.setTo(270, 860 - 400);

	    /// tips
	
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
	
	    this.cloud = this.game.add.sprite(32, 419 + 550,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames.Cloud);
	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateFlirting').Frames['Txt' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(265, 675);
	    this.txt.alpha = 0;

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(412, 421,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 419 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt).to({ y: this.txt.y + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.moveIn(this.panel, 152, 830, Phaser.Timer.SECOND * 1, 0);
				    TweenUtils.moveIn(this.label, this.label.x, this.label.y - 300, Phaser.Timer.SECOND * 1, 0);
				    TweenUtils.moveIn(this.scoreText, this.scoreText.x, this.scoreText.y - 300, Phaser.Timer.SECOND * 1, 0, () => {
					    // move in girl
					    TweenUtils.move(this.hero.getBody(), 140, this.hero.getBody().y, 2000);
					    this.startMoveHero();
					    TweenUtils.delayedCall(250, this.moveHero, this);
					    TweenUtils.delayedCall(1750, this.endMoveHero, this);
					    TweenUtils.delayedCall(2000, () => {
						    this.completed = false;
						    this.tipShowing = false;
						    this.animating = false;
						    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
						    TweenUtils.fadeAndScaleIn(this.rightBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
						    TweenUtils.fadeAndScaleIn(this.leftBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
					    }, this);
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
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
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.DONE, () => {
		    TweenUtils.fadeAndScaleOut(this.playBtn);
		    // viral
	    }, 216, 840);
	    const nextBtn = this.gui.addExtraBtn(216, 840,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn, this.nextState,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null
	    );
	    nextBtn.alpha = 0;
	    nextBtn.scale.setTo(0);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);
	    this.leftBtn.alpha = 0;
	    this.leftBtn.scale.setTo(0);
	    this.rightBtn.alpha = 0;
	    this.rightBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
	    this.game.add.tween(this.cloud).to({ y: 419 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
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
    
    private onStartTamming() {
    	if (this.animating) return;
    	if (this.tumming) {
		    this.tummingHero += .033;
		    if (this.tummingHero > 1) this.tummingHero = 1;
		    if (this.tummingHero >= 1) {
			    (this.particle as HeartsParticles).off();
			    if (this.tumming2) {
			        TweenUtils.delayedCall(500, this.endRivalTamming, this);
				    TweenUtils.fadeOut(this.rivalBar.getBody());
			    }
		    	this.tumming = false;
		    	this.tumming2 = false;
			    this.heroBar.setValue(1);
			    this.currentMan.disableListeners();
			    TweenUtils.fadeOut(this.heroBar.getBody(), 500, 1000);
			    TweenUtils.fadeOut(this.currentMan.getLayerSprite('sad'), 300);
			    TweenUtils.fadeAndDoubleScaleIn(this.currentMan.getLayerSprite('hl'), 750);
			    TweenUtils.fadeAndDoubleScaleIn(this.currentMan.getLayerSprite('hr'), 750, 250);
			    TweenUtils.fadeOut(this.hero.getLayerSprite('kiss'), 300);
			    TweenUtils.fadeIn(this.hero.getLayerSprite('lip'), 300);
			    this.score += 50;
			    this.scoreText.setText(this.score.toString());
			    if (this.total === 4) {
				    TweenUtils.moveIn(this.panel, 152, 830 + 300, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
				    TweenUtils.moveIn(this.label, this.label.x, this.label.y + 300, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
				    TweenUtils.moveIn(this.scoreText, this.scoreText.x, this.scoreText.y + 300, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    	this.container.add(this.hero.getBody());
					    this.hero.getBody().x += this.selected * 540;
					    // bluring stage
					    TweenUtils.delayedCall(500, () => {
						    EffectUtils.makeBlurAnimation(this.container, 16, 1500, false, 0);
						    // score
						    // icons
					    }, this);
				    }, this);
			    	return;
			    }
			    if (this.selected === 0) {
				    this.rightBtn.inputEnabled = true;
				    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
			    }
			    else if (this.selected === 4) {
				    this.leftBtn.inputEnabled = true;
				    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
			    }
			    else {
				    this.rightBtn.inputEnabled = true;
				    this.leftBtn.inputEnabled = true;
				    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
			    }
			    return;
		    }
		    this.heroBar.setValue(this.tummingHero);
    		return;
	    }
    	if (this.container.x === 0) {
    		this.currentMan = this.man1;
	    }
	    else if (this.container.x === -540) {
		    this.currentMan = this.man2;
	    }
	    else if (this.container.x === -540 * 3) {
		    this.currentMan = this.man3;
	    }
	    else if (this.container.x === -540 * 4) {
		    this.currentMan = this.man4;
	    }
	    this.total++;
	    (this.particle as HeartsParticles).setPos(this.currentMan.getBody().x + 95, this.currentMan.getBody().y + 65);
	    (this.particle as HeartsParticles).on();
	    TweenUtils.fadeIn(this.hero.getLayerSprite('kiss'), 300);
	    TweenUtils.fadeOut(this.hero.getLayerSprite('lip'), 300);
	    this.leftBtn.angle = 0;
	    this.leftBtn.filters = null;
	    this.leftBtn.inputEnabled = false;
	    this.rightBtn.angle = 0;
	    this.rightBtn.filters = null;
	    this.rightBtn.inputEnabled = false;
	    TweenUtils.fadeAndScaleOut(this.leftBtn, 300);
	    TweenUtils.fadeAndScaleOut(this.rightBtn, 300);
        this.tumming = true;
    	this.tummingHero = .01;
    	this.tummingRival = .01;
    	// this.currentMan.disableListeners();
    	this.currentMan.getBody().filters = null;
    	this.heroBar.setValue(this.tummingHero);
    	this.rivalBar.setValue(this.tummingRival);
    	TweenUtils.fadeIn(this.heroBar.getBody());
    	if (this.total === 1) {
    		if (this.game.rnd.between(1, 2) === 2) {
    			this.rivalTotal++;
    			TweenUtils.delayedCall(1000, this.startRivalTamming, this);
		    }
	    }
	    else if (this.total === 2 && this.rivalTotal === 0) {
		    this.rivalTotal++;
		    TweenUtils.delayedCall(1000, this.startRivalTamming, this);
	    }
	    else if (this.total === 3) {
		    if (this.game.rnd.between(1, 2) === 2) {
			    this.rivalTotal++;
			    TweenUtils.delayedCall(1000, this.startRivalTamming, this);
		    }
	    }
	    else if (this.total === 4 && this.rivalTotal === 1) {
		    this.rivalTotal++;
		    TweenUtils.delayedCall(1000, this.startRivalTamming, this);
	    }
    }
	
	private startRivalTamming() {
    	if (this.hero.getBody().scale.x === 1) {
    		this.rival.setScale(-1, 1);
		    this.rival.getBody().x = 0;
		    TweenUtils.move(this.rival.getBody(), 230, this.rival.getBody().y, 2000, 0, () => {
			    this.tumming2 = true;
			    TweenUtils.fadeIn(this.rivalBar.getBody());
			    TweenUtils.fadeIn(this.rival.getLayerSprite('kiss'), 300);
			    TweenUtils.fadeOut(this.rival.getLayerSprite('lip'), 300);
		    }, this);
	    }
	    else {
		    this.rival.setScale(1, 1);
		    this.rival.getBody().x = 540;
		    TweenUtils.move(this.rival.getBody(), 280, this.rival.getBody().y, 2000, 0, () => {
			    this.tumming2 = true;
			    TweenUtils.fadeIn(this.rivalBar.getBody());
			    TweenUtils.fadeIn(this.rival.getLayerSprite('kiss'), 300);
			    TweenUtils.fadeOut(this.rival.getLayerSprite('lip'), 300);
		    }, this);
	    }
		this.startMoveRival();
		TweenUtils.delayedCall(250, this.moveRival, this);
		TweenUtils.delayedCall(1750, this.endMoveRival, this)
	}
	
	private endRivalTamming() {
		if (this.hero.getBody().scale.x === 1) {
			this.rival.getBody().x += this.rival.getBody().width * .8;
			this.rival.setScale(1, 1);
			TweenUtils.move(this.rival.getBody(), this.rival.getBody().x - 540, this.rival.getBody().y, 2000, 500, () => {
				TweenUtils.fadeOut(this.rival.getLayerSprite('kiss'), 300);
				TweenUtils.fadeIn(this.rival.getLayerSprite('lip'), 300);
			}, this);
		}
		else {
			this.rival.getBody().x += this.rival.getBody().width * .8;
			this.rival.setScale(-1, 1);
			TweenUtils.move(this.rival.getBody(), this.rival.getBody().x + 540, this.rival.getBody().y, 2000, 500, () => {
				TweenUtils.fadeOut(this.rival.getLayerSprite('kiss'), 300);
				TweenUtils.fadeIn(this.rival.getLayerSprite('lip'), 300);
			}, this);
		}
		TweenUtils.delayedCall(500, this.startMoveRival, this);
		TweenUtils.delayedCall(750, this.moveRival, this);
		TweenUtils.delayedCall(2250, this.endMoveRival, this)
	}
    
    private endMoveHero() {
	    TweenUtils.rotate(this.hero.getLayerSprite('leg_f'), -9, 250, 0);
	    TweenUtils.rotate(this.hero.getLayerSprite('leg_b'), -2, 250, 0);
	    TweenUtils.rotate(this.hero.getLayerSprite('hand_f'), 20, 250, 0);
	    TweenUtils.rotate(this.hero.getLayerSprite('hand_b'), -20, 250, 0);
    }
	
	private startMoveHero() {
		TweenUtils.rotate(this.hero.getLayerSprite('leg_f'), 6.5, 250, 0);
		TweenUtils.rotate(this.hero.getLayerSprite('leg_b'), -16.5, 250, 0);
		TweenUtils.rotate(this.hero.getLayerSprite('hand_f'), 0, 250, 0);
		TweenUtils.rotate(this.hero.getLayerSprite('hand_b'), 0, 250, 0);
	}
	
	private moveHero() {
		EffectUtils.makeRotateAnimation(this.hero.getLayerSprite('hand_f'), 500, 20, 1);
		EffectUtils.makeRotateAnimation(this.hero.getLayerSprite('hand_b'), 500, -20, 1);
		EffectUtils.makeRotateAnimation(this.hero.getLayerSprite('leg_f'), 500, -16.5, 1);
		EffectUtils.makeRotateAnimation(this.hero.getLayerSprite('leg_b'), 500, 6.5, 1);
	}
	
	private endMoveRival() {
		TweenUtils.rotate(this.rival.getLayerSprite('leg_f'), -9, 250, 0);
		TweenUtils.rotate(this.rival.getLayerSprite('leg_b'), -2, 250, 0);
		TweenUtils.rotate(this.rival.getLayerSprite('hand_f'), 20, 250, 0);
		TweenUtils.rotate(this.rival.getLayerSprite('hand_b'), -20, 250, 0);
	}
	
	private startMoveRival() {
		TweenUtils.rotate(this.rival.getLayerSprite('leg_f'), 5.5, 250, 1);
		TweenUtils.rotate(this.rival.getLayerSprite('leg_b'), -15.2, 250, 1);
		TweenUtils.rotate(this.rival.getLayerSprite('hand_f'), 0, 250, 1);
		TweenUtils.rotate(this.rival.getLayerSprite('hand_b'), 0, 250, 1);
	}
	
	private moveRival() {
		EffectUtils.makeRotateAnimation(this.rival.getLayerSprite('hand_f'), 500, 20, 1);
		EffectUtils.makeRotateAnimation(this.rival.getLayerSprite('hand_b'), 500, -20, 1);
		EffectUtils.makeRotateAnimation(this.rival.getLayerSprite('leg_f'), 500, -15.2, 1);
		EffectUtils.makeRotateAnimation(this.rival.getLayerSprite('leg_b'), 500, 5.5, 1);
	}
	
	private moveSelection(sprite: Phaser.Button) {
		if (this.animating) return;
		this.animating = true;
		TweenUtils.fadeAndScaleOut(this.leftBtn, 300);
		TweenUtils.fadeAndScaleOut(this.rightBtn, 300);
		if (sprite === this.rightBtn) {
			this.selected++;
			if (this.hero.getBody().scale.x === 1) {
				this.hero.getBody().x += this.hero.getBody().width;
				this.hero.setScale(-1, 1);
			}
			TweenUtils.move(this.hero.getBody(), 270, this.hero.getBody().y, 2000, 0, () => {
				this.animating = false;
			}, this);
			this.startMoveHero();
			TweenUtils.delayedCall(250, this.moveHero, this);
			TweenUtils.delayedCall(2000, this.endMoveHero, this);
			TweenUtils.move(this.container, this.container.x - 540, 0, 2000, 0, () => {
				this.leftBtn.angle = 0;
				this.leftBtn.filters = null;
				this.leftBtn.inputEnabled = false;
				this.rightBtn.angle = 0;
				this.rightBtn.filters = null;
				this.rightBtn.inputEnabled = false;
				if (this.selected === 0) {
					this.rightBtn.inputEnabled = true;
					TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
				}
				else if (this.selected === 4) {
					this.leftBtn.inputEnabled = true;
					TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				}
				else {
					this.rightBtn.inputEnabled = true;
					this.leftBtn.inputEnabled = true;
					TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
					TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
				}
			}, this);
		}
		else {
			this.selected--;
			if (this.hero.getBody().scale.x === -1) {
				this.hero.getBody().x += this.hero.getBody().width;
				this.hero.setScale(1, 1);
			}
			TweenUtils.move(this.hero.getBody(), 240, this.hero.getBody().y, 2000, 0, () => {
				this.animating = false;
			}, this);
			this.startMoveHero();
			TweenUtils.delayedCall(250, this.moveHero, this);
			TweenUtils.delayedCall(1750, this.endMoveHero, this);
			TweenUtils.move(this.container, this.container.x + 540, 0, 2000, 0, () => {
				this.leftBtn.angle = 0;
				this.leftBtn.filters = null;
				this.leftBtn.inputEnabled = false;
				this.rightBtn.angle = 0;
				this.rightBtn.filters = null;
				this.rightBtn.inputEnabled = false;
				if (this.selected === 0) {
					this.rightBtn.inputEnabled = true;
					TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
				}
				else if (this.selected === 4) {
					this.leftBtn.inputEnabled = true;
					TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				}
				else {
					this.rightBtn.inputEnabled = true;
					this.leftBtn.inputEnabled = true;
					TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
					TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
				}
			}, this);
		}
	}
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud).to({ y: 419 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt).to({ y: this.txt.y + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
				if (this.fader.inputEnabled) {
					TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
						this.fader.inputEnabled = false;
						this.animating = false;
						this.tipShowing = false;
						if (this.selected === 0) {
							TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
						}
						else if (this.selected === 4) {
							TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
						}
						else {
							TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
							TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
						}
					}, this);
				}
			}, this);
		}
		else {
			TweenUtils.fadeAndScaleOut(this.leftBtn, 300);
			TweenUtils.fadeAndScaleOut(this.rightBtn, 300);
			this.fader.inputEnabled = true;
			this.txt.position.setTo(265, 675);
			this.txt.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud).to({ y: 419 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
				this.animating = false;
			}, this);
			this.tipShowing = true;
		}
	}

    public update(): void {
        super.update(this.game);
        if (!this.tipShowing) {
	        this.curTimeInSeconds++;
            if (this.tumming) {
	            this.tummingHero -= .0006;
	            if (this.tummingHero < .01) this.tummingHero = .01;
	            if (this.tummingHero < 1) {
		            this.heroBar.setValue(this.tummingHero);
	            }
            }
	        if (this.tumming2) {
		        this.tummingRival += .001;
		        if (this.tummingRival < 1) {
			        this.rivalBar.setValue(this.tummingRival);
		        }
		        else {
			        (this.particle as HeartsParticles).off();
			        this.tumming = false;
			        this.tumming2 = false;
			        this.heroBar.setValue(1);
			        this.currentMan.disableListeners();
			        TweenUtils.delayedCall(500, this.endRivalTamming, this);
			        TweenUtils.fadeOut(this.heroBar.getBody());
			        TweenUtils.fadeOut(this.rivalBar.getBody(), 500, 1000);
			        TweenUtils.fadeOut(this.currentMan.getLayerSprite('sad'), 300);
			        TweenUtils.customFadeAndScaleIn(this.currentMan.getBody(), .75, 1, 500);
			        TweenUtils.fadeOut(this.hero.getLayerSprite('kiss'), 300);
			        TweenUtils.fadeIn(this.hero.getLayerSprite('lip'), 300);
			        if (this.total === 4) {
				        TweenUtils.moveIn(this.panel, 152, 830 + 300, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
				        TweenUtils.moveIn(this.label, this.label.x, this.label.y + 300, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
				        TweenUtils.moveIn(this.scoreText, this.scoreText.x, this.scoreText.y + 300, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
					        this.container.add(this.hero.getBody());
					        this.hero.getBody().x += this.selected * 540;
					        // bluring stage
					        TweenUtils.delayedCall(500, () => {
						        EffectUtils.makeBlurAnimation(this.container, 16, 1500, false, 0);
						        // score
						        // icons
					        }, this);
				        }, this);
				        return;
			        }
			        if (this.selected === 0) {
				        this.rightBtn.inputEnabled = true;
				        TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
			        }
			        else if (this.selected === 4) {
				        this.leftBtn.inputEnabled = true;
				        TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
			        }
			        else {
				        this.rightBtn.inputEnabled = true;
				        this.leftBtn.inputEnabled = true;
				        TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
				        TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
			        }
			        return;
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

