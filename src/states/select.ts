import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';

export default class Select extends Phaser.State {

    private NEXT = 'Select';
    private nextPrepared = false;

    private gui: InstantGui = null;

    private bg: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private panel: Phaser.Sprite = null;
    private nome: Phaser.Sprite = null;
    private container: Phaser.Group = null;
    private leftBtn: Phaser.Button = null;
    private rightBtn: Phaser.Button = null;
    private playBtn: Phaser.Button = null;
    
    private monika: Doll = null;
    private emily: Doll = null;
    private lily: Doll = null;
    private angela: Doll = null;

    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
    
    private selected: number = 1;
    private pos1: Phaser.Point = new Phaser.Point(-273, 183);
    private pos2: Phaser.Point = new Phaser.Point(7, 224);
    private pos3: Phaser.Point = new Phaser.Point(97, 374);
    private pos4: Phaser.Point = new Phaser.Point(328, 224);
    private pos5: Phaser.Point = new Phaser.Point(580, 183);
    private animating: boolean = false;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
    }

    public preload(): void {
    }

    public create(): void {

        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg2').getName());

        this.container = this.game.add.group();

	    this.monika = new Doll(this, 97, 374)
		    .layer(-21, -133, 'glow',
			    'AtlasesDollSelectMonica',
			    'Glow', 'Glow')
		    .layer(46, -93, 'hair_b',
			    'AtlasesDollSelectMonica',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollSelectMonica',
			    'Body', 'Body')
		    .layer(105, -87, 'head',
			    'AtlasesDollSelectMonica',
			    'Head', 'Head')
		    .lipsL(112, -40, 'lips',
			    'AtlasesDollSelectMonica',
			    'Lp', 'Lp')
		    .eyesL(112, -40, 'eyes',
			    'AtlasesDollSelectMonica',
			    'Ee', 'Ee')
		    .layer(48, -119, 'hair',
			    'AtlasesDollSelectMonica',
			    'H', 'H')
		    .layer(-15, -137, 'sil',
			    'AtlasesDollSelectMonica',
			    'Sil', 'Sil')
		    .layer(122, 29, 'lock',
			    'AtlasesStateSelect',
			    'Lock', 'Lock');
	    this.monika.fadeLayer('glow', true);
	    this.monika.fadeLayer('sil', true);
	    this.monika.fadeLayer('lock', true);

	    this.emily = new Doll(this, 97, 374)
		    .layer(-19, -125, 'glow',
			    'AtlasesDollSelectEmily',
			    'Glow', 'Glow')
		    .layer(130, -63, 'hair_b',
			    'AtlasesDollSelectEmily',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollSelectEmily',
			    'Body', 'Body')
		    .layer(126, -78, 'head',
			    'AtlasesDollSelectEmily',
			    'Head', 'Head')
		    .lipsL(123, -46, 'lips',
			    'AtlasesDollSelectEmily',
			    'Lp', 'Lp')
		    .eyesL(123, -46, 'eyes',
			    'AtlasesDollSelectEmily',
			    'Ee', 'Ee')
		    .layer(95, -108, 'hair',
			    'AtlasesDollSelectEmily',
			    'H', 'H')
		    .layer(-16, -124, 'sil',
			    'AtlasesDollSelectEmily',
			    'Sil', 'Sil')
		    .layer(132, 70, 'lock',
			    'AtlasesStateSelect',
			    'Lock', 'Lock');
	    this.emily.fadeLayer('glow', true);
	    this.emily.fadeLayer('sil', true);
	    this.emily.fadeLayer('lock', true);

	    this.lily = new Doll(this, 97, 374)
		    .layer(-18, -146, 'glow',
			    'AtlasesDollSelectLily',
			    'Glow', 'Glow')
		    .layer(103, -103, 'hair_b',
			    'AtlasesDollSelectLily',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollSelectLily',
			    'Body', 'Body')
		    .layer(119, -83, 'head',
			    'AtlasesDollSelectLily',
			    'Head', 'Head')
		    .lipsL(125, -39, 'lips',
			    'AtlasesDollSelectLily',
			    'Lp', 'Lp')
		    .eyesL(125, -39, 'eyes',
			    'AtlasesDollSelectLily',
			    'Ee', 'Ee')
		    .layer(48, -131, 'hair',
			    'AtlasesDollSelectLily',
			    'H', 'H')
		    .layer(-17, -148, 'sil',
			    'AtlasesDollSelectLily',
			    'Sil', 'Sil')
		    .layer(141, 64, 'lock',
			    'AtlasesStateSelect',
			    'Lock', 'Lock');
	    this.lily.fadeLayer('glow', true);
	    this.lily.fadeLayer('sil', true);
	    this.lily.fadeLayer('lock', true);

	    this.angela = new Doll(this, 97, 374)
		    .layer(-17, -130, 'glow',
			    'AtlasesDollSelectAngela',
			    'Glow', 'Glow')
		    .layer(75, -91, 'hair_b',
			    'AtlasesDollSelectAngela',
			    'HB', 'HB')
		    .layer(0, 0, 'body',
			    'AtlasesDollSelectAngela',
			    'Body', 'Body')
		    .layer(96, -82, 'head',
			    'AtlasesDollSelectAngela',
			    'Head', 'Head')
		    .lipsL(118, -43, 'lips',
			    'AtlasesDollSelectAngela',
			    'Lp', 'Lp')
		    .eyesL(118, -43, 'eyes',
			    'AtlasesDollSelectAngela',
			    'Ee', 'Ee')
		    .layer(72, -109, 'hair',
			    'AtlasesDollSelectAngela',
			    'H', 'H')
		    .layer(-17, -126, 'sil',
			    'AtlasesDollSelectAngela',
			    'Sil', 'Sil')
		    .layer(101, 64, 'lock',
			    'AtlasesStateSelect',
			    'Lock', 'Lock');
	    this.angela.fadeLayer('glow', true);
	    this.angela.fadeLayer('sil', true);
	    this.angela.fadeLayer('lock', true);

	    // Adding to container fro better animations
	    this.container.add(this.monika.getBody());
	    this.container.add(this.emily.getBody());
	    this.container.add(this.lily.getBody());
	    this.container.add(this.angela.getBody());
	    
	    // Some checks for replay
	    if (true) {
	    	this.monika.setPosition(this.pos3.x, this.pos3.y);
	    	this.emily.setPosition(this.pos4.x, this.pos4.y);
	    	this.lily.setPosition(this.pos5.x, this.pos5.y);
	    	this.angela.setPosition(this.pos5.x, this.pos5.y);
		    this.emily.setScale(.671);
		    this.lily.setScale(.671);
		    this.angela.setScale(.671);
		    this.monika.appearLayer('glow', true);
		    this.container.setChildIndex(this.monika.getBody(), this.container.children.length - 1);
		    if (!GameConfig.DOLL_4_UNLOCKED) {
		    	this.angela.fadeLayer('hair_b', true);
		    	this.angela.fadeLayer('hair', true);
		    	this.angela.fadeLayer('body', true);
		    	this.angela.fadeLayer('head', true);
		    	this.angela.appearLayer('sil', true);
		    	this.angela.appearLayer('lock', true);
		    }
	    }

	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames['Label' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(266, 63);

	    this.panel = this.game.add.sprite(144, 695,
		    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames.Panel);
	    this.nome = this.game.add.sprite(276, 770,
		    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames['Name' + this.selected + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.nome);
	    this.nome.position.setTo(276, 770);

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.gui.addHintBtn(null);
	    this.leftBtn = this.gui.addExtraBtn(26, 829,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.LeftBtn,
		    this.moveSelection,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.rightBtn = this.gui.addExtraBtn(399, 829,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn,
		    this.moveSelection,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.DONE, this.nextState, 213, 848);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);
	    this.rightBtn.alpha = 0;
	    this.rightBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);

        // Assets Managment starts here
        if (GameConfig.IS_ASSETS_LOADED)
            this.waitForLoading();
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            AssetUtils.Loader.loadSelectedAssets(this.game, true, this.waitForLoading, this);
        }
    }
    
    private moveSelection(sprite: Phaser.Button) {
    	if (this.animating) return;
    	this.animating = true;
    	if (sprite.frameName.toLowerCase().indexOf('left') !== -1) {
    	    this.selected++;
    	    if (this.selected === 2) {
    	    	this.monika.fadeLayer('glow', true);
		        this.container.setChildIndex(this.emily.getBody(), this.container.children.length - 1);
    	    	TweenUtils.move(this.lily.getBody(), this.pos4.x, this.pos4.y, 1000);
    	    	TweenUtils.moveAndScaleOut(this.monika.getBody(), this.pos2.x, this.pos2.y, .671, 1000);
    	    	TweenUtils.moveAndScaleIn(this.emily.getBody(), this.pos3.x, this.pos3.y, 1, 1000, 0, () => {
    	    		this.animating = false;
			        this.emily.appearLayer('glow');
		        }, this);
		        if (this.playBtn.alpha === 0) {
			        TweenUtils.fadeAndScaleIn(this.playBtn, 750);
		        }
	        }
	        else if (this.selected === 3) {
		        this.emily.fadeLayer('glow', true);
		        this.container.setChildIndex(this.lily.getBody(), this.container.children.length - 1);
    	    	TweenUtils.move(this.angela.getBody(), this.pos4.x, this.pos4.y, 1000);
		        TweenUtils.move(this.monika.getBody(), this.pos1.x, this.pos1.y, 1000);
		        TweenUtils.moveAndScaleOut(this.emily.getBody(), this.pos2.x, this.pos2.y, .671, 1000);
		        TweenUtils.moveAndScaleIn(this.lily.getBody(), this.pos3.x, this.pos3.y, 1, 1000, 0, () => {
			        this.animating = false;
			        this.lily.appearLayer('glow');
		        }, this);
		        if (this.playBtn.alpha === 0) {
			        TweenUtils.fadeAndScaleIn(this.playBtn, 750);
		        }
	        }
	        else if (this.selected === 4) {
		        this.lily.fadeLayer('glow', true);
		        this.container.setChildIndex(this.angela.getBody(), this.container.children.length - 1);
		        TweenUtils.move(this.emily.getBody(), this.pos1.x, this.pos1.y, 1000);
		        TweenUtils.moveAndScaleOut(this.lily.getBody(), this.pos2.x, this.pos2.y, .671, 1000);
		        TweenUtils.moveAndScaleIn(this.angela.getBody(), this.pos3.x, this.pos3.y, 1, 1000, 0, () => {
			        this.animating = false;
			        this.angela.appearLayer('glow');
		        }, this);
		        if (GameConfig.DOLL_4_UNLOCKED) {
			        if (this.playBtn.alpha === 0) {
				        TweenUtils.fadeAndScaleIn(this.playBtn, 750);
			        }
		        }
		        else {
			        if (this.playBtn.alpha === 1) {
				        TweenUtils.fadeAndScaleOut(this.playBtn);
			        }
		        }
	        }
	    }
	    else {
		    this.selected--;
		    if (this.selected === 3) {
			    this.angela.fadeLayer('glow', true);
			    this.container.setChildIndex(this.lily.getBody(), this.container.children.length - 1);
			    TweenUtils.move(this.emily.getBody(), this.pos2.x, this.pos2.y, 1000);
			    TweenUtils.moveAndScaleOut(this.angela.getBody(), this.pos4.x, this.pos4.y, .671, 1000);
			    TweenUtils.moveAndScaleIn(this.lily.getBody(), this.pos3.x, this.pos3.y, 1, 1000, 0, () => {
				    this.animating = false;
				    this.lily.appearLayer('glow');
			    }, this);
			    if (this.playBtn.alpha === 0) {
				    TweenUtils.fadeAndScaleIn(this.playBtn, 750);
			    }
		    }
		    else if (this.selected === 2) {
			    this.lily.fadeLayer('glow', true);
			    this.container.setChildIndex(this.emily.getBody(), this.container.children.length - 1);
			    TweenUtils.move(this.angela.getBody(), this.pos5.x, this.pos5.y, 1000);
			    TweenUtils.move(this.monika.getBody(), this.pos2.x, this.pos2.y, 1000);
			    TweenUtils.moveAndScaleOut(this.lily.getBody(), this.pos4.x, this.pos4.y, .671, 1000);
			    TweenUtils.moveAndScaleIn(this.emily.getBody(), this.pos3.x, this.pos3.y, 1, 1000, 0, () => {
				    this.animating = false;
				    this.emily.appearLayer('glow');
			    }, this);
			    if (this.playBtn.alpha === 0) {
				    TweenUtils.fadeAndScaleIn(this.playBtn, 750);
			    }
		    }
		    else if (this.selected === 1) {
			    this.emily.fadeLayer('glow', true);
			    this.container.setChildIndex(this.monika.getBody(), this.container.children.length - 1);
			    TweenUtils.move(this.lily.getBody(), this.pos5.x, this.pos5.y, 1000);
			    TweenUtils.moveAndScaleOut(this.emily.getBody(), this.pos4.x, this.pos4.y, .671, 1000);
			    TweenUtils.moveAndScaleIn(this.monika.getBody(), this.pos3.x, this.pos3.y, 1, 1000, 0, () => {
				    this.animating = false;
				    this.monika.appearLayer('glow');
			    }, this);
			    if (this.playBtn.alpha === 0) {
				    TweenUtils.fadeAndScaleIn(this.playBtn, 750);
			    }
		    }
	    }
	    if (this.selected === 1) {
		    TweenUtils.fadeAndScaleOut(this.rightBtn);
	    }
	    else if (this.selected === 4) {
		    TweenUtils.fadeAndScaleOut(this.leftBtn);
	    }
	    else if (this.selected === 2) {
		    if (this.rightBtn.alpha === 0) {
			    TweenUtils.fadeAndScaleIn(this.rightBtn, 750);
		    }
	    }
	    else if (this.selected === 3) {
		    if (this.leftBtn.alpha === 0) {
			    TweenUtils.fadeAndScaleIn(this.leftBtn, 750);
		    }
	    }
	    this.nome.loadTexture(
		    ImageUtils.getAtlasClass('AtlasesStateSelect').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateSelect').Frames['Name' + this.selected + GameConfig.LOCALE]);
    }

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.bg.destroy(true);
        this.container.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
		this.monika.dispose();
		this.emily.dispose();
		this.lily.dispose();
		this.angela.dispose();
        this.gui.dispose();
    }

    private waitForLoading(): void {
        this.nextPrepared = true;
    }

    private nextState(): void {
        GameConfig.SELECTED_ACTOR = this.selected;
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

