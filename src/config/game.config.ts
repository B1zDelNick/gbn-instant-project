import {Doll} from '../states/template/dress/doll';
import {DecorBackground} from '../states/template/decor/decor.background';

export class GameConfig {

    public static GAME: Phaser.Game = null;
    public static GADGET: GadgetMode = null;
    public static LOCALE: LOCALE = null;
    public static ASSET_MODE: AssetMode = null;
    public static ASSET_SIZE: string = null;
    public static PUB_MODE: PublishMode = null;
    public static IS_ASSETS_LOADED: boolean = false;
    public static CURRENT_STATE: number = 0;
    public static GAME_RESULT: number = 0;
    public static GAME_COMPLETED: boolean = false;
    public static DOLL_3_UNLOCKED: boolean = false;
    public static DOLL_4_UNLOCKED: boolean = false;

    public static DOLL_1: Doll = null;
    public static DOLL_2: Doll = null;
    public static DOLL_3: Doll = null;
    public static DOLL_4: Doll = null;

    public static DECOR_1: DecorBackground = null;
    public static DECOR_2: DecorBackground = null;

    public static CONT_1: Phaser.Group = null;
    public static CONT_2: Phaser.Group = null;

    public static FREE_RESULT: any = null;

    public static SELECTED_BG: number = 0;
    public static SELECTED_ACTOR: number = 0;
    public static SELECTED_STAGE: number = 0;
    public static PROGRESS: number = 0;

    private static _inited: boolean = false;
    private static _gameId: string;

    public static init(gadget: GadgetMode, pmode: PublishMode, amode: AssetMode, gameTitle: string) {
        if (this._inited) return;

        this._inited = true;
        this.GADGET = gadget;
        this.ASSET_MODE = amode;
        this.PUB_MODE = pmode;
    }

    public static getTitle(): string {
        return this._gameId;
    }
}

export enum LOCALE {
    RUS = "Ru",
    ENG = "En"
}

export enum GadgetMode {
    DESKTOP,
    MOBILE
}

export enum PublishMode {
    VK,
    FB,
    OK,
    WEB
}

export enum AssetMode {
    LOAD_ALL,
    LOAD_BACKGROUND,
    LOAD_BEFORE
}
