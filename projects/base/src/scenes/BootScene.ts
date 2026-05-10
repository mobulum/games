import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload(): void {
    // Load assets here
    const { width, height } = this.scale;
    const bar = this.add.rectangle(width / 2, height / 2, 300, 20, 0x333333);
    const fill = this.add.rectangle(width / 2 - 148, height / 2, 4, 16, 0x00ff88);

    this.load.on("progress", (value: number) => {
      fill.width = 296 * value;
      fill.x = width / 2 - 148 + fill.width / 2;
    });

    this.load.on("complete", () => {
      bar.destroy();
      fill.destroy();
    });
  }

  create(): void {
    this.scene.start("GameScene");
  }
}
