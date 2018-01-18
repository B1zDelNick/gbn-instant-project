import {IParticle} from './i.particle';
import {GameConfig} from '../../../config/game.config';
import {TweenUtils} from '../../../utils/tween.utils';

export class HeartsParticles implements IParticle {

    private game: Phaser.Game = null;
    private emitter: Phaser.Particles.Arcade.Emitter = null;
	private update_interval: number;
	private max: number;
	private i: number;

    constructor(private mi: number = .35, private ma: number = .65) {
	    this.max = 0;
	    this.update_interval = 3 * 60;
	    this.i = 0;
    }

    init( asset: string, frames?: any|any[], rate: number = 100, w: number = 960, c: number = 480): void {
        this.game = GameConfig.GAME;
        this.emitter = this.game.add.emitter(c, -50, rate);
        // this.emitter.width = w;
        this.emitter.makeParticles(asset, frames);
        // this.emitter.minParticleSpeed.setTo(-100, 30);
        // this.emitter.maxParticleSpeed.setTo(100, 100);
        this.emitter.minParticleScale = this.mi;
        this.emitter.maxParticleScale = this.ma;
	    this.emitter.minRotation = 0;
	    this.emitter.maxRotation = 30;
	    this.emitter.setXSpeed(-20, 20);
	    this.emitter.setYSpeed(-30, -75);
        this.emitter.gravity = new Phaser.Point(5, -10);
    }
	
	setPos(x: number, y: number) {
		this.emitter.x = x;
		this.emitter.y = y;
	}

    addToContainer(cont: Phaser.Group): void {
        cont.add(this.emitter);
    }
    
    setIndex(index: number) {
	    (this.emitter.parent as Phaser.Group).setChildIndex(this.emitter, 1);
    }
	
	addToContainerAt(cont: Phaser.Group, index: number): void {
		cont.addAt(this.emitter, index);
	}

    start(): void {
        this.emitter.flow(7000, 300, 1, -1);
    }
	
	on(): void {
		this.emitter.on = true;
	}
	
	off(): void {
		this.emitter.on = false;
	}

    update(): void {
    }

    dispose(): void {
        this.emitter.kill();
        this.emitter.destroy(true);
    }

}