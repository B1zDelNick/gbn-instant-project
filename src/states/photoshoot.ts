import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {IParticle} from './spec-effects/particle/i.particle';
import {HandyUtils} from '../utils/utility/handy.utils';
import {DotJoiner} from './template/posing/dot.joiner';
import {EffectUtils} from '../utils/effect.utils';
import {ViralUtils} from '../utils/viral/viral.utils';
import {ShareWindow} from '../utils/viral/share.window';
import {SoundUtils} from '../utils/sound/sound.utils';

export default class Photoshoot extends Phaser.State {

    private NEXT = 'END';
    private nextPrepared = false;

    private gui: InstantGui = null;
	private container: Phaser.Group = null;
	private blue: Phaser.Graphics = null;
	private white: Phaser.Graphics = null;
	private particle: IParticle = null;
	private fader: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
    private txt1: Phaser.Sprite = null;
    private txt2: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
	private nextBtn: Phaser.Button = null;
    private doll: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	private viral: ShareWindow = null;
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private total: number = 0;
	private cutTime: number = 0;
	private cutPose: number = 1;
	private poses: number[] = [];
	private dots = [];
	private girls = [];
	private sophie = [];
	private sophieMC: Phaser.Sprite;
	private chloe = [];
	private chloeMC: Phaser.Sprite;
	private girlsCoords = [];
	private girlsAsset: string;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.tipShowing = true;
	    this.animating = false;
	    this.total = 0;
	    this.cutTime = 0;
	    this.cutPose = 1;
	    this.poses = [];
	    this.dots = [];
	    this.girls = [];
	    this.girlsCoords = [];
	    SoundUtils.play('PhotoTheme');
    }

    public preload(): void {
    }

    public create(): void {
		/////////////////////////// !!!!!!!!!!!!!!!
	    GameConfig.SELECTED_ACTOR = 4;
	    /////////////////////////// !!!!!!!!!!!!!!!
	    this.defineCoords();
	
	    this.container = this.game.add.group();
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg14').getName(), null, this.container);
	
	    this.sophie['pose1'] = this.game.add.sprite(-8 - 500, 147,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').Frames.Pose1,
		    this.container
	    );
	    this.sophie['pose2'] = this.game.add.sprite(-24 - 500, 151,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').Frames.Pose2,
		    this.container
	    );
	    this.sophie['pose3'] = this.game.add.sprite(14 - 500, 153,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').Frames.Pose3,
		    this.container
	    );
	    this.sophie['pose4'] = this.game.add.sprite(7 - 500, 159,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').Frames.Pose4,
		    this.container
	    );
	    this.sophie['pose5'] = this.game.add.sprite(-87 - 500, 292,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootSophie').Frames.Pose5,
		    this.container
	    );
	    this.sophieMC = this.sophie['pose2'];
	
	    this.chloe['pose1'] = this.game.add.sprite(298 + 500, 158,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').Frames.Pose1,
		    this.container
	    );
	    this.chloe['pose2'] = this.game.add.sprite(286 + 500, 165,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').Frames.Pose2,
		    this.container
	    );
	    this.chloe['pose3'] = this.game.add.sprite(324 + 500, 165,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').Frames.Pose3,
		    this.container
	    );
	    this.chloe['pose4'] = this.game.add.sprite(298 + 500, 153,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').Frames.Pose4,
		    this.container
	    );
	    this.chloe['pose5'] = this.game.add.sprite(231 + 500, 321,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshootChloe').Frames.Pose5,
		    this.container
	    );
	    this.chloeMC = this.chloe['pose3'];
      
	    this.girls['pose1'] = this.game.add.sprite(this.girlsCoords[0][0], this.girlsCoords[0][1],
		    ImageUtils.getAtlasClass(this.girlsAsset).getName(),
		    ImageUtils.getAtlasClass(this.girlsAsset).Frames.Pose1,
		    this.container
	    );
	    this.girls['pose2'] = this.game.add.sprite(this.girlsCoords[1][0], this.girlsCoords[1][1],
		    ImageUtils.getAtlasClass(this.girlsAsset).getName(),
		    ImageUtils.getAtlasClass(this.girlsAsset).Frames.Pose2,
		    this.container
	    );
	    this.girls['pose3'] = this.game.add.sprite(this.girlsCoords[2][0], this.girlsCoords[2][1],
		    ImageUtils.getAtlasClass(this.girlsAsset).getName(),
		    ImageUtils.getAtlasClass(this.girlsAsset).Frames.Pose3,
		    this.container
	    );
	    this.girls['pose4'] = this.game.add.sprite(this.girlsCoords[3][0], this.girlsCoords[3][1],
		    ImageUtils.getAtlasClass(this.girlsAsset).getName(),
		    ImageUtils.getAtlasClass(this.girlsAsset).Frames.Pose4,
		    this.container
	    );
	    this.girls['pose5'] = this.game.add.sprite(this.girlsCoords[4][0], this.girlsCoords[4][1],
		    ImageUtils.getAtlasClass(this.girlsAsset).getName(),
		    ImageUtils.getAtlasClass(this.girlsAsset).Frames.Pose5,
		    this.container
	    );
	    this.girls['pose2'].alpha = 0;
	    this.girls['pose3'].alpha = 0;
	    this.girls['pose4'].alpha = 0;
	    this.girls['pose5'].alpha = 0;
        
        //// dots layer

	    this.blue = this.game.add.graphics(0, 0);
	    this.blue.beginFill(0x26215b, .65);
	    this.blue.drawRect(0, 0, 540, 960);
	    this.blue.alpha = 0;

	    this.dots['dots1'] = new DotJoiner('AtlasesStatePhotoshoot', 'Green', 'Red')
		    .bg(this.girlsCoords[0][0], this.girlsCoords[0][1], this.girlsAsset, 'Sil1')
		    .dot(217, 65, 1)
		    .dot(327, 235, 2)
		    .dot(253, 352, 3)
		    .dot(137, 279, 4)
		    .dot(225, 592, 5)
		    .dot(226, 828, 6)
		    .setListener(this.onDone, this);
	    this.dots['dots2'] = new DotJoiner('AtlasesStatePhotoshoot', 'Green', 'Red')
		    .bg(this.girlsCoords[1][0], this.girlsCoords[1][1], this.girlsAsset, 'Sil2')
		    .dot(208, 61, 1)
		    .dot(333, 194, 2)
		    .dot(147, 231, 3)
		    .dot(258, 367, 4)
		    .dot(194, 523, 5)
		    .dot(270, 824, 6)
		    .setListener(this.onDone, this);
	    this.dots['dots3'] = new DotJoiner('AtlasesStatePhotoshoot', 'Green', 'Red')
		    .bg(this.girlsCoords[2][0], this.girlsCoords[2][1], this.girlsAsset, 'Sil3')
		    .dot(214, 65, 1)
		    .dot(165, 309, 2)
		    .dot(317, 567, 3)
		    .dot(178, 570, 4)
		    .dot(355, 785, 5)
		    .setListener(this.onDone, this);
	    this.dots['dots4'] = new DotJoiner('AtlasesStatePhotoshoot', 'Green', 'Red')
		    .bg(this.girlsCoords[3][0], this.girlsCoords[3][1], this.girlsAsset, 'Sil4')
		    .dot(216, 66, 1)
		    .dot(151, 244, 2)
		    .dot(266, 405, 3)
		    .dot(162, 580, 4)
		    .dot(349, 803, 5)
		    .setListener(this.onDone, this);
	    this.dots['dots5'] = new DotJoiner('AtlasesStatePhotoshoot', 'Green', 'Red')
		    .bg(this.girlsCoords[4][0], this.girlsCoords[4][1], this.girlsAsset, 'Sil5')
		    .dot(284, 265, 1)
		    .dot(417, 446, 2)
		    .dot(269, 420, 3)
		    .dot(283, 571, 4)
		    .dot(159, 520, 5)
		    .dot(36, 693, 6)
		    .dot(234, 780, 7)
		    .setListener(this.onDone, this);

	    this.white = this.game.add.graphics(0, 0);
	    this.white.beginFill(0xffffff, .9);
	    this.white.drawRect(0, 0, 540, 960);
	    this.white.alpha = 0;

	    /// tips & comix
	    
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
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshoot').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshoot').Frames.Cloud);
	    this.txt1 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshoot').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshoot').Frames['Txt1' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt1);
	    this.txt1.position.setTo(270, 708);
	    this.txt2 = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshoot').getName(),
		    ImageUtils.getAtlasClass('AtlasesStatePhotoshoot').Frames['Txt2' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt2);
	    this.txt2.position.setTo(270, 725);
	    this.txt1.alpha = 0;
	    this.txt2.alpha = 0;
	
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
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(412, 494,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 501 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt1).to({ y: this.txt1.y + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
				    // show girls in defaults
				    TweenUtils.slideIn(this.sophieMC, this.sophieMC.x + 500, Phaser.Timer.SECOND * .5);
				    TweenUtils.slideIn(this.chloeMC, this.chloeMC.x - 500, Phaser.Timer.SECOND * .5);
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, () => {
					    this.tipShowing = false;
					    this.showDots();
					    //
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
	    this.nextBtn = this.gui.addPlayBtn(GuiButtons.DONE, () => {
		    TweenUtils.fadeAndScaleOut(this.nextBtn);
		    this.game.add.tween(this.cloud).to({ y: 501 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    this.game.add.tween(this.txt2).to({ y: this.txt2.y + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
		    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
			    TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
				    this.fader.inputEnabled = false;
				    // stop scene
				    EffectUtils.makeShootAnimation(this.white);
				    // bluring stage
				    TweenUtils.delayedCall(500, () => {
					    EffectUtils.makeBlurAnimation(this.container, 16, 1500, false, 0);
				    }, this);
				    // screenshot
				    const bmd = this.game.add.bitmapData(this.game.width, this.game.height);
				    this.viral.setScreen(bmd.addToWorld(270, 600 + (this.cutPose === 5 ? -70 : 0), .5, .5, 0.85, 0.85));
				    this.game.stage.updateTransform();
				    bmd.drawGroup(this.container); //  this.game.world);
				    // viral
				    TweenUtils.delayedCall(1000, () => {
					    this.viral.show();
					    TweenUtils.fadeAndScaleIn(this.playBtn, 750, 1000);
				    }, this);
			    }, this);
		    }, this);
	    }, 216, 840);
	    this.nextBtn.alpha = 0;
	    this.nextBtn.scale.setTo(0);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.RIGHT, () => {
		    TweenUtils.fadeAndScaleOut(this.playBtn, 500, 0, this.nextState, this);
	    }, 216, 840);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
	    this.game.add.tween(this.cloud).to({ y: 501 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
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
    
    private showDots() {
        if (this.poses.length === 0) {
        	if (this.cutPose === 1) {
        		this.poses.push(2, 3, 4, 5);
	        }
	        else if (this.cutPose === 2) {
		        this.poses.push(1, 3, 4, 5);
	        }
	        else if (this.cutPose === 3) {
		        this.poses.push(1, 2, 4, 5);
	        }
	        else if (this.cutPose === 4) {
		        this.poses.push(1, 3, 2, 5);
	        }
	        else if (this.cutPose === 5) {
		        this.poses.push(1, 3, 4, 2);
	        }
	        HandyUtils.shuffleArray(this.poses);
	        HandyUtils.shuffleArray(this.poses);
        }
        this.total++;
        if (this.total === 9) {
	        if (SoundUtils.isSoundEnabled())
		        SoundUtils.playFX('SubLevelDone');
        	TweenUtils.fadeAndScaleOut(this.hintBtn);
	        this.fader.inputEnabled = true;
	        TweenUtils.fadeIn(this.fader);
	        TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
	        this.game.add.tween(this.cloud).to({ y: 501 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
	        TweenUtils.fadeIn(this.txt2, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
		        TweenUtils.fadeAndScaleIn(this.nextBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
	        }, this);
        	return;
        }
	    TweenUtils.slideOut(this.sophieMC, this.sophieMC.x - 500, Phaser.Timer.SECOND * .5);
	    TweenUtils.slideOut(this.chloeMC, this.chloeMC.x + 500, Phaser.Timer.SECOND * .5);
        TweenUtils.fadeOut(this.girls['pose1'], 500, 0);
        TweenUtils.fadeOut(this.girls['pose2'], 500, 0);
        TweenUtils.fadeOut(this.girls['pose3'], 500, 0);
        TweenUtils.fadeOut(this.girls['pose4'], 500, 0);
        TweenUtils.fadeOut(this.girls['pose5'], 500, 0);
        this.cutPose = this.poses.pop();
	    const dots = this.dots['dots' + this.cutPose] as DotJoiner;
	    TweenUtils.fadeIn(this.blue, 500, 0, dots.start, dots);
    }
    
    private onDone() {
	    EffectUtils.makeShootAnimation(this.white);
	    if (SoundUtils.isSoundEnabled())
		    SoundUtils.playFX('Shoot');
	    TweenUtils.delayedCall(200, () => {
		    if (SoundUtils.isSoundEnabled())
			    SoundUtils.playFX('Shoot');
	    }, this);
	    TweenUtils.delayedCall(600, () => {
	    	let tempArray: number[] = [];
		    if (this.cutPose === 1) {
			    tempArray.push(2, 3, 4, 5);
		    }
		    else if (this.cutPose === 2) {
			    tempArray.push(1, 3, 4, 5);
		    }
		    else if (this.cutPose === 3) {
			    tempArray.push(1, 2, 4, 5);
		    }
		    else if (this.cutPose === 4) {
			    tempArray.push(1, 3, 2, 5);
		    }
		    else if (this.cutPose === 5) {
			    tempArray.push(1, 3, 4, 2);
		    }
		    HandyUtils.shuffleArray(tempArray);
		    HandyUtils.shuffleArray(tempArray);
		    this.sophieMC = this.sophie['pose' + tempArray.pop()];
		    this.chloeMC = this.chloe['pose' + tempArray.pop()];
		    const dots = this.dots['dots' + this.cutPose] as DotJoiner;
		    dots.reset();
		    TweenUtils.slideIn(this.sophieMC, this.sophieMC.x + 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
		    TweenUtils.slideIn(this.chloeMC, this.chloeMC.x - 500, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
		    TweenUtils.fadeIn(this.girls['pose' +  + this.cutPose], 500, 500, () => {
			    TweenUtils.delayedCall(1000, () => {
				    EffectUtils.makeShootAnimation(this.white);
				    if (SoundUtils.isSoundEnabled())
					    SoundUtils.playFX('Shoot');
				    TweenUtils.delayedCall(200, () => {
					    if (SoundUtils.isSoundEnabled())
						    SoundUtils.playFX('Shoot');
				    }, this);
			    }, this);
		    }, this);
		    TweenUtils.fadeOut(this.blue, 500, 500);
		    TweenUtils.delayedCall(3500, this.showDots, this);
	    }, this);
    }
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud).to({ y: 501 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt1).to({ y: this.txt1.y + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5, () => {
				if (this.fader.inputEnabled) {
					TweenUtils.fadeOut(this.fader, Phaser.Timer.SECOND * .5, 0, () => {
						this.fader.inputEnabled = false;
						this.animating = false;
					}, this);
				}
			}, this);
			this.tipShowing = false;
		}
		else {
			this.fader.inputEnabled = true;
			this.txt1.position.setTo(270, 708);
			this.txt1.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud).to({ y: 501 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt1, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
				this.animating = false;
			}, this);
			this.tipShowing = true;
		}
	}

    public update(): void {
        super.update(this.game);
        if (!this.tipShowing) {
        	this.cutTime++;
        }
    }
    
    private defineCoords() {
    	this.girlsCoords = [];
    	if (GameConfig.SELECTED_ACTOR === 1) {
    		this.girlsCoords.push([152, 60], [142, 65], [155, 49], [114, 49], [17, 238]);
    		this.girlsAsset = 'AtlasesStatePhotoshootMonica';
	    }
	    else if (GameConfig.SELECTED_ACTOR === 2) {
		    this.girlsCoords.push([150, 48], [150, 52], [148, 53], [142, 54], [19, 230]);
		    this.girlsAsset = 'AtlasesStatePhotoshootEmily';
	    }
	    else if (GameConfig.SELECTED_ACTOR === 3) {
		    this.girlsCoords.push([129, 36], [152, 49], [156, 39], [122, 45], [19, 230]);
		    this.girlsAsset = 'AtlasesStatePhotoshootLily';
	    }
	    else if (GameConfig.SELECTED_ACTOR === 4) {
		    this.girlsCoords.push([106, 51], [136, 56], [112, 54], [53, 53], [23, 248]);
		    this.girlsAsset = 'AtlasesStatePhotoshootAngela';
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

