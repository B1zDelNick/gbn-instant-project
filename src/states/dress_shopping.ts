import * as AssetUtils from '../utils/asset.utils';
import {AssetMode, GadgetMode, GameConfig} from '../config/game.config';
import {TweenUtils} from '../utils/tween.utils';
import {ImageUtils} from '../utils/images/image.utils';
import {InstantGui} from './gui/instant.gui';
import {GuiButtons} from './gui/enum.gui';
import {GuiUtils} from '../utils/gui.utils';
import {Doll} from './template/dress/doll';
import {Chest} from './template/dress/chest';

export default class DressShopping extends Phaser.State {

    private NEXT = 'RunawayShopping';
    private nextPrepared = false;

    private gui: InstantGui = null;
	
	private btnContainer: Phaser.Group = null;
	private fader: Phaser.Graphics = null;
    private bg: Phaser.Sprite = null;
    private txt: Phaser.Sprite = null;
    private cloud: Phaser.Sprite = null;
	private playBtn: Phaser.Button = null;
	private closeBtn: Phaser.Button = null;
	private hintBtn: Phaser.Button = null;
	private dressBtn: Phaser.Button = null;
	private shoeBtn: Phaser.Button = null;
	private acsBtn: Phaser.Button = null;
	private hairBtn: Phaser.Button = null;
    private curDr: number = -1;
    private curSh: number = -1;
    private curAc: number = -1;
    private curHr: number = -1;
    private doll: Doll = null;
    private chest: Chest = null;
    private doll2: Doll = null;
    private spinner: Phaser.Sprite = null;
    private blocker: Phaser.Graphics = null;
	private tipShowing: boolean = true;
	private animating: boolean = false;
	private completed: boolean = false;
	private shoeDressed: boolean = false;
	private dressDressed: boolean = false;

    public init(...args: any[]): void {
	    this.gui = new InstantGui(this);
	    this.curDr = 0;
	    this.curSh = -1;
	    this.curAc = -1;
	    this.curHr = -1;
	    this.tipShowing = true;
	    this.animating = false;
	    this.completed = false;
	    this.shoeDressed = false;
	    this.dressDressed = false;
    }

    public preload(): void {
    }

