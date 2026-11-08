// Web Audio API Synthesizer for Authentic Indian Festive Diwali Music & Sound Effects

class FestiveAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private currentTrack: string = 'santoor';
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private volumeNode: GainNode | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext created on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.value = 0.35;
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  // Raag Yaman / Festive Pentatonic frequencies (in Hz)
  private yamanScale = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    369.99, // F#4 (Ma Tivra)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    493.88, // B4 (Ni)
    523.25, // C5 (Sa')
    587.33, // D5 (Re')
    659.25, // E5 (Ga')
    739.99, // F#5 (Ma' Tivra)
    783.99, // G5 (Pa')
    880.00  // A5 (Dha')
  ];

  // Festive Raga melody pattern indices
  private santoorMelody = [0, 2, 4, 6, 7, 6, 4, 2, 3, 4, 7, 9, 7, 4, 2, 0, 4, 6, 7, 9, 11, 9, 7, 4, 2, 4, 2, 0];
  private sitarMelody = [0, 1, 2, 4, 6, 7, 8, 9, 11, 7, 6, 4, 2, 1, 0, 4, 7, 9, 7, 4, 2, 0];
  private bellsMelody = [7, 9, 11, 7, 6, 4, 7, 9, 11, 12, 11, 9, 7];
  private aartiMelody = [4, 4, 6, 7, 7, 9, 7, 6, 4, 2, 4, 6, 4, 2, 0, 2, 4, 6, 7];

  public startMusic(track: 'santoor' | 'sitar' | 'bells' | 'aarti' = 'santoor') {
    this.initCtx();
    if (this.isPlayingMusic && this.currentTrack === track) return;
    this.stopMusic();

    this.currentTrack = track;
    this.isPlayingMusic = true;
    this.noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic || !this.ctx || !this.volumeNode) return;

      const pattern =
        track === 'sitar'
          ? this.sitarMelody
          : track === 'bells'
          ? this.bellsMelody
          : track === 'aarti'
          ? this.aartiMelody
          : this.santoorMelody;

      const scaleIndex = pattern[this.noteIndex % pattern.length];
      const freq = this.yamanScale[scaleIndex % this.yamanScale.length];

      this.playPluckedString(freq, track);

      // Add background drone / tanpura harmonics
      if (this.noteIndex % 6 === 0) {
        this.playDroneNote(130.81); // C3 Sa drone
      }
      if (this.noteIndex % 8 === 0) {
        this.playDroneNote(196.00); // G3 Pa drone
      }

      this.noteIndex++;

      const delay = track === 'santoor' ? 240 + Math.random() * 40 : track === 'sitar' ? 320 + Math.random() * 60 : 420;
      this.timerId = window.setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  private playPluckedString(freq: number, style: string) {
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = style === 'sitar' ? 'sawtooth' : style === 'bells' || style === 'aarti' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(style === 'bells' ? 2600 : 1800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 1.2);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (style === 'bells' ? 2.2 : 1.2));

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  private playDroneNote(freq: number) {
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

    osc.connect(gain);
    gain.connect(this.volumeNode);

    osc.start(now);
    osc.stop(now + 3.2);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // Sound Effect: Real Brass Temple Bell Ringing (Ghanti)
  public playTempleBellSound() {
    this.initCtx();
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    const harmonics = [1046.5, 2093.0, 3139.5, 4186.0];
    const now = this.ctx.currentTime;

    harmonics.forEach((freq, idx) => {
      if (!this.ctx || !this.volumeNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3 / (idx + 1), now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gain);
      gain.connect(this.volumeNode);

      osc.start(now);
      osc.stop(now + 2.6);
    });
  }

  // Sound Effect: Sparkler / Cracker Burst
  public playCrackerBurstSound() {
    this.initCtx();
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.35);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeNode);

    noise.start(now);
    noise.stop(now + 0.4);
  }

  // Sound Effect: Diya Light Chime
  public playDiyaLightSound() {
    this.initCtx();
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;

    freqs.forEach((f, i) => {
      if (!this.ctx || !this.volumeNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.06);

      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(this.volumeNode);

      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.7);
    });
  }

  // Sound Effect: Opening Gift Sparkle bell
  public playGiftUnwrapSound() {
    this.initCtx();
    if (!this.ctx || !this.volumeNode || this.isMuted) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.volumeNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(this.volumeNode);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.9);
    });
  }
}

export const audioSynth = new FestiveAudioSynth();
