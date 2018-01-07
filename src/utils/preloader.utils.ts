import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';
import {ImageUtils} from './images/image.utils';

export class PreloaderUtils {

    public static preloadMainTheme(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (Assets.Audio['AudioMainTheme'] != null) {
            game.load.audio(
                Assets.Audio['AudioMainTheme'].getName(),
                Assets.Audio['AudioMainTheme'].getMP3(),
                true);
        } else {
            if (DEBUG)
                console.log(`\nNo default Main Theme audio was found.`);
        }
        this.soundAdditionalLoads();
    }

    public static preloadEffects(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesEffects') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesEffects').getName(),
                ImageUtils.getAtlasClass('AtlasesEffects').getPNG(),
                ImageUtils.getAtlasClass('AtlasesEffects').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default Effects graphics was found.`);
        }
    }

    public static preloadStartState(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        if (ImageUtils.getAtlasClass('AtlasesStateStart') != null) {
            game.load.atlasJSONArray(
                ImageUtils.getAtlasClass('AtlasesStateStart').getName(),
                ImageUtils.getAtlasClass('AtlasesStateStart').getPNG(),
                ImageUtils.getAtlasClass('AtlasesStateStart').getJSONArray());
        } else {
            if (DEBUG)
                console.log(`\nNo default StartState graphics was found.`);
        }
        this.startStateAdditionalLoads();
    }

    /** ------------------------------------------------------------------------
     * Aditional loads for extending tries of default predefined assets loading
    ------------------------------------------------------------------------- */

    private static startStateAdditionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesBg').getName(),
            ImageUtils.getImageClass('ImagesBg').getJPG());
        /*game.load.image(
            ImageUtils.getImageClass('ImagesFg').getName(),
            ImageUtils.getImageClass('ImagesFg').getPNG());*/
        /*game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesStateStart2').getName(),
            ImageUtils.getAtlasClass('AtlasesStateStart2').getPNG(),
            ImageUtils.getAtlasClass('AtlasesStateStart2').getJSONArray());
        game.load.spritesheet(
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getName(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getPNG(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getFrameWidth(),
            ImageUtils.getSpritesheetClass('SpritesheetsMoreE1621624').getFrameHeight());*/
    }
}