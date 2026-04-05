class StaticClock {

    constructor(canvasId) {

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        this.timeStart = performance.now();

        this.numberOffsets = [];

        for (let i = 0; i < 12; i++) {

            this.numberOffsets.push({
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                speed: 0.0006 + Math.random() * 0.0004
            });

        }

        this.resizeCanvas();

        this.animate();

        window.addEventListener('themeChanged', () => this.draw());

        window.addEventListener('resize', () => {

            this.resizeCanvas();

        });

    }


    resizeCanvas() {

        const size = this.canvas.offsetWidth;

        const ratio = window.devicePixelRatio || 1;

        this.canvas.width = size * ratio;
        this.canvas.height = size * ratio;

        this.ctx.scale(ratio, ratio);

        this.radius = size * 0.45;

    }


    getStrokeColor() {

        const theme =
            document.documentElement.getAttribute('data-theme');

        return theme === 'dark'
            ? '#ffffff'
            : '#000000';

    }


    getHandColor() {

        return '#ff7518';

    }


    drawClockFace(t) {

        const centerX = this.canvas.width / 2 / (window.devicePixelRatio || 1);
        const centerY = this.canvas.height / 2 / (window.devicePixelRatio || 1);

        this.ctx.fillStyle = this.getStrokeColor();

        this.ctx.font =
            `${this.radius * 0.12}px "DM Mono", monospace`;

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';


        for (let i = 1; i <= 12; i++) {

            const angle =
                (i * 30 - 90) *
                Math.PI / 180;

            const baseX =
                centerX +
                Math.cos(angle) *
                (this.radius * 0.82);

            const baseY =
                centerY +
                Math.sin(angle) *
                (this.radius * 0.82);


            const offset =
                this.numberOffsets[i - 1];


            const drift =
                Math.sin(
                    t * offset.speed +
                    offset.phaseX
                );


            const floatX = drift * 4;
            const floatY = Math.cos(
                t * offset.speed +
                offset.phaseY
            ) * 4;


            this.ctx.fillText(
                i.toString(),
                baseX + floatX,
                baseY + floatY
            );

        }

    }


    drawHand(length, width, angle, color) {

        const centerX =
            this.canvas.width / 2 / (window.devicePixelRatio || 1);

        const centerY =
            this.canvas.height / 2 / (window.devicePixelRatio || 1);

        this.ctx.beginPath();

        this.ctx.moveTo(centerX, centerY);

        this.ctx.lineTo(
            centerX +
            Math.cos(angle) * length,

            centerY +
            Math.sin(angle) * length
        );

        this.ctx.strokeStyle = color;

        this.ctx.lineWidth = width;

        this.ctx.lineCap = "round";

        this.ctx.stroke();

    }


    draw(t) {

        const now = new Date();

        const seconds =
            now.getSeconds() +
            now.getMilliseconds() / 1000;

        const minutes =
            now.getMinutes() +
            seconds / 60;

        const hours =
            (now.getHours() % 12) +
            minutes / 60;


        const hourAngle =
            hours / 12 *
            2 * Math.PI -
            Math.PI / 2;

        const minuteAngle =
            minutes / 60 *
            2 * Math.PI -
            Math.PI / 2;


        const secondAngle =
            (seconds % 60) /
            60 *
            2 * Math.PI -
            Math.PI / 2;


        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );


        this.drawClockFace(t);


        this.drawHand(
            this.radius * 0.5,
            this.radius * 0.03,
            hourAngle,
            this.getHandColor()
        );


        this.drawHand(
            this.radius * 0.72,
            this.radius * 0.02,
            minuteAngle,
            this.getHandColor()
        );


        this.drawHand(
            this.radius * 0.9,
            this.radius * 0.01,
            secondAngle,
            this.getHandColor()
        );


        const centerX =
            this.canvas.width / 2 / (window.devicePixelRatio || 1);

        const centerY =
            this.canvas.height / 2 / (window.devicePixelRatio || 1);


        this.ctx.beginPath();

        this.ctx.arc(
            centerX,
            centerY,
            this.radius * 0.04,
            0,
            2 * Math.PI
        );

        this.ctx.fillStyle =
            this.getHandColor();

        this.ctx.fill();

    }


    animate() {

        const t =
            performance.now() -
            this.timeStart;

        this.draw(t);

        requestAnimationFrame(
            () => this.animate()
        );

    }

}


document.addEventListener(
    'DOMContentLoaded',
    () => {

        if (window.innerWidth <= 820) {

            new StaticClock(
                'staticClockCanvas'
            );

        }

    }
);