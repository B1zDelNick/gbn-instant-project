import * as AssetUtils from '../utils/asset.utils';
import {IPreloader} from './preload/i.preloader';
import {AssetMode, GameConfig} from '../config/game.config';
import {InstanrPreloader} from './preload/instant.preloader';

export default class Preloader extends Phaser.State {

    private preloader: IPreloader = null;

    public init(...args: any[]): void {
        this.preloader = new InstanrPreloader(this, 'DressShopping');
    }

    public preload(): void {
        this.preloader.preload();
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
        else if (GameConfig.ASSET_MODE === AssetMode.LOAD_BACKGROUND) {
            /*PreloaderUtils.preloadMainTheme();
            PreloaderUtils.preloadSaver();
            PreloaderUtils.preloadEffects();
            PreloaderUtils.preloadStartState();*/
            AssetUtils.Loader.loadSelectedAssets(this.game, false, this.waitForSoundDecoding, this);
        }
    }

    public create(): void {
        this.preloader.create();
    }

    public update(): void {
        super.update(this.game);
        this.preloader.update();
    }

    public shutdown(): void {
        this.preloader.dispose();
    }

    private waitForSoundDecoding(): void {
        if (GameConfig.ASSET_MODE === AssetMode.LOAD_ALL)
            GameConfig.IS_ASSETS_LOADED = true;
        AssetUtils.Loader.waitForSoundDecoding(() => {
            // enable sound or else
            this.preloader.enableButton();
        }, this);
    }
}
