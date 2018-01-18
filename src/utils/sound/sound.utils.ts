import * as Assets from '../../assets';
import {GameConfig} from '../../config/game.config';
import {isNull, isUndefined} from 'util';

export class SoundUtils {

    private static globalSoundEnabled: boolean = true;
    private static globalMusicEnabled: boolean = true;
    private static audios: Array<Phaser.Sound> = [];
    private static audioSprites: Array<Phaser.AudioSprite> = [];
    public static onSwitchAudio: Phaser.Signal;
    public static onSwitchSound: Phaser.Signal;
    private static currentTheme: string;

    public static init(mainTheme?: string): void {
        this.currentTheme = 'MainTheme';
        this.onSwitchAudio = new Phaser.Signal();
        this.onSwitchSound = new Phaser.Signal();

        if (isNull(this.currentTheme) || isUndefined(this.currentTheme)) return;

        this.audios['MainTheme'] = GameConfig.GAME.sound.play(Assets.Audio.AudioMainTheme.getName(), 0.5, true);
	    this.audios['ShopTheme'] = GameConfig.GAME.sound.add(Assets.Audio.AudioShopTheme.getName(), 0.5, true);
	    this.audios['DietTheme'] = GameConfig.GAME.sound.add(Assets.Audio.AudioShopTheme.getName(), 0.5, true);
	    this.audios['RivalsTheme'] = GameConfig.GAME.sound.add(Assets.Audio.AudioRivalsTheme.getName(), 0.5, true);
	    this.audios['PhotoTheme'] = GameConfig.GAME.sound.add(Assets.Audio.AudioPhotoTheme.getName(), 0.5, true);
    }

	public static soundSwitch(): void {
		SoundUtils.globalSoundEnabled = !SoundUtils.globalSoundEnabled;
		/*if (SoundUtils.globalSoundEnabled) {
			SoundUtils.globalSoundEnabled = false;
		}
		else {
			SoundUtils.globalSoundEnabled = true;
		}*/
		SoundUtils.onSwitchSound.dispatch();
	}

    public static mainThemeSwitch(): void {
        if (SoundUtils.globalMusicEnabled) {
            SoundUtils.globalMusicEnabled = false;

            if (!isNull(SoundUtils.currentTheme) && !isUndefined(SoundUtils.currentTheme))
                SoundUtils.audios[SoundUtils.currentTheme].volume = 0; // .pause();
        }
        else {
            SoundUtils.globalMusicEnabled = true;

            if (!isNull(SoundUtils.currentTheme) && !isUndefined(SoundUtils.currentTheme))
                SoundUtils.audios[SoundUtils.currentTheme].volume = .5; // .resume();
        }
        SoundUtils.onSwitchAudio.dispatch();
    }

    public static play(name: string): void {
        if (SoundUtils.currentTheme === name) return;
        (SoundUtils.audios[SoundUtils.currentTheme] as Phaser.Sound).stop();
        SoundUtils.currentTheme = name;
        (SoundUtils.audios[SoundUtils.currentTheme] as Phaser.Sound).volume = SoundUtils.globalMusicEnabled ? .5 : 0;
        (SoundUtils.audios[SoundUtils.currentTheme] as Phaser.Sound).play();
    }
	
	public static playFX(name: string): void {
		GameConfig.GAME.sound.play(Assets.Audio['Audio' + name].getName());
	}

    public static isSoundEnabled(): boolean {
        return this.globalSoundEnabled;
    }

    public static isMusicEnabled(): boolean {
        return this.globalMusicEnabled;
    }
}