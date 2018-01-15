import * as Assets from '../assets';
import {GameConfig} from '../config/game.config';
import {ImageUtils} from './images/image.utils';

export class BootUtils {

    public static preload(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            ImageUtils.getImageClass('ImagesPrerollBg').getName(),
            ImageUtils.getImageClass('ImagesPrerollBg').getJPG());
	    game.load.image(
		    ImageUtils.getImageClass('ImagesTitle' + GameConfig.LOCALE).getName(),
		    ImageUtils.getImageClass('ImagesTitle' + GameConfig.LOCALE).getPNG());
        game.load.atlasJSONArray(
            ImageUtils.getAtlasClass('AtlasesStatePreroll').getName(),
            ImageUtils.getAtlasClass('AtlasesStatePreroll').getPNG(),
            ImageUtils.getAtlasClass('AtlasesStatePreroll').getJSONArray());
        this.additionalLoads();
    }

    private static additionalLoads(): void {
        const game = GameConfig.GAME;
        // Additional loading HERE, exp: BlurX script etc
        game.load.image(
            ImageUtils.getImageClass('ImagesSpin').getName(),
            ImageUtils.getImageClass('ImagesSpin').getPNG());
        game.load.script(
            Assets.Scripts.ScriptsBlurX.getName(),
            Assets.Scripts.ScriptsBlurX.getJS());
        game.load.script(
            Assets.Scripts.ScriptsBlurY.getName(),
            Assets.Scripts.ScriptsBlurY.getJS());
    }
}
