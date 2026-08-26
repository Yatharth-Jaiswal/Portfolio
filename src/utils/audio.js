// Sound manager - Audio disabled as per portfolio requirements
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
  }

  init() {}
  toggleMute() {
    return true;
  }
  playHover() {}
  playClick() {}
  playSuccess() {}
}

export const sounds = new SoundManager();
