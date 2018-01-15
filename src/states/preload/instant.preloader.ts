import {IPreloader} from './i.preloader';
import {GameConfig} from '../../config/game.config';
import {SoundUtils} from '../../utils/sound/sound.utils';
import {ImageUtils} from '../../utils/images/image.utils';
import {GuiUtils} from '../../utils/gui.utils';
import {TweenUtils} from '../../utils/tween.utils';
import {EffectUtils} from '../../utils/effect.utils';

export class InstanrPreloader implements IPreloader {

    game: Phaser.Game;
    state: Phaser.State;

    private bg: Phaser.Sprite = null;
    private title: Phaser.Sprite = null;
    private preloadBarSprite: Phaser.Sprite = null;
    private preloadFrameSprite: Phaser.Sprite = null;

    private NEXT: string;

    constructor(state: Phaser.State, next: string = 'Start') {
        this.game = GameConfig.GAME;
        this.state = state;
        this.NEXT = next;
    }

    public preload(): void {

        /** BG */
        this.bg = this.game.add.sprite(0, 0, ImageUtils.getImageClass('ImagesPrerollBg').getName());
	
	    this.title = this.game.add.sprite(0, 270, ImageUtils.getImageClass('ImagesTitle' + GameConfig.LOCALE).getName());
	    GuiUtils.centrize(this.title);
	    // this.title.scale.setTo(.9);
	    EffectUtils.makeLightRotateAnimation(this.title, 550, 4);
	    EffectUtils.makeScaleAnimation(this.title, 1.02, 1100);
        
        /**
         * Preloader Progress Bar
         */

        this.preloadFrameSprite = this.game.add.sprite(0, 780,
            ImageUtils.getAtlasClass('AtlasesStatePreroll').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePreroll').Frames.Progressbar1);
        this.preloadBarSprite = this.game.add.sprite(0, 780,
            ImageUtils.getAtlasClass('AtlasesStatePreroll').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePreroll').Frames.Progressbar2);
        this.preloadBarSprite.x = this.preloadFrameSprite.x = this.game.world.centerX - this.preloadFrameSprite.width / 2;
        this.game.load.setPreloadSprite(this.preloadBarSprite);
    }

    public create(): void {
        this.preloadBarSprite.visible = this.preloadFrameSprite.visible = false;
    }

    public update(): void {
    }

    public dispose(): void {
        this.game.time.events.removeAll();
        this.game.tweens.removeAll();
        this.bg.destroy(true);
        this.preloadBarSprite.destroy(true);
        this.preloadFrameSprite.destroy(true);
    }

    public enableButton(): void {
        this.nextState();
    }

    private nextState(): void {
        this.game.camera.onFadeComplete.addOnce(() => {
            SoundUtils.init();
            this.game.time.events.removeAll();
            this.game.tweens.removeAll();
            this.game.state.start(this.NEXT);
        }, this);
        this.game.camera.fade(0x000000, 400, true, .75);
    }
}