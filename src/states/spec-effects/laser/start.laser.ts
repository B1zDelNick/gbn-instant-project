import {ILaser} from './i.laser';
import {GameConfig} from '../../../config/game.config';
import {isString} from 'util';

export class StartLaser implements ILaser {

    private game: Phaser.Game = null;

    private container: Phaser.Group = null;
    private laser1: Phaser.Sprite = null;
    private laser2: Phaser.Sprite = null;
    private laser3: Phaser.Sprite = null;
    private laser4: Phaser.Sprite = null;

    constructor() {
        this.game = GameConfig.GAME;
    }

    init(asset: string, frame?: any|any[]): void {
        if (frame) {
            if (isString(frame)) {
                frame = [frame, frame, frame, frame];
            }
        }
        else {
            frame = [null, null, null, null];
        }
        this.container = this.game.add.group();
        this.container.add(
            this.laser1 = this.game.add.sprite(102, -152, asset, frame[0])
        );
        this.container.add(
            this.laser2 = this.game.add.sprite(578, -125, asset, frame[1])
        );
        this.container.add(
            this.laser3 = this.game.add.sprite(-87, -111, asset, frame[2])
        );
        this.container.add(
            this.laser4 = this.game.add.sprite(390, -159, asset, frame[3])
        );

        this.laser1.anchor.setTo(.5, 0);
        this.laser2.anchor.setTo(.5, 0);
        this.laser3.anchor.setTo(.5, 0);
        this.laser4.anchor.setTo(.5, 0);

        this.laser1.angle = -10.5;
        this.laser2.angle = 9;
        this.laser3.angle = -10;
        this.laser4.angle = 6;
    }

    getContainer(): Phaser.Group {
        return this.container;
    }

    start(): void {
        this.game.add.tween(this.laser1).to({ angle: -23 }, Phaser.Timer.SECOND * 1.3, Phaser.Easing.Linear.None, true, 0, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser2).to({ angle: 33 }, Phaser.Timer.SECOND * 1.8, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser3).to({ angle: -28 }, Phaser.Timer.SECOND * 1.9, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
        this.game.add.tween(this.laser4).to({ angle: -9.5 }, Phaser.Timer.SECOND * 1.5, Phaser.Easing.Linear.None, true, 200, 99999)
            .yoyo(true);
    }
	
	stop(): void {
		this.game.tweens.removeFrom(this.laser1);
		this.game.tweens.removeFrom(this.laser2);
		this.game.tweens.removeFrom(this.laser3);
		this.game.tweens.removeFrom(this.laser4);
	}

    dispose(): void {
        this.game.tweens.removeFrom(this.laser1);
        this.game.tweens.removeFrom(this.laser2);
        this.game.tweens.removeFrom(this.laser3);
        this.game.tweens.removeFrom(this.laser4);
        this.laser1.destroy(true);
        this.laser2.destroy(true);
        this.laser3.destroy(true);
        this.laser4.destroy(true);
        this.container.destroy(true);
    }

}