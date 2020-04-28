const TOOLTIP_STEPS = 4;

class Onboarding {
  constructor() {
    this.modal = false;
    this.tooltip = null;
  }

  enable() {
    this.modal = true;
    this.tooltip = 1;
  }

  tooltipNext() {
    this.tooltip = this.tooltip > TOOLTIP_STEPS ? null : this.tooltip + 1;
  }

  tooltipDone() {
    this.tooltip = null;
  }
}

export default Onboarding;
