window.TransformersAssets = window.TransformersAssets || { characters: {} };

window.TransformersAssets.characters.optimusPrimeBayverse = {
  id: "optimus_prime_bayverse",
  label: "Optimus Prime Bayverse",
  spriteSheetUrl: "",
  transformationDataUrl: "assets/characters/optimus_prime_bayverse/transformation.json",
  stats: {
    maxHealth: 140,
    maxMatrix: 120,
    moveSpeed: 255,
    truckSpeed: 368,
    robotScale: 0.72,
    truckScale: 0.82
  },
  sfx: {
    transform: "assets/audio/actions/transform_sound.mp3"
  },
  animations: {
    robot_idle: [
      { x: 0, y: 0, w: 256, h: 256, anchorX: 120, anchorY: 168 }
    ],
    robot_run: [
      { x: 256, y: 0, w: 256, h: 256, anchorX: 120, anchorY: 168 },
      { x: 512, y: 0, w: 256, h: 256, anchorX: 120, anchorY: 168 }
    ],
    robot_jump: [
      { x: 768, y: 0, w: 256, h: 256, anchorX: 120, anchorY: 168 }
    ],
    robot_attack: [
      { x: 1024, y: 0, w: 256, h: 256, anchorX: 120, anchorY: 168 }
    ],
    robot_matrix: [
      { x: 1280, y: 0, w: 256, h: 256, anchorX: 120, anchorY: 168 }
    ],
    truck_idle: [
      { x: 0, y: 256, w: 320, h: 192, anchorX: 150, anchorY: 112 }
    ],
    truck_drive: [
      { x: 320, y: 256, w: 320, h: 192, anchorX: 150, anchorY: 112 },
      { x: 640, y: 256, w: 320, h: 192, anchorX: 150, anchorY: 112 }
    ]
  }
};
