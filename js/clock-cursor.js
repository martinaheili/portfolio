if (!document.body.classList.contains("contact-page")) {
  throw new Error("Clock cursor loaded outside contact page");
}

let clock;
let targetPos = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };

let targetScale = 1;
let currentScale = 1;

const FOLLOW_SPEED = 0.18;
const SCALE_SPEED = 0.15;
const HOVER_SCALE = 1.5;

/* ---------- CLOCK CLASS ---------- */
class Clock {
  constructor(settings) {
    Object.assign(this, {
      radius: this.getResponsiveRadius(),
      globalPosition: { x: 0, y: 0 },
      ...settings
    });

    this.numItems = 12;
    this.slice = TWO_PI / this.numItems;

    this.numberStates = Array.from({ length: 12 }, () => ({
      x: this.globalPosition.x,
      y: this.globalPosition.y
    }));

    this.handStates = [
      { x: this.globalPosition.x, y: this.globalPosition.y },
      { x: this.globalPosition.x, y: this.globalPosition.y },
      { x: this.globalPosition.x, y: this.globalPosition.y }
    ];

    this.NUMBER_LERP = 0.38;
    this.HAND_LERP = 0.18;
  }

  /* ---------- RESPONSIVE SIZE ---------- */
  getResponsiveRadius() {
    const w = window.innerWidth;

    if (w >= 2561 && w <= 3840) {
      return 65; // 4K
    }

    if (w >= 1921 && w <= 2560) {
      return 55; // 2K / ultrawide
    }

    return 40; // estándar
  }

  update(position, scale) {
    this.globalPosition = position;
    this.scale = scale;
    this.updateInternalMotion();
  }

  updateInternalMotion() {
    const { x, y } = this.globalPosition;

    this.numberStates.forEach((n, i) => {
      const targetX = i === 0 ? x : this.numberStates[i - 1].x;
      const targetY = i === 0 ? y : this.numberStates[i - 1].y;

      n.x = lerp(n.x, targetX, this.NUMBER_LERP);
      n.y = lerp(n.y, targetY, this.NUMBER_LERP);
    });

    this.handStates.forEach((h) => {
      h.x = lerp(h.x, x, this.HAND_LERP);
      h.y = lerp(h.y, y, this.HAND_LERP);
    });
  }

  draw() {
    push();

    const { x, y } = this.globalPosition;
    translate(x, y);
    scale(this.scale);
    translate(-x, -y);

    this.drawClock();

    pop();
  }

  /* ---------- COLOR SEGÚN TEMA ---------- */
  getStrokeColor() {
    const theme = document.documentElement.getAttribute("data-theme");

    return theme === "dark"
      ? color(255, 255, 255)
      : color(0, 0, 0);
  }

  drawClock() {
    const strokeColor = this.getStrokeColor();
    const handDotColor = color(255, 117, 24);

    this.drawNumbersRing(strokeColor);
    this.drawClockHands(handDotColor);

    const { x, y } = this.globalPosition;

    fill(handDotColor);
    noStroke();
    ellipse(x, y, 8);
  }

  drawClockHand(length, weight, x, y, angle, handColor) {
    stroke(handColor);
    strokeWeight(weight);

    line(
      x,
      y,
      x + cos(angle) * length,
      y + sin(angle) * length
    );
  }

  drawNumbersRing(strokeColor) {
    const offsetNumbers =
      HALF_PI - ((TWO_PI / 360) * (360 / 12));

    fill(strokeColor);
    noStroke();
    textAlign(CENTER, CENTER);

    textSize(this.radius * 0.25);

    for (let i = 0; i < this.numItems; i++) {
      const base = this.numberStates[i];

      text(
        (i % 12) + 1,
        base.x +
          Math.cos(this.slice * i - offsetNumbers) *
            this.radius,
        base.y +
          Math.sin(this.slice * i - offsetNumbers) *
            this.radius
      );
    }
  }

  drawClockHands(handColor) {
    const hourAngle =
      map(hour() % 12 + minute() / 60, 0, 12, 0, TWO_PI) -
      HALF_PI;

    const minuteAngle =
      map(minute() + second() / 60, 0, 60, 0, TWO_PI) -
      HALF_PI;

    const secondAngle =
      map(second(), 0, 60, 0, TWO_PI) -
      HALF_PI;

    this.drawClockHand(
      this.radius * 0.5,
      3,
      this.handStates[0].x,
      this.handStates[0].y,
      hourAngle,
      handColor
    );

    this.drawClockHand(
      this.radius * 0.7,
      2,
      this.handStates[1].x,
      this.handStates[1].y,
      minuteAngle,
      handColor
    );

    this.drawClockHand(
      this.radius * 0.9,
      1,
      this.handStates[2].x,
      this.handStates[2].y,
      secondAngle,
      handColor
    );
  }
}

/* ---------- p5 SETUP ---------- */
function setup() {
  const canvas = createCanvas(
    window.innerWidth,
    window.innerHeight
  );

  canvas.style("pointer-events", "none");
  canvas.position(0, 0);
  canvas.style("z-index", "9999");

  targetPos = {
    x: width / 2,
    y: height / 2
  };

  currentPos = {
    x: width / 2,
    y: height / 2
  };

  clock = new Clock({
    globalPosition: currentPos
  });

  initHoverDetection();
}

/* ---------- DRAW LOOP ---------- */
function draw() {
  clear();

  currentPos.x = lerp(
    currentPos.x,
    targetPos.x,
    FOLLOW_SPEED
  );

  currentPos.y = lerp(
    currentPos.y,
    targetPos.y,
    FOLLOW_SPEED
  );

  currentScale = lerp(
    currentScale,
    targetScale,
    SCALE_SPEED
  );

  clock.update(currentPos, currentScale);
  clock.draw();
}

/* ---------- MOUSE ---------- */
function mouseMoved() {
  targetPos.x = mouseX;
  targetPos.y = mouseY;
}

/* ---------- HOVER DETECTION ---------- */
function initHoverDetection() {
  const hoverables = document.querySelectorAll(
    "a, button, .nav-link, .project-link"
  );

  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      targetScale = HOVER_SCALE;
    });

    el.addEventListener("mouseleave", () => {
      targetScale = 1;
    });
  });
}

/* ---------- RESIZE ---------- */
function windowResized() {
  resizeCanvas(
    window.innerWidth,
    window.innerHeight
  );

  clock.radius = clock.getResponsiveRadius();
}