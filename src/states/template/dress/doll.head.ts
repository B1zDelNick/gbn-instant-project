import {GameConfig} from '../../../config/game.config';
import {isNull, isUndefined} from 'util';
import {ImageUtils} from '../../../utils/images/image.utils';

export class DollHead {

    private game: Phaser.Game = null;
    private sprite: Phaser.Sprite = null;
    private assetClass: string = null;
    private guiAtlas: string = null;
    private dummyFrame: any = null;
    private prefix: string;

    constructor(container: Phaser.Group, x: number, y: number, assetClass: string) {
        this.game = GameConfig.GAME;
        this.assetClass = assetClass;
        this.prefix = "";
    }

    remove() {
        this.sprite.loadTexture(this.guiAtlas, this.dummyFrame);
    }

    dispose(): void {
        this.sprite.destroy(true);
    }
}