    public create(): void {
		/////////////////////////// !!!!!!!!!!!!!!!
	    GameConfig.SELECTED_ACTOR = 4;
	    /////////////////////////// !!!!!!!!!!!!!!!
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesBg6').getName());
	
        ////// GAME STUFF

	    this.chest = new Chest(this, 500)
		    .configure({hideSelected: true, smoothShow: false})
		    .background(345, 132,
			    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Chest)
		    .page()
			    .item(412, 177, 'dress1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress1,
				    this.onItem)
			    .item(412, 325, 'dress2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress2,
				    this.onItem)
			    .item(412, 475, 'dress3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress3,
				    this.onItem)
			    .item(412, 611, 'dress4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress4,
				    this.onItem)
		    .build()
		    .page()
			    .item(412, 174, 'dress5',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress5,
				    this.onItem)
			    .item(412, 326, 'dress6',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress6,
				    this.onItem)
			    .item(406, 521, 'dress7',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Dress7,
				    this.onItem)
		    .build()
		    .page()
			    .item(384, 197, 'shoe1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe1,
				    this.onItem)
			    .item(384, 350, 'shoe2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe2,
				    this.onItem)
			    .item(384, 492, 'shoe3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe3,
				    this.onItem)
			    .item(384, 649, 'shoe4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe4,
				    this.onItem)
		    .build()
		    .page()
			    .item(384, 235, 'shoe5',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe5,
				    this.onItem)
			    .item(384, 412, 'shoe6',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe6,
				    this.onItem)
			    .item(384, 582, 'shoe7',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Shoe7,
				    this.onItem)
		    .build()
		    .page()
			    .item(385, 177, 'bag1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Bag1,
				    this.onItem)
			    .item(385, 317, 'bag2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Bag2,
				    this.onItem)
			    .item(385, 474, 'bag3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Bag3,
				    this.onItem)
			    .item(385, 634, 'bag4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Bag4,
				    this.onItem)
		    .build()
		    .page()
			    .item(420, 227, 'jew1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Jew1,
				    this.onItem)
			    .item(420, 410, 'jew2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Jew2,
				    this.onItem)
			    .item(420, 591, 'jew3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Jew3,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 1)
			    .item(411, 203, 'hair3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.MoHair3,
				    this.onItem)
			    .item(406, 390, 'hair2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.MoHair2,
				    this.onItem)
			    .item(402, 594, 'hair1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.MoHair1,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 1)
			    .item(429, 268, 'hair5',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.MoHair5,
				    this.onItem)
			    .item(405, 496, 'hair4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.MoHair4,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 2)
			    .item(399, 189, 'hair3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.EmHair3,
				    this.onItem)
			    .item(393, 391, 'hair2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.EmHair2,
				    this.onItem)
			    .item(420, 612, 'hair1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.EmHair1,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 2)
			    .item(401, 279, 'hair5',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.EmHair5,
				    this.onItem)
			    .item(420, 512, 'hair4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.EmHair4,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 3)
			    .item(420, 216, 'hair3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.LiHair3,
				    this.onItem)
			    .item(417, 392, 'hair2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.LiHair2,
				    this.onItem)
			    .item(424, 605, 'hair1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.LiHair1,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 3)
			    .item(405, 253, 'hair5',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.LiHair5,
				    this.onItem)
			    .item(410, 499, 'hair4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.LiHair4,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 4)
			    .item(403, 179, 'hair3',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.AnHair3,
				    this.onItem)
			    .item(404, 388, 'hair2',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.AnHair2,
				    this.onItem)
			    .item(426, 569, 'hair1',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.AnHair1,
				    this.onItem)
		    .build()
		    .page(GameConfig.SELECTED_ACTOR === 4)
			    .item(420, 286, 'hair5',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.AnHair5,
				    this.onItem)
			    .item(405, 491, 'hair4',
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
				    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.AnHair4,
				    this.onItem)
		    .build()
		    .build();

	    if (GameConfig.SELECTED_ACTOR === 1) {
		    this.doll2 = new Doll(this, -2 - 700, 94)
			    .layer(283, 87, 'bag_b',
				    'AtlasesDollCommonShopping',
				    'BbB', null, true)
			    .layer(167, -69, 'hair_b',
				    'AtlasesDollMonicaShopping',
				    'HB', 'HB')
			    .layer(0, 0, 'body',
				    'AtlasesDollMonicaShopping',
				    'Body', 'Body')
			    .layer(172, 126, 'und',
				    'AtlasesDollCommonShopping',
				    'Und', 'Und')
			    .layer(218, -59, 'head',
				    'AtlasesDollMonicaShopping',
				    'Head', 'Head')
			    .lipsL(218, -59, 'lips',
				    'AtlasesDollMonicaShopping',
				    'Lp', 'Lp')
			    .eyesL(218, -59, 'eyes',
				    'AtlasesDollMonicaShopping',
				    'Ee', 'Ee')
			    .layer(192, 642, 'shoe',
				    'AtlasesDollCommonShopping',
				    'S', null)
			    .layer(107, 67, 'dress',
				    'AtlasesDollCommonShopping',
				    'D', null)
			    .layer(212, 63, 'jew',
				    'AtlasesDollCommonShopping',
				    'J', null, true)
			    .layer(262, 55, 'bag',
				    'AtlasesDollCommonShopping',
				    'Bb', null, true)
			    .layer(158, -121, 'hair',
				    'AtlasesDollMonicaShopping',
				    'H', 'H');
	    }
	    else if (GameConfig.SELECTED_ACTOR === 2) {
		    this.doll2 = new Doll(this, -2 - 700, 94)
			    .layer(283, 87, 'bag_b',
				    'AtlasesDollCommonShopping',
				    'BbB', null, true)
			    .layer(144, -78, 'hair_b',
				    'AtlasesDollEmilyShopping',
				    'HB', 'HB')
			    .layer(0, 0, 'body',
				    'AtlasesDollEmilyShopping',
				    'Body', 'Body')
			    .layer(172, 126, 'und',
				    'AtlasesDollCommonShopping',
				    'Und', 'Und')
			    .layer(204, -54, 'head',
				    'AtlasesDollEmilyShopping',
				    'Head', 'Head')
			    .lipsL(204, -54, 'lips',
				    'AtlasesDollEmilyShopping',
				    'Lp', 'Lp')
			    .eyesL(204, -54, 'eyes',
				    'AtlasesDollEmilyShopping',
				    'Ee', 'Ee')
			    .layer(192, 642, 'shoe',
				    'AtlasesDollCommonShopping',
				    'S', null)
			    .layer(107, 67, 'dress',
				    'AtlasesDollCommonShopping',
				    'D', null)
			    .layer(212, 63, 'jew',
				    'AtlasesDollCommonShopping',
				    'J', null, true)
			    .layer(262, 55, 'bag',
				    'AtlasesDollCommonShopping',
				    'Bb', null, true)
			    .layer(135, -96, 'hair',
				    'AtlasesDollEmilyShopping',
				    'H', 'H');
	    }
	    else if (GameConfig.SELECTED_ACTOR === 3) {
		    this.doll2 = new Doll(this, -2 - 700, 94)
			    .layer(283, 87, 'bag_b',
				    'AtlasesDollCommonShopping',
				    'BbB', null, true)
			    .layer(177, -84, 'hair_b',
				    'AtlasesDollLilyShopping',
				    'HB', 'HB')
			    .layer(0, 0, 'body',
				    'AtlasesDollLilyShopping',
				    'Body', 'Body')
			    .layer(172, 126, 'und',
				    'AtlasesDollCommonShopping',
				    'Und', 'Und')
			    .layer(205, -58, 'head',
				    'AtlasesDollLilyShopping',
				    'Head', 'Head')
			    .lipsL(205, -58, 'lips',
				    'AtlasesDollLilyShopping',
				    'Lp', 'Lp')
			    .eyesL(205, -58, 'eyes',
				    'AtlasesDollLilyShopping',
				    'Ee', 'Ee')
			    .layer(192, 642, 'shoe',
				    'AtlasesDollCommonShopping',
				    'S', null)
			    .layer(107, 67, 'dress',
				    'AtlasesDollCommonShopping',
				    'D', null)
			    .layer(212, 63, 'jew',
				    'AtlasesDollCommonShopping',
				    'J', null, true)
			    .layer(262, 55, 'bag',
				    'AtlasesDollCommonShopping',
				    'Bb', null, true)
			    .layer(140, -106, 'hair',
				    'AtlasesDollLilyShopping',
				    'H', 'H');
	    }
	    else if (GameConfig.SELECTED_ACTOR === 4) {
		    this.doll2 = new Doll(this, -2 - 700, 94)
			    .layer(283, 87, 'bag_b',
				    'AtlasesDollCommonShopping',
				    'BbB', null, true)
			    .layer(159, -105, 'hair_b',
				    'AtlasesDollAngelaShopping',
				    'HB', 'HB')
			    .layer(0, 0, 'body',
				    'AtlasesDollAngelaShopping',
				    'Body', 'Body')
			    .layer(172, 126, 'und',
				    'AtlasesDollCommonShopping',
				    'Und', 'Und')
			    .layer(212, -56, 'head',
				    'AtlasesDollAngelaShopping',
				    'Head', 'Head')
			    .lipsL(212, -56, 'lips',
				    'AtlasesDollAngelaShopping',
				    'Lp', 'Lp')
			    .eyesL(212, -56, 'eyes',
				    'AtlasesDollAngelaShopping',
				    'Ee', 'Ee')
			    .layer(192, 642, 'shoe',
				    'AtlasesDollCommonShopping',
				    'S', null)
			    .layer(107, 67, 'dress',
				    'AtlasesDollCommonShopping',
				    'D', null)
			    .layer(212, 63, 'jew',
				    'AtlasesDollCommonShopping',
				    'J', null, true)
			    .layer(262, 55, 'bag',
				    'AtlasesDollCommonShopping',
				    'Bb', null, true)
			    .layer(157, -106, 'hair',
				    'AtlasesDollAngelaShopping',
				    'H', 'H');
	    }

	    this.btnContainer = this.game.add.group();
	    this.dressBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    52, 845, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.DrBtn,
			    true, false, true, this.selectCategory,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.dressBtn.scale.setTo(0);
	    this.dressBtn.alpha = 0;
	    this.shoeBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    153, 845, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.ShBtn,
			    true, false, true, this.selectCategory,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.shoeBtn.scale.setTo(0);
	    this.shoeBtn.alpha = 0;
	    this.acsBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    255, 845, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.AcBtn,
			    true, false, true, this.selectCategory,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.acsBtn.scale.setTo(0);
	    this.acsBtn.alpha = 0;
	    this.hairBtn =
		    GuiUtils.makeButton(
			    this, this.btnContainer,
			    358, 845, 1,
			    '', ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
			    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.HrBtn,
			    true, false, true, this.selectCategory,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
			    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.hairBtn.scale.setTo(0);
	    this.hairBtn.alpha = 0;
      
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
	
	    this.cloud = this.game.add.sprite(86, 525 + 550,
		    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames.Cloud);
	    this.txt = this.game.add.sprite(0, 0,
		    ImageUtils.getAtlasClass('AtlasesStateDressShopping').getName(),
		    ImageUtils.getAtlasClass('AtlasesStateDressShopping').Frames['Txt' + GameConfig.LOCALE]);
	    GuiUtils.centrize(this.txt);
	    this.txt.position.setTo(270, 710);
	    this.txt.alpha = 0;

        // GUI Buttons
	    this.gui.addGui();
	    this.gui.addPhotoBtn(null);
	    this.hintBtn = this.gui.addHintBtn(this.showTip);
	    this.hintBtn.alpha = 0;
	    this.hintBtn.scale.setTo(0);
	    this.closeBtn = this.gui.addExtraBtn(379, 521,
		    ImageUtils.getAtlasClass('AtlasesGui').getName(),
		    ImageUtils.getAtlasClass('AtlasesGui').Frames.CloseBtn,
		    () => {
			    TweenUtils.fadeAndScaleOut(this.closeBtn);
			    this.game.add.tween(this.cloud).to({ y: 525 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    this.game.add.tween(this.txt).to({ y: this.txt.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * .5);
			    TweenUtils.slideOut(this.doll.getBody(), 80 + 540, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
				    TweenUtils.fadeAndScaleIn(this.hintBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
				    // Girl
				    TweenUtils.slideIn(this.doll2.getBody(), -40, Phaser.Timer.SECOND * 1);
				    // Chest
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * 0, this.chest.show, this.chest);
				    TweenUtils.delayedCall(Phaser.Timer.SECOND * 1, () => {
					    this.tipShowing = false;
					    TweenUtils.fadeAndScaleIn(this.dressBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 0);
					    TweenUtils.fadeAndScaleIn(this.shoeBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .25);
					    TweenUtils.fadeAndScaleIn(this.acsBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .5);
					    TweenUtils.fadeAndScaleIn(this.hairBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .75);
				    }, this);
			    }, this);
		    },
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
		    GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
	    this.closeBtn.alpha = 0;
	    this.closeBtn.scale.setTo(0);
	    this.playBtn = this.gui.addPlayBtn(GuiButtons.RIGHT, () => {
	    	TweenUtils.fadeAndScaleOut(this.playBtn);
	    	TweenUtils.delayedCall(Phaser.Timer.SECOND * .5, this.chest.hide, this.chest);
	    	TweenUtils.fadeAndScaleOut(this.dressBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * .75);
	    	TweenUtils.fadeAndScaleOut(this.shoeBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1);
	    	TweenUtils.fadeAndScaleOut(this.acsBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.25);
	    	TweenUtils.fadeAndScaleOut(this.hairBtn, Phaser.Timer.SECOND * .75, Phaser.Timer.SECOND * 1.5);
	    	TweenUtils.move(this.doll2.getBody(), 30, 145, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1, () => {
	    		TweenUtils.delayedCall(Phaser.Timer.SECOND * 2, this.nextState, this);
		    }, this);
	    }, 222, 755);
	    this.playBtn.alpha = 0;
	    this.playBtn.scale.setTo(0);

        // Animations goes here
	    this.game.camera.flash(0x000000, 1000, true);
	    TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * 1);
	    this.game.add.tween(this.cloud).to({ y: 525 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 2);
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
    
    private selectCategory(sprite: Phaser.Button) {
    	if (sprite === this.dressBtn) {
    		this.curDr++;
    		if (this.curDr > 1) this.curDr = 0;
    		this.chest.showPage(this.curDr);
		    this.curSh = -1;
		    this.curAc = -1;
		    this.curHr = -1;
	    }
	    else if (sprite === this.shoeBtn) {
		    this.curSh++;
		    if (this.curSh > 1) this.curSh = 0;
		    this.chest.showPage(2 + this.curSh);
		    this.curDr = -1;
		    this.curAc = -1;
		    this.curHr = -1;
	    }
	    else if (sprite === this.acsBtn) {
		    this.curAc++;
		    if (this.curAc > 1) this.curAc = 0;
		    this.chest.showPage(4 + this.curAc);
		    this.curDr = -1;
		    this.curSh = -1;
		    this.curHr = -1;
	    }
	    else if (sprite === this.hairBtn) {
		    this.curHr++;
		    if (this.curHr > 1) this.curHr = 0;
		    this.chest.showPage(6 + this.curHr);
		    this.curDr = -1;
		    this.curSh = -1;
		    this.curAc = -1;
	    }
    }
	
	private showTip() {
		if (this.animating) return;
		this.animating = true;
		if (this.tipShowing) {
			this.game.add.tween(this.cloud).to({ y: 525 + 550 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
			this.game.add.tween(this.txt).to({ y: this.txt.y + 500 }, Phaser.Timer.SECOND * 1, Phaser.Easing.Circular.In, true, Phaser.Timer.SECOND * 0);
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
			this.txt.position.setTo(270, 710);
			this.txt.alpha = 0;
			TweenUtils.fadeIn(this.fader);
			TweenUtils.slideIn(this.doll.getBody(), 80, Phaser.Timer.SECOND * 1, Phaser.Timer.SECOND * .5);
			this.game.add.tween(this.cloud).to({ y: 525 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Elastic.Out, true, Phaser.Timer.SECOND * 1.5);
			TweenUtils.fadeIn(this.txt, Phaser.Timer.SECOND * .5, Phaser.Timer.SECOND * 3, () => {
				this.animating = false;
			}, this);
			this.tipShowing = true;
		}
	}
	
	private onItem(item: Phaser.Button): void {
		const name = item.name;
		let index: number;
		if (name.indexOf('dress') !== -1) {
			index = parseInt(name.substr(5));
			if (this.doll2.on('dress', index, 'top', 'bot', 'und'))
				this.chest.onEquiped(name, 'dress', 'top', 'bot');
			this.doll2.on('dress_b', index);
			this.doll2.on('dress_f', index);
			this.dressDressed = true;
		}
		else if (name.indexOf('top') !== -1) {
			index = parseInt(name.substr(3));
			if (this.doll2.on('top', index, 'dress'))
				this.chest.onEquiped(name, 'top', 'dress');
			this.doll2.on('top_f', index);
			this.doll2.on('top_b', index);
		}
		else if (name.indexOf('bot') !== -1) {
			index = parseInt(name.substr(3));
			if (this.doll2.on('bot', index, 'dress'))
				this.chest.onEquiped(name, 'bot', 'dress');
			this.doll2.on('bot_f', index);
			this.doll2.on('bot_b', index);
		}
		else if (name.indexOf('shoe') !== -1) {
			index = parseInt(name.substr(4));
			if (this.doll2.on('shoe', index))
				this.chest.onEquiped(name, 'shoe');
			this.doll2.on('shoe_b', index);
			this.shoeDressed = true;
		}
		else if (name.indexOf('jew') !== -1) {
			index = parseInt(name.substr(3));
			this.doll2.on('jew', index);
			this.doll2.on('jew_b', index);
			this.doll2.on('jew_f', index);
		}
		else if (name.indexOf('hat') !== -1) {
			index = parseInt(name.substr(3));
			this.doll2.on('hat', index);
		}
		else if (name.indexOf('acs') !== -1) {
			index = parseInt(name.substr(3));
			this.doll2.on('acs', index, 'bag');
		}
		else if (name.indexOf('bag') !== -1) {
			index = parseInt(name.substr(3));
			this.doll2.on('bag', index, 'acs');
			this.doll2.on('bag_b', index);
			this.doll2.on('bag_f', index);
		}
		else if (name.indexOf('glove') !== -1) {
			index = parseInt(name.substr(5));
			this.doll2.on('glove', index);
		}
		else if (name.indexOf('glass') !== -1) {
			index = parseInt(name.substr(5));
			this.doll2.on('glass', index);
		}
		else if (name.indexOf('belt') !== -1) {
			index = parseInt(name.substr(4));
			this.doll2.on('belt', index);
		}
		else if (name.indexOf('hair') !== -1) {
			index = parseInt(name.substr(4));
			if (this.doll2.on('hair', index))
				this.chest.onEquiped(name, 'hair');
			this.doll2.on('hair_b', index);
		}
		if (this.playBtn.alpha === 0 && this.shoeDressed && this.dressDressed) {
			TweenUtils.fadeAndScaleIn(this.playBtn);
		}
	}

    public update(): void {
        super.update(this.game);
    }

    public shutdown(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.bg.destroy(true);
        this.txt.destroy(true);
        this.cloud.destroy(true);
        this.fader.destroy(true);
        this.dressBtn.destroy(true);
        this.shoeBtn.destroy(true);
        this.acsBtn.destroy(true);
        this.hairBtn.destroy(true);
        this.btnContainer.destroy(true);
        if (this.spinner) this.spinner.destroy(true);
        if (this.blocker) this.blocker.destroy(true);
		this.doll.dispose();
		this.chest.dispose();
        this.gui.dispose();
        GameConfig.DOLL_1 = this.doll2.extract();
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

