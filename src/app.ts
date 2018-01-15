import * as WebFontLoader from 'webfontloader';

import Boot from './states/boot';
import Preloader from './states/preloader';
import * as Utils from './utils/utils';
import * as Assets from './assets';
import Start from './states/start';
import {AssetMode, GadgetMode, GameConfig, PublishMode} from './config/game.config';
import Select from './states/select';
import Comix from './states/comix';
import SelectStage from './states/select_stage';
import Shopping from './states/shopping';
import DressShopping from './states/dress_shopping';
import RunawayShopping from './states/runaway_shopping';
import DietMatching from './states/diet_matching';
import DietDecor from './states/diet_decor';
import ComixRivals from './states/comix_rivals';
import HiddenRivals from './states/hidden_rivals';
import SlackRivals from './states/slack_rivals';
import RunawayRivals from './states/runaway_rivals';

class App extends Phaser.Game {
    constructor(config: Phaser.IGameConfig) {
        super (config);

        this.state.add('Boot', Boot);
        this.state.add('Preloader', Preloader);
        this.state.add('Start', Start);
        this.state.add('Select', Select);
        this.state.add('Comix', Comix);
        this.state.add('SelectStage', SelectStage);
        this.state.add('Shopping', Shopping);
        this.state.add('DressShopping', DressShopping);
        this.state.add('RunawayShopping', RunawayShopping);
        this.state.add('DietMatching', DietMatching);
        this.state.add('DietDecor', DietDecor);
        this.state.add('ComixRivals', ComixRivals);
        this.state.add('HiddenRivals', HiddenRivals);
        this.state.add('SlackRivals', SlackRivals);
        this.state.add('RunawayRivals', RunawayRivals);

        this.state.start('Boot');
    }
}

function startApp(): void {
    let gameWidth: number = DEFAULT_GAME_WIDTH;
    let gameHeight: number = DEFAULT_GAME_HEIGHT;

    if (SCALE_MODE === 'USER_SCALE') {
        let screenMetrics: Utils.ScreenMetrics = Utils.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);
        gameWidth = screenMetrics.gameWidth;
        gameHeight = screenMetrics.gameHeight;
    }

    // There are a few more options you can set if needed, just take a look at Phaser.IGameConfig
    let gameConfig: Phaser.IGameConfig = {
        width: gameWidth,
        height: gameHeight,
        renderer: Phaser.AUTO,
        parent: 'game-container',
        resolution: 1,
        transparent: true
    };

    let app = new App(gameConfig);
    GameConfig.init(
        app.device.desktop ? GadgetMode.DESKTOP : GadgetMode.MOBILE,
        PublishMode.VK,
        AssetMode.LOAD_ALL,
        'Next Supermodel Stars');

    GameConfig.GAME = app;
    // app.stage.disableVisibilityChange = true;
}

window.onload = () => {
    let webFontLoaderOptions: any = null;
    let webFontsToLoad: string[] = GOOGLE_WEB_FONTS;

    if (webFontsToLoad.length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.google = {
            families: webFontsToLoad
        };
    }

    if (Object.keys(Assets.CustomWebFonts).length > 0) {
        webFontLoaderOptions = (webFontLoaderOptions || {});

        webFontLoaderOptions.custom = {
            families: [],
            urls: []
        };

        for (let font in Assets.CustomWebFonts) {
            webFontLoaderOptions.custom.families.push(Assets.CustomWebFonts[font].getFamily());
            webFontLoaderOptions.custom.urls.push(Assets.CustomWebFonts[font].getCSS());
        }
    }

    if (webFontLoaderOptions === null) {
        // Just start the game, we don't need any additional fonts
        startApp();
    } else {
        // Load the fonts defined in webFontsToLoad from Google Web Fonts, and/or any Local Fonts then start the game knowing the fonts are available
        webFontLoaderOptions.active = startApp;

        WebFontLoader.load(webFontLoaderOptions);
    }
};
