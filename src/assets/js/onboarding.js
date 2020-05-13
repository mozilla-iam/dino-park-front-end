const TOUR = [
  { num: 1, total: 3, phase: 1 },
  {
    num: 2,
    total: 3,
    phase: 1,
  },
  { num: 3, total: 3, phase: 1 },
  {
    num: 1,
    total: 2,
    phase: 2,
  },
  { num: 2, total: 2, phase: 2 },
];

const PHASE_2 = 4;

class Onboarding {
  constructor() {
    this.modal = false;
    this.tooltipTour = null;
    // this.isPhase1 = false;
    this.isPhase2 = false;

    this.tooltipTour = 1;
    this.isPhase1 = true;
  }

  enable() {
    this.modal = true;
  }

  modalDone() {
    this.modal = false;
    this.tooltipTour = 1;
    this.isPhase1 = true;
  }

  step() {
    return TOUR[this.tooltipTour - 1] || null;
  }

  tooltipTourNext() {
    this.tooltipTour += 1;
    if (this.tooltipTour >= PHASE_2) {
      this.isPhase1 = false;
      this.isPhase2 = true;
    }
  }

  nextPhase() {
    if (this.isPhase1) {
      this.startPhase2();
    } else {
      this.tooltipTour = null;
      this.isPhase1 = false;
      this.isPhase2 = false;
    }
  }

  startPhase2() {
    if (this.tooltipTour && this.tooltipTour < PHASE_2) {
      this.tooltipTour = PHASE_2;
      this.isPhase1 = false;
      this.isPhase2 = true;
    }
  }
}

export default Onboarding;
