// ==UserScript==
// @name        Furaffinity-Loading-Animations
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0.1
// @author      Midori Dragon
// @description Library for creating different loading animations on Furaffinity
// @icon        https://www.furaffinity.net/themes/beta/img/banners/fa_logo.png?v2
// @homepageURL https://greasyfork.org/de/scripts/485153-furaffinity-loading-animations
// @supportURL  https://greasyfork.org/de/scripts/485153-furaffinity-loading-animations/feedback
// @license     MIT
// ==/UserScript==

(() => {
    class LoadingSpinner {
        constructor(baseElem) {
            this._delay = 1000;
            this._size = 60;
            this._spinnerThickness = 4;
            this._spinnerLength = 1;
            this._linearSpin = false;
            this._forecolorHex = "#8941de";
            this._backcolorHex = "#f3f3f3";
            this._visible = false;
            this._baseElem;
            this.animationCurve = "cubic-bezier(.53,.24,.46,.83)";
            this.spinner;
            this.spinnerContainer;
            this.baseElem = baseElem;
        }

        set baseElem(value) {
            if (this._baseElem == value) return;
            this._baseElem = value;

            if (this.spinnerContainer)
                this.spinnerContainer.parentNode.removeChild(this.spinnerContainer);

            if (!document.getElementById("flaspinnerstyle")) {
                const style = document.createElement("style");
                style.id = "flaspinnerstyle";
                style.type = "text/css";
                style.innerHTML = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }";
                document.head.appendChild(style);
            }

            this.spinnerContainer = document.createElement("div");
            this.spinnerContainer.className = "fla-spinner-container";
            this.spinnerContainer.style.position = "relative";
            this.spinnerContainer.style.width = this.size + "px";
            this.spinnerContainer.style.height = this.size + "px";
            this.spinnerContainer.style.left = "50%";
            this.spinnerContainer.style.transform = "translateX(-50%)";
            this.spinnerContainer.style.display = "none";

            this.spinner = document.createElement("div");
            this.spinner.className = "fla-spinner";
            this.updateSpinnerBorders();
            this.spinner.style.borderRadius = "50%";
            this.spinner.style.position = "relative";
            this.spinner.style.width = (this.size - this.spinnerThickness * 2) + "px";
            this.spinner.style.height = (this.size - this.spinnerThickness * 2) + "px";
            this.spinner.style.animation = `spin ${this.delay / 1000}s ${this.animationCurve} infinite`;

            this.spinnerContainer.appendChild(this.spinner);
            this._baseElem.appendChild(this.spinnerContainer);
        }
        get baseElem() {
            return this._baseElem;
        }

        set delay(value) {
            if (this._delay == value) return;
            this._delay = +value;
            if (this.spinner)
                this.spinner.style.animation = `spin ${this._delay / 1000}s ${this.animationCurve} infinite`;
        }
        get delay() {
            return this._delay;
        }

        set linearSpin(value) {
            if (this._linearSpin == value) return;
            this._linearSpin = value;

            this.animationCurve = this._linearSpin == true ? "linear" : "cubic-bezier(.53,.24,.46,.83)";

            if (this.spinner)
                this.spinner.style.animation = `spin ${this.delay / 1000}s ${this.animationCurve} infinite`;
        }
        get linearSpin() {
            return this._linearSpin;
        }

        set size(value) {
            if (this._size == value) return;
            this._size = +value;

            if (this.spinnerContainer) {
                this.spinnerContainer.style.width = this._size + "px";
                this.spinnerContainer.style.height = this._size + "px";
            }
            if (this.spinner) {
                this.spinner.style.width = (this.size - this.spinnerThickness * 2) + "px";
                this.spinner.style.height = (this.size - this.spinnerThickness * 2) + "px";
            }
        }
        get size() {
            return this._size;
        }

        set spinnerThickness(value) {
            if (this._spinnerThickness == value) return;
            this._spinnerThickness = +value;

            this.updateSpinnerBorders();
        }
        get spinnerThickness() {
            return this._spinnerThickness;
        }

        set spinnerLength(value) {
            if (this._spinnerLength == value) return;
            this._spinnerLength = +value;

            this.updateSpinnerBorders();
        }
        get spinnerLength() {
            return this._spinnerLength;
        }

        set forecolorHex(value) {
            if (this._forecolorHex == value) return;
            this._forecolorHex = value;

            this.updateSpinnerBorders();
        }
        get forecolorHex() {
            return this._forecolorHex;
        }

        set backcolorHex(value) {
            if (this._backcolorHex == value) return;
            this._backcolorHex = value;

            this.updateSpinnerBorders();
        }
        get backcolorHex() {
            return this._backcolorHex;
        }

        set visible(value) {
            if (this._visible == value) return;
            this._visible = value;

            if (this.spinnerContainer)
                this.spinnerContainer.style.display = this._visible == true ? "block" : "none";
        }
        get visible() {
            return this._visible;
        }

        updateSpinnerBorders() {
            if (this.spinner) {
                this.spinner.style.border = this.spinnerThickness + "px solid " + this.backcolorHex;
                if (this.spinnerLength >= 1)
                    this.spinner.style.borderTop = this.spinnerThickness + "px solid " + this._forecolorHex;
                if (this.spinnerLength >= 2)
                    this.spinner.style.borderRight = this.spinnerThickness + "px solid " + this._forecolorHex;
                if (this.spinnerLength >= 3)
                    this.spinner.style.borderBottom = this.spinnerThickness + "px solid " + this._forecolorHex;
                if (this.spinnerLength >= 4)
                    this.spinner.style.borderLeft = this.spinnerThickness + "px solid " + this._forecolorHex;
            }
        }
    }
    window.LoadingSpinner = LoadingSpinner;

    class LoadingTextSpinner {
        constructor(baseElem) {
            this.characters = ["◜", "◠", "◝", "◞", "◡", "◟"];
            this.delay = 600;
            this.spinner;
            this._visible = false;
            this._fontSize = 15;
            this._currIndex = -1;
            this._intervalId;
            this._baseElem;
            this.baseElem = baseElem;
        }

        set baseElem(value) {
            if (this._baseElem == value) return;
            this._baseElem = value;

            if (this.spinner)
                this.spinner.parentNode.removeChild(this.spinner);

            this.spinner = document.createElement("div");
            this.spinner.className = "fla-text-spinner";
            this.spinner.style.margin = "4px";
            if (this.fontSize)
                this.spinner.style.fontSize = this.fontSize + "px";
            this._baseElem.appendChild(this.spinner);
        }
        get baseElem() {
            return this._baseElem;
        }

        set fontSize(value) {
            if (this._fontSize == value) return;
            this._fontSize = value;

            if (this.spinner) {
                if (this._fontSize)
                    this.spinner.style.fontSize = this._fontSize + "px";
                else
                    this.spinner.style.fontSize = "";
            }
        }
        get fontSize() {
            return this._fontSize;
        }

        set visible(value) {
            if (this._visible == value) return;
            this._visible = value;

            if (this.spinner)
                this.spinner.style.display = this._visible == true ? "block" : "none";

            if (this._visible) {
                this._intervalId = setInterval(() => {
                    if (this._currIndex >= this.characters.length)
                        this._currIndex = 0;
                    this.spinner.textContent = this.characters[this._currIndex];
                    this._currIndex++;
                }, (this.delay / this.characters.length));
            } else
                clearInterval(this._intervalId);
        }
        get visible() {
            return this._visible;
        }
    }
    window.LoadingTextSpinner = LoadingTextSpinner;

    class LoadingImage {
        constructor(baseElem) {
            this.delay = 100;
            this.doScaleImage = true;
            this.scaleChange = 0.05;
            this.scaleChangeMax = 1.2;
            this.scaleChangeMin = 0.8;
            this.doRotateImage = true;
            this.rotadeDegrees = 5;
            this.image;
            this.imageContainer;
            this._visible = false;
            this._imageSrc = "https://www.furaffinity.net/themes/beta/img/banners/fa_logo.png";
            this.isGrowing = true;
            this.scale = 1;
            this.rotation = 0;
            this._size = 60;
            this._intervalId;
            this._baseElem;
            this.baseElem = baseElem;
        }

        set baseElem(value) {
            if (this._baseElem == value) return;
            this._baseElem = value;

            if (this.image)
                this.image.parentNode.removeChild(this.image);

            this.imageContainer = document.createElement("div");
            this.imageContainer.className = "fla-loading-image-container";
            this.imageContainer.style.position = "relative";
            this.imageContainer.style.width = this.size + "px";
            this.imageContainer.style.height = this.size + "px";
            this.imageContainer.style.left = "50%";
            this.imageContainer.style.transform = "translateX(-50%)";
            this.imageContainer.style.display = "none";

            this.image = document.createElement("img");
            this.image.className = "fla-loading-image";
            this.image.src = this.imageSrc;
            this.image.style.width = "100%";
            this.image.style.height = "100%";
            this.image.style.transition = "transform 0.5s ease-in-out";

            this.imageContainer.appendChild(this.image);
            this._baseElem.appendChild(this.imageContainer);
        }
        get baseElem() {
            return this._baseElem;
        }

        set imageSrc(value) {
            if (this._imageSrc == value) return;
            this._imageSrc = value;

            if (this.image)
                this.image.src = this._imageSrc;
        }
        get imageSrc() {
            return this._imageSrc;
        }

        set size(value) {
            if (this._size == value) return;
            this._size = value;

            if (this.imageContainer) {
                this.imageContainer.style.width = this._size + "px";
                this.imageContainer.style.height = this._size + "px";
            }
        }
        get size() {
            return this._size;
        }

        set visible(value) {
            if (this._visible == value) return;
            this._visible = value;

            if (this.imageContainer)
                this.imageContainer.style.display = this._visible == true ? "block" : "none";

            if (this._visible == true) {
                this._intervalId = setInterval(() => {
                    this.updateAnimationFrame();
                }, this.delay);
            } else
                clearInterval(this._intervalId);
        }
        get visible() {
            return this._visible;
        }

        updateAnimationFrame() {
            if (this.isGrowing == true) {
                this.scale += this.scaleChange;
                this.rotation += this.rotadeDegrees;
            } else {
                this.scale -= this.scaleChange;
                this.rotation -= this.rotadeDegrees;
            }

            if (this.scale >= this.scaleChangeMax || this.scale <= this.scaleChangeMin)
                this.isGrowing = !this.isGrowing;

            this.image.style.transform = `scale(${this.scale}) rotate(${this.rotation}deg)`;
        }
    }
    window.LoadingImage = LoadingImage;

    class ProgressBar {
        constructor(baseElem) {
            this.progressBarContainer;
            this.progressBarChild;
            this.progressBarShrinker;
            this.progressBarText;
            this.text;
            this.showPercent = false;
            this._imageSrc;
            this._visible = false;
            this._gradient = "linear-gradient(90deg, rgba(255,10,3,1) 0%, rgba(255,139,6,1) 16%, rgba(253,228,11,1) 36%, rgba(127,236,12,1) 59%, rgba(32,225,207,1) 75%, rgba(140,60,223,1) 95%)";
            this._backcolorHex = "#000000";
            this._height = 60;
            this._fontSize = 15;
            this._cornerRadius = 0;
            this._baseElem;
            this.baseElem = baseElem;
        }

        set baseElem(value) {
            if (this._baseElem == value) return;
            this._baseElem = value;

            if (this.progressBarContainer)
                this.progressBarContainer.parentNode.removeChild(this.progressBarContainer);

            if (!document.getElementById("flaprogressstyle")) {
                const style = document.createElement("style");
                style.id = "flaprogressstyle";
                style.type = "text/css";
                style.innerHTML = `
                .fla-progressbar-container {
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .fla-progress {
                    color: white;
                    text-align: center;
                    line-height: 60px;
                    font-size: 35px;
                    font-family: "Segoe UI";
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background-size: cover;
                }

                .fla-shrinker {
                    position: absolute;
                    top: 0;
                    right: 0;
                    transition: width 0.5s ease;
                    width: 100%;
                    height: 100%;
                }

                .fla-progressbar-text {
                    color: white;
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    left: 50%;
                    transform: translateX(-50%);
                    text-shadow: -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000;
                }`;
                document.head.appendChild(style);
            }

            this.progressBarContainer = document.createElement("div");
            this.progressBarContainer.className = "fla-progressbar-container";
            this.progressBarContainer.style.height = this.height + "px";
            this.progressBarContainer.style.display = "none";

            this.progressBarChild = document.createElement("div");
            this.progressBarChild.className = "fla-progress";
            this.progressBarChild.style.background = this.gradient;
            if (this.imageSrc)
                this.progressBarChild.style.backgroundImage = "url(" + this.imageSrc + ")";

            this.progressBarShrinker = document.createElement("div");
            this.progressBarShrinker.className = "fla-shrinker";
            this.progressBarShrinker.style.backgroundColor = this.backcolorHex;

            this.progressBarText = document.createElement("span");
            this.progressBarText.className = "fla-progressbar-text";
            this.progressBarText.style.lineHeight = this.height + "px";

            this.progressBarContainer.appendChild(this.progressBarChild);
            this.progressBarContainer.appendChild(this.progressBarShrinker);
            this.progressBarContainer.appendChild(this.progressBarText);
            this._baseElem.appendChild(this.progressBarContainer);
        }
        get baseElem() {
            return this._baseElem;
        }

        set cornerRadius(value) {
            if (this._cornerRadius == value) return;
            this._cornerRadius = value;

            if (this.progressBarContainer)
                this.progressBarContainer.style.borderRadius = this.cornerRadius + "px";
        }
        get cornerRadius() {
            return this._cornerRadius;
        }

        set height(value) {
            if (this._height == value) return;
            this._height = value;

            if (this.progressBarContainer)
                this.progressBarContainer.style.height = this._height + "px";
            if (this.progressBarText)
                this.progressBarText.style.lineHeight = this._height + "px";
        }
        get height() {
            return this._height;
        }

        set fontSize(value) {
            if (this._fontSize == value) return;
            this._fontSize = value;

            if (this.progressBarText) {
                if (this._fontSize)
                    this.progressBarText.style.fontSize = this._fontSize + "px";
                else
                    this.progressBarText.style.fontSize = "";
            }
        }
        get fontSize() {
            return this._fontSize;
        }

        set gradient(value) {
            if (this._gradient == value) return;
            this._gradient = value;

            if (this.progressBarChild)
                this.progressBarChild.style.background = this._gradient;
        }
        get gradient() {
            return this._gradient;
        }

        set backcolorHex(value) {
            if (this._backcolorHex == value) return;
            this._backcolorHex = value;

            if (this.progressBarShrinker)
                this.progressBarShrinker.style.backgroundColor = this._backcolorHex;
        }
        get backcolorHex() {
            return this._backcolorHex;
        }

        set imageSrc(value) {
            if (this._imageSrc == value) return;
            this._imageSrc = value;

            if (this.progressBarChild) {
                if (this._imageSrc)
                    this.progressBarChild.style.backgroundImage = "url(" + this._imageSrc + ")";
                else
                    this.progressBarChild.style.backgroundImage = "";
            }
        }
        get imageSrc() {
            return this._imageSrc;
        }

        set visible(value) {
            if (this._visible == value) return;
            this._visible = value;

            if (this.progressBarContainer)
                this.progressBarContainer.style.display = this._visible == true ? "block" : "none";
        }
        get visible() {
            return this._visible;
        }

        update(value) {
            value = +value;
            if (value > 100)
                value = 100;
            else if (value < 0)
                value = 0;
            this.progressBarShrinker.style.width = (100 - value) + '%';
            this.progressBarText.textContent = (this.text ? this.text : "") + (this.showPercent == true ? value.toString() + "%" : "");
        }
    }
    window.ProgressBar = ProgressBar;

    class LoadingBar {
        constructor(baseElem) {
            this.loadingBar;
            this._delay = 2000;
            this._text;
            this._height = 60;
            this._fontSize = 15;
            this._cornerRadius = 0;
            this._gradient = "repeating-linear-gradient(to right, rgba(255,10,3,1) 0%, rgba(255,139,6,1) 8%, rgba(253,228,11,1) 16%, rgba(127,236,12,1) 26%, rgba(32,225,207,1) 36%, rgba(140,60,223,1) 46%, rgba(140,60,223,1) 54%, rgba(32,225,207,1) 64%, rgba(127,236,12,1) 74%, rgba(253,228,11,1) 84%, rgba(255,139,6,1) 92%, rgba(255,10,3,1) 100%)";
            this._baseElem;
            this._visible = false;
            this.baseElem = baseElem;
        }

        set baseElem(value) {
            if (this._baseElem == value) return;
            this._baseElem = value;

            if (this.loadingBar)
                this.loadingBar.parentNode.removeChild(this.loadingBar);

            if (!document.getElementById("flaloadingbarstyle")) {
                const style = document.createElement("style");
                style.id = "flaloadingbarstyle";
                style.type = "text/css";
                style.innerHTML = "@keyframes gradient { 0% { background-position: 0 0; } 100% { background-position: -200% 0; } }";
                document.head.appendChild(style);
            }

            this.loadingBar = document.createElement("div");
            this.loadingBar.className = "fla-loadingbar";
            this.loadingBar.textContent = this.text;
            this.loadingBar.style.width = "100%";
            this.loadingBar.style.height = this.height + "px";
            this.loadingBar.style.lineHeight = this.height + "px";
            this.loadingBar.style.textShadow = "-1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000";
            this.loadingBar.style.background = this.gradient;
            this.loadingBar.style.backgroundSize = "200% auto";
            this.loadingBar.style.backgroundPosition = "0 100%";
            this.loadingBar.style.animation = `gradient ${(this.delay / 1000)}s infinite`;
            this.loadingBar.style.animationFillMode = "forwards";
            this.loadingBar.style.animationTimingFunction = "linear";
            this.loadingBar.style.display = "none";

            this._baseElem.appendChild(this.loadingBar);
        }
        get baseElem() {
            return this._baseElem;
        }

        set delay(value) {
            if (this._delay == value) return;
            this._delay = value;

            if (this.loadingBar)
                this.loadingBar.style.animation = `gradient ${(this._delay / 1000)}s infinite`;
        }
        get delay() {
            return this._delay;
        }

        set text(value) {
            if (this._text == value) return;
            this._text = value;

            if (this.loadingBar)
                this.loadingBar.textContent = this._text;
        }
        get text() {
            return this._text;
        }

        set cornerRadius(value) {
            if (this._cornerRadius == value) return;
            this._cornerRadius = value;

            if (this.loadingBar)
                this.loadingBar.style.borderRadius = this.cornerRadius + "px";
        }
        get cornerRadius() {
            return this._cornerRadius;
        }

        set height(value) {
            if (this._height == value) return;
            this._height = value;

            if (this.loadingBar) {
                this.loadingBar.style.height = this._height + "px";
                this.loadingBar.style.lineHeight = this._height + "px";
            }
        }
        get height() {
            return this._height;
        }

        set fontSize(value) {
            if (this._fontSize == value) return;
            this._fontSize = value;

            if (this.loadingBar) {
                if (this._fontSize)
                    this.loadingBar.style.fontSize = this._fontSize + "px";
                else
                    this.loadingBar.style.fontSize = "";
            }
        }
        get fontSize() {
            return this._fontSize;
        }

        set gradient(value) {
            if (this._gradient == value) return;
            this._gradient = value;

            if (this.loadingBar)
                this.loadingBar.style.background = this._gradient;
        }
        get gradient() {
            return this._gradient;
        }

        set visible(value) {
            if (this._visible == value) return;
            this._visible = value;

            if (this.loadingBar)
                this.loadingBar.style.display = this._visible == true ? "block" : "none";
        }
        get visible() {
            return this._visible;
        }
    }
    window.LoadingBar = LoadingBar;
})();
