export interface ILaser {
    init(asset: string, frame?: any|any[]): void;
    start(): void;
    stop(): void;
    getContainer(): Phaser.Group;
    dispose(): void;
}