import {IGui} from './i.gui';
import {GadgetMode, GameConfig} from '../../config/game.config';
import {GuiUtils} from '../../utils/gui.utils';

import {isNull, isString} from 'util';
import {ImageUtils} from '../../utils/images/image.utils';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {TweenUtils} from '../../utils/tween.utils';
import {GuiButtons} from './enum.gui';

export class InstantGui implements IGui {

    private game: Phaser.Game;
    private state: Phaser.State;

    private guiContainer: Phaser.Group = null;
    private playButton: Phaser.Button = null;
    private gearButton: Phaser.Button = null;
    private musonButton: Phaser.Button = null;
    private musoffButton: Phaser.Button = null;
    private sndonButton: Phaser.Button = null;
    private sndoffButton: Phaser.Button = null;
    private logoButton: Phaser.Button = null;
    private photoButton: Phaser.Button = null;
    private moreButton: Phaser.Button = null;
    private moreButton2: Phaser.Sprite = null;
    private copyButton: Phaser.Button = null;
    private hintButton: Phaser.Button = null;

    private extras: Array<Phaser.Button> = [];
    private extras2: Array<Phaser.Sprite> = [];
    private settings: Array<Phaser.Button> = [];
    private gearOpened: boolean = false;

    constructor(state: Phaser.State) {
        this.game = GameConfig.GAME;
        this.state = state;
    }

    addGui(): void {
        this.guiContainer = this.game.add.group();
        this.addGearBtn();
    }

    addGearBtn(): Phaser.Button {
        this.gearButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                422, 4, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.GearBtn,
                true, false, true, this.onGearClick,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.addSoundBtns();
        this.addMusicBtns();
        return this.gearButton;
    }

