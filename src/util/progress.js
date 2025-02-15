/**
 * Quick and dirty API around the Loading bar.
 * Does not handle conflicts; multiple instances of this class will fight for the same loading bar, but once all but
 * once are completed, the bar should return to normal
 */
export class Progress {
    constructor({ steps = 1 } = {}) {
        this.steps = steps;
        this.counter = -1;
        this.label = "";
    }

    advance(label) {
        this.counter += 1;
        this.label = label;
        this.#updateUI();
    }

    close(label) {
        if (label) {
            this.label = label;
        }
        this.counter = this.steps;
        this.#updateUI();
    }

    #updateUI() {
        const $loader = $("#loading");
        if ($loader.length === 0) return;
        const pct = Math.clamped((100 * this.counter) / this.steps, 0, 100);
        $loader.find("#context").text(this.label);
        $loader.find("#loading-bar").css({ width: `${pct}%`, whiteSpace: "nowrap" });
        $loader.find("#progress").text(`${this.counter} / ${this.steps}`);
        $loader.css({ display: "block" });
        if (this.counter === this.steps && !$loader.is(":hidden")) $loader.fadeOut(2000);
    }
}