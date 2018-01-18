import {ShareWindow} from './share.window';
import {ShareScoreWindow} from './share.score.window';

export class ViralUtils {
	public static addShareWindow(): ShareWindow {
		return new ShareWindow();
	}
	
	public static addShareScoreWindow(): ShareScoreWindow {
		return new ShareScoreWindow();
	}
}