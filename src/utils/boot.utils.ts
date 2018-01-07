import * as Assets from '../assets';
import {GameConfig, PublishMode} from '../config/game.config';
import {ImageUtils} from './images/image.utils';

export class BootUtils {

    public static preload(): void {
        const game = GameConfig.GAME;
        // Load any assets you need for your preloader state here.
        game.load.image(
            ImageUtils.getImageClass('ImagesPrerollBg').getName(),
            ImageUtils.getImageClass('ImagesPrerollBg').getJPG());
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
        if (GameConfig.PUB_MODE !== PublishMode.NO_AD && GameConfig.PUB_MODE !== PublishMode.GGG) {
            game.load.script(
                Assets.Scripts.ScriptsBlurX.getName(),
                Assets.Scripts.ScriptsBlurX.getJS());
            game.load.script(
                Assets.Scripts.ScriptsBlurY.getName(),
                Assets.Scripts.ScriptsBlurY.getJS());
        }
    }
}