    private onGearClick() {
        if (this.gearOpened) {
            let delay = 0;
            if (this.photoButton) {
                TweenUtils.fadeAndScaleOut(this.photoButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
                delay += .2;
            }
            TweenUtils.fadeAndScaleOut(this.musonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
            TweenUtils.fadeAndScaleOut(this.musoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
            delay += .2;
            TweenUtils.fadeAndScaleOut(this.sndonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
            TweenUtils.fadeAndScaleOut(this.sndoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * delay);
        }
        else {
            TweenUtils.fadeAndScaleIn(this.sndonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * 0);
            TweenUtils.fadeAndScaleIn(this.sndoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * 0);
            TweenUtils.fadeAndScaleIn(this.musonButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * .2);
            TweenUtils.fadeAndScaleIn(this.musoffButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * .2);
            if (this.photoButton)
                TweenUtils.fadeAndScaleIn(this.photoButton, Phaser.Timer.SECOND * .4, Phaser.Timer.SECOND * .4);
        }
        this.gearOpened = !this.gearOpened;
    }

    addPhotoBtn(callback?: Function): Phaser.Button {
        this.photoButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                438, 246, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.PhotoBtn,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.photoButton.scale.setTo(0);
        this.photoButton.alpha = 0;
        return this.photoButton;
    }

    addCopyrightBtn(callback?: Function): Phaser.Button {
        this.copyButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                226, 0, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.DArrowBtn,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        return this.copyButton;
    }
    
    addHintBtn(callback?: Function): Phaser.Button {
        this.hintButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                4, 2, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.HintBtn,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        return this.hintButton;
    }

    addPlayBtn(type: GuiButtons, callback?: Function, x?: number, y?: number): Phaser.Button {
        let asset: any;
        if (type === GuiButtons.START) {
            asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.StartBtn;
        }
        else if (type === GuiButtons.DONE) {
            asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.DoneBtn;
        }
        else if (type === GuiButtons.GO) {
	        asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.GoBtn;
        }
        else if (type === GuiButtons.RIGHT) {
	        asset = ImageUtils.getAtlasClass('AtlasesGui').Frames.RightBtn;
        }
        this.playButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(), asset,
                true, false, true, callback,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        return this.playButton;
    }

    addExtraMore(x: number, y: number, asset: string, frames?: any|any[],
                 overHandler: Function = GuiUtils.addOverHandler,
                 outHandler: Function = GuiUtils.addOutHandler,
                 callback: Function = null): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        this.moreButton =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton;
    }

    addExtraMoreAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number = 10, loop: boolean = true,
                         overHandler: Function = GuiUtils.addOverHandler,
                         outHandler: Function = GuiUtils.addOutHandler,
                         callback: Function = null): Phaser.Sprite {

        this.moreButton2 =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        return this.moreButton2;
    }

    addMoreBtn(): Phaser.Button {
        /*this.moreButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                810, 590, 1,
                '', ImageUtils.getSpritesheetClass('SpritesheetsMoreMcg1651322').getName(), [0, 1, 0],
                true, false, true, GuiUtils.goLinkMainMoreGames, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);*/
        return this.moreButton;
    }

    addLogoBtn(): Phaser.Button {
        /*this.logoButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                -10, -10, 1,
                '', ImageUtils.getAtlasClass('AtlasesGuiMcg').getName(),
                ImageUtils.getAtlasClass('AtlasesGuiMcg').Frames.LogoMcg,
                true, false, true, GuiUtils.goLinkMainLogo, GuiUtils.addOverHandlerMcg, GuiUtils.addOutHandlerMcg);*/
        return this.logoButton;
    }

    addMusicBtns(): Array<Phaser.Button> {
        this.musonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                438, 176, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.MusOnBtn,
                true, false, SoundUtils.isMusicEnabled(),
                SoundUtils.mainThemeSwitch,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.musoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                438, 176, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.MusOffBtn,
                true, false, !SoundUtils.isMusicEnabled(),
                SoundUtils.mainThemeSwitch,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.musonButton.scale.setTo(0);
        this.musonButton.alpha = 0;
        this.musoffButton.scale.setTo(0);
        this.musoffButton.alpha = 0;
        SoundUtils.onSwitchAudio.add(() => {
            this.musonButton.visible = !this.musonButton.visible;
            this.musoffButton.visible = !this.musoffButton.visible;
        }, this);
        return [this.musonButton, this.musoffButton];
    }

    addSoundBtns(): Array<Phaser.Button> {
        this.sndonButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                438, 106, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.SndOnBtn,
                true, false, SoundUtils.isSoundEnabled(),
                SoundUtils.soundSwitch,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.sndoffButton =
            GuiUtils.makeButton(
                this, this.guiContainer,
                438, 106, 1,
                '', ImageUtils.getAtlasClass('AtlasesGui').getName(),
                ImageUtils.getAtlasClass('AtlasesGui').Frames.SndOffBtn,
                true, false, !SoundUtils.isSoundEnabled(),
                SoundUtils.soundSwitch,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOverHandlerMcg : null,
                GameConfig.GADGET === GadgetMode.DESKTOP ? GuiUtils.addOutHandlerMcg : null);
        this.sndonButton.scale.setTo(0);
        this.sndonButton.alpha = 0;
        this.sndoffButton.scale.setTo(0);
        this.sndoffButton.alpha = 0;
        SoundUtils.onSwitchSound.add(() => {
            this.sndonButton.visible = !this.sndonButton.visible;
            this.sndoffButton.visible = !this.sndoffButton.visible;
        }, this);
        return [this.sndonButton, this.sndoffButton];
    }

    addExtraBtn(x: number, y: number, asset: string, frames?: any|any[],
                callback?: Function,
                overHandler: Function = GuiUtils.addOverHandler,
                outHandler: Function = GuiUtils.addOutHandler): Phaser.Button {

        if (frames == null) {
            frames = [0, 0, 0];
        }
        else if (isString(frames)) {
            frames = [frames, frames, frames];
        }

        const btn =
            GuiUtils.makeButton(
                this.state, this.guiContainer,
                x, y, 1,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.guiContainer.add(btn);
        this.extras.push(btn);

        return btn;
    }

    addExtraBtnAnimated(x: number, y: number, asset: string, frames: any[], frameRate: number = 10, loop: boolean = true,
                        callback?: Function,
                        overHandler: Function = GuiUtils.addOverHandler,
                        outHandler: Function = GuiUtils.addOutHandler): Phaser.Sprite {

        const btn =
            GuiUtils.makeSpritesheetButton(
                this.state, this.guiContainer,
                x, y, 1, frameRate, loop,
                '', asset, frames,
                true, false, true, callback, overHandler, outHandler);

        this.extras2.push(btn);

        return btn;
    }

    hideStandart(): void {
        this.musonButton.visible = false;
        this.musonButton.visible = false;
        this.logoButton.visible = false;
        if (this.moreButton) this.moreButton.visible = false;
        if (this.moreButton2) this.moreButton2.visible = false;
        if (this.playButton) this.playButton.visible = false;
    }

    hideAll(): void {
    	this.guiContainer.visible = false;
    }

    disable(): void {
        for (let btn of this.extras) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        for (let btn of this.extras2) {
            btn.inputEnabled = false;
            btn.filters = null;
        }
        if (!isNull(this.playButton)) {
            this.playButton.inputEnabled = false;
            this.playButton.filters = null;
            TweenUtils.fadeAndScaleOut(this.playButton);
        }
        this.musonButton.inputEnabled = false;
        this.musonButton.filters = null;
        this.musoffButton.inputEnabled = false;
        this.musoffButton.filters = null;
	    this.sndonButton.inputEnabled = false;
	    this.sndonButton.filters = null;
	    this.sndoffButton.inputEnabled = false;
	    this.sndoffButton.filters = null;
	    this.gearButton.inputEnabled = false;
	    this.gearButton.filters = null;
	    if (this.photoButton) {
		    this.photoButton.inputEnabled = false;
		    this.photoButton.filters = null;
	    }
	    if (this.hintButton) {
		    this.hintButton.inputEnabled = false;
		    this.hintButton.filters = null;
	    }
	    if (this.copyButton) {
		    this.copyButton.inputEnabled = false;
		    this.copyButton.filters = null;
	    }
    }

    dispose(): void {
        SoundUtils.onSwitchAudio.removeAll(this);
        SoundUtils.onSwitchSound.removeAll(this);
        if (!isNull(this.playButton)) this.playButton.destroy(true);
        this.musonButton.destroy(true);
        this.musoffButton.destroy(true);
        if (!isNull(this.moreButton)) this.moreButton.destroy(true);
        if (!isNull(this.moreButton2)) this.moreButton2.destroy(true);
        for (let btn of this.extras) {
            btn.destroy(true);
        }
        for (let btn of this.extras2) {
            btn.destroy(true);
        }
        this.guiContainer.destroy(true);
    }
}