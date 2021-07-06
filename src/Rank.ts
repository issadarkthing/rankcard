import Canvas from "canvas";
import Util from "./Util";
import assets from "./Assets";

class Rank {
  public data: any;

  constructor() {
    /**
     * Rank card data
     * @type {CanvacordRankData}
     */
    this.data = {
      width: 1000,
      height: 380,
      background: {
        type: "color",
        image: "#23272A",
      },
      progressBar: {
        rounded: true,
        x: 275.5,
        y: 183.75,
        height: 37.5,
        width: 650,
        track: {
          color: "#484b4E",
        },
        bar: {
          type: "color",
          color: "#FFFFFF",
        },
      },
      overlay: {
        display: true,
        level: 0.5,
        color: "#333640",
      },
      avatar: {
        source: null,
        x: 70,
        y: 50,
        height: 180,
        width: 180,
      },
      gold: {
        source: "https://www.unrankedsmurfs.com/storage/ruoxfp7El8hKfK6IFEK6i9zA0VPvlXa6ac5XG3HA.png",
        value: 0,
        x: 280,
        y: 240,
      },
      silver: {
        source: "https://emoji.gg/assets/emoji/5633_Silver.png",
        value: 0,
        x: 480,
        y: 230,
      },
      bronze: {
        source: "https://emoji.gg/assets/emoji/8300_Bronze.png",
        value: 0,
        x: 680,
        y: 230,
      },
      status: {
        width: 5,
        type: "online",
        color: "#43B581",
        circle: false,
      },
      rank: {
        display: true,
        data: 1,
        textColor: "#FFFFFF",
        color: "#F3F3F3",
        displayText: "RANK",
      },
      level: {
        display: true,
        data: 1,
        textColor: "#FFFFFF",
        color: "#F3F3F3",
        displayText: "LEVEL",
      },
      currentXP: {
        data: 0,
        color: "#FFFFFF",
      },
      requiredXP: {
        data: 0,
        color: "#FFFFFF",
      },
      discriminator: {
        discrim: null,
        color: "rgba(255, 255, 255, 0.4)",
      },
      username: {
        name: null,
        color: "#FFFFFF",
      },
      renderEmojis: false,
    };

    // Load default fonts
    this.registerFonts();
  }

  /**
   * Loads font
   * @param {any[]} fontArray Font array
   * @returns {Rank}
   */
  registerFonts(fontArray: any[] = []): Rank {
    if (!fontArray.length) {
      setTimeout(() => {
        // default fonts
        Canvas.registerFont(assets("FONT").MANROPE_BOLD, {
          family: "Manrope",
          weight: "bold",
          style: "normal",
        });

        Canvas.registerFont(assets("FONT").MANROPE_REGULAR, {
          family: "Manrope",
          weight: "regular",
          style: "normal",
        });
      }, 250);
    } else {
      fontArray.forEach((font) => {
        Canvas.registerFont(font.path, font.face);
      });
    }

    return this;
  }

  /**
   * If it should render username with emojis (if any)
   * @param {boolean} [apply=false] Set it to `true` to render emojis.
   * @returns {Rank}
   */
  renderEmojis(apply: boolean = false): Rank {
    this.data.renderEmojis = !!apply;
    return this;
  }

  /**
   * Set username
   * @param {string} name Username
   * @param {string} color Username color
   * @returns {Rank}
   */
  setUsername(name: string, color: string = "#FFFFFF"): Rank {
    if (typeof name !== "string")
      throw new Error(
        `Expected username to be a string, received ${typeof name}!`
      );
    this.data.username.name = name;
    this.data.username.color =
      color && typeof color === "string" ? color : "#FFFFFF";
    return this;
  }

  /**
   * Set progressbar style
   * @param {string|string[]} color Progressbar Color
   * @param {("COLOR"|"GRADIENT")} [fillType] Progressbar type
   * @param {boolean} [rounded=true] If progressbar should have rounded edges
   * @returns {Rank}
   */
  setProgressBar(color: string | any[], fillType: ("COLOR" | "GRADIENT") = "COLOR", rounded: boolean = true): Rank {
    switch (fillType) {
      case "COLOR":
        if (typeof color !== "string")
          throw new Error(
            `Color type must be a string, received ${typeof color}!`
          );
        this.data.progressBar.bar.color = color;
        this.data.progressBar.bar.type = "color";
        this.data.progressBar.rounded = !!rounded;
        break;
      case "GRADIENT":
        if (!Array.isArray(color))
          throw new Error(
            `Color type must be Array, received ${typeof color}!`
          );
        this.data.progressBar.bar.color = color.slice(0, 2);
        this.data.progressBar.bar.type = "gradient";
        this.data.progressBar.rounded = !!rounded;
        break;
      default:
        throw new Error(`Unsupported progressbar type "${fillType}"!`);
    }

    return this;
  }

  /**
   * Set progressbar track
   * @param {string} color Track color
   * @returns {Rank}
   */
  setProgressBarTrack(color: string): Rank {
    if (typeof color !== "string")
      throw new Error(
        `Color type must be a string, received "${typeof color}"!`
      );
    this.data.progressBar.track.color = color;

    return this;
  }

  /**
   * Set card overlay
   * @param {string} color Overlay color
   * @param {number} [level=0.5] Opacity level
   * @param {boolean} [display=true] IF it should display overlay
   * @returns {Rank}
   */
  setOverlay(color: string, level: number = 0.5, display: boolean = true): Rank {
    if (typeof color !== "string")
      throw new Error(
        `Color type must be a string, received "${typeof color}"!`
      );
    this.data.overlay.color = color;
    this.data.overlay.display = !!display;
    this.data.overlay.level = level && typeof level === "number" ? level : 0.5;
    return this;
  }

  /**
   * Set required xp
   * @param {number} data Required xp
   * @param {string} color Color
   * @returns {Rank}
   */
  setRequiredXP(data: number, color: string = "#FFFFFF"): Rank {
    if (typeof data !== "number")
      throw new Error(
        `Required xp data type must be a number, received ${typeof data}!`
      );
    this.data.requiredXP.data = data;
    this.data.requiredXP.color =
      color && typeof color === "string" ? color : "#FFFFFF";
    return this;
  }

  /**
   * Set font size
   * @param {number} size
   */
  setFontSize(size: number) {
    this.data.fontSize = size;
    return this;
  }

  /**
   * Set current xp
   * @param {number} data Current xp
   * @param {string} color Color
   * @returns {Rank}
   */
  setCurrentXP(data: number, color: string = "#FFFFFF"): Rank {
    if (typeof data !== "number")
      throw new Error(
        `Current xp data type must be a number, received ${typeof data}!`
      );
    this.data.currentXP.data = data;
    this.data.currentXP.color =
      color && typeof color === "string" ? color : "#FFFFFF";
    return this;
  }

  /**
   * Set Rank
   * @param {number} data Current Rank
   * @param {string} text Display text
   * @param {boolean} [display=true] If it should display rank
   * @returns {Rank}
   */
  setRank(data: number, text: string = "RANK", display: boolean = true): Rank {
    if (typeof data !== "number")
      throw new Error(`Level data must be a number, received ${typeof data}!`);
    this.data.rank.data = data;
    this.data.rank.display = !!display;
    if (!text || typeof text !== "string") text = "RANK";
    this.data.rank.displayText = text;

    return this;
  }

  /**
   * Set rank display color
   * @param {string} text text color
   * @param {string} number Number color
   * @returns {Rank}
   */
  setRankColor(text: string = "#FFFFFF", number: string = "#FFFFFF"): Rank {
    if (!text || typeof text !== "string") text = "#FFFFFF";
    if (!number || typeof number !== "string") number = "#FFFFFF";
    this.data.rank.textColor = text;
    this.data.rank.color = number;
    return this;
  }

  /**
   * Set level color
   * @param {string} text text color
   * @param {string} number number color
   * @returns {Rank}
   */
  setLevelColor(text: string = "#FFFFFF", number: string = "#FFFFFF"): Rank {
    if (!text || typeof text !== "string") text = "#FFFFFF";
    if (!number || typeof number !== "string") number = "#FFFFFF";
    this.data.level.textColor = text;
    this.data.level.color = number;
    return this;
  }

  /**
   * Set Level
   * @param {number} data Current Level
   * @param {string} text Display text
   * @param {boolean} [display=true] If it should display level
   * @returns {Rank}
   */
  setLevel(data: number, text: string = "LEVEL", display: boolean = true): Rank {
    if (typeof data !== "number")
      throw new Error(`Level data must be a number, received ${typeof data}!`);
    this.data.level.data = data;
    this.data.level.display = !!display;
    if (!text || typeof text !== "string") text = "LEVEL";
    this.data.level.displayText = text;

    return this;
  }

  /**
   * Set custom status color
   * @param {string} color Color to set
   * @returns {Rank}
   */
  setCustomStatusColor(color: string): Rank {
    if (!color || typeof color !== "string") throw new Error("Invalid color!");
    this.data.status.color = color;
    return this;
  }

  /**
   * Set status
   * @param {("online"|"idle"|"dnd"|"offline"|"streaming")} status User status
   * @param {boolean} circle If status icon should be circular.
   * @param {number|boolean} width Status width
   * @returns {Rank}
   */
  setStatus(status: any, circle: boolean = false, width: boolean | number = 5): Rank {
    switch (status) {
      case "online":
        this.data.status.type = "online";
        this.data.status.color = "#43B581";
        break;
      case "idle":
        this.data.status.type = "idle";
        this.data.status.color = "#FAA61A";
        break;
      case "dnd":
        this.data.status.type = "dnd";
        this.data.status.color = "#F04747";
        break;
      case "offline":
        this.data.status.type = "offline";
        this.data.status.color = "#747F8E";
        break;
      case "streaming":
        this.data.status.type = "streaming";
        this.data.status.color = "#593595";
        break;
      default:
        throw new Error(`Invalid status "${status}"`);
    }

    if (width !== false)
      this.data.status.width = typeof width === "number" ? width : 5;
    else this.data.status.width = false;
    if ([true, false].includes(circle)) this.data.status.circle = circle;

    return this;
  }

  /**
   * Set background image/color
   * @param {("COLOR"|"IMAGE")} type Background type
   * @param {string|Buffer} [data] Background color or image
   * @returns {Rank}
   */
  setBackground(type: "COLOR" | "IMAGE", data: string | Buffer): Rank {
    if (!data) throw new Error("Missing field : data");
    switch (type) {
      case "COLOR":
        this.data.background.type = "color";
        this.data.background.image =
          data && typeof data === "string" ? data : "#23272A";
        break;
      case "IMAGE":
        this.data.background.type = "image";
        this.data.background.image = data;
        break;
      default:
        throw new Error(`Unsupported background type "${type}"`);
    }

    return this;
  }

  /**
   * User avatar
   * @param {string|Buffer} data Avatar data
   * @returns {Rank}
   */
  setAvatar(data: string | Buffer): Rank {
    if (!data) throw new Error(`Invalid avatar type "${typeof data}"!`);
    this.data.avatar.source = data;
    return this;
  }

  setBronze(count: number) {
    this.data.bronze.value = count;
    return this;
  }

  setSilver(count: number) {
    this.data.silver.value = count;
    return this;
  }

  setGold(count: number) {
    this.data.gold.value = count;
    return this;
  }

  /**
   * Builds rank card
   * @param {object} ops Fonts
   * @param {string} [ops.fontX="Manrope"] Bold font family
   * @param {string} [ops.fontY="Manrope"] Regular font family
   * @returns {Promise<Buffer>}
   */
  async build(ops: { fontX: string, fontY: string } = { fontX: "Manrope", fontY: "Manrope" }): Promise<Buffer> {
    if (typeof this.data.currentXP.data !== "number")
      throw new Error(
        `Expected currentXP to be a number, received ${typeof this.data
          .currentXP.data}!`
      );
    if (typeof this.data.requiredXP.data !== "number")
      throw new Error(
        `Expected requiredXP to be a number, received ${typeof this.data
          .requiredXP.data}!`
      );
    if (!this.data.avatar.source) throw new Error("Avatar source not found!");
    if (!this.data.username.name) throw new Error("Missing username");

    const bg =
      this.data.background.type === "image"
        ? await Canvas.loadImage(this.data.background.image)
        : null;
    const avatar = await Canvas.loadImage(this.data.avatar.source);

    // create canvas instance
    const canvas = Canvas.createCanvas(this.data.width, this.data.height);
    const ctx = canvas.getContext("2d");

    // create background
    if (bg !== null) {
      ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = this.data.background.image;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // add overlay
    if (!!this.data.overlay.display) {
      ctx.globalAlpha = this.data.overlay.level || 1;
      ctx.fillStyle = this.data.overlay.color;
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
    }

    // reset transparency
    ctx.globalAlpha = 1;

    // draw username
    ctx.font = `bold ${this.data.fontSize ?? "36px"} ${ops.fontX}`;
    ctx.fillStyle = this.data.username.color;
    ctx.textAlign = "start";
    const name = Util.shorten(this.data.username.name, 23);

    // apply username
    !this.data.renderEmojis
      ? ctx.fillText(`${name}`, 257 + 18.5, 164)
      : await Util.renderEmoji(ctx, name, 257 + 18.5, 164);

    // fill level
    if (this.data.level.display && !isNaN(this.data.level.data)) {
      ctx.font = `bold ${this.data.fontSize ?? "36px"} ${ops.fontX}`;
      ctx.fillStyle = this.data.level.textColor;
      ctx.fillText(
        this.data.level.displayText,
        800 -
          ctx.measureText(Util.toAbbrev(parseInt(this.data.level.data))).width,
        82
      );

      ctx.font = `bold ${this.data.fontSize ?? "32px"} ${ops.fontX}`;
      ctx.fillStyle = this.data.level.color;
      ctx.textAlign = "end";
      ctx.fillText(Util.toAbbrev(parseInt(this.data.level.data)), 930, 82);
    }

    // fill rank
    if (this.data.rank.display && !isNaN(this.data.rank.data)) {
      ctx.font = `bold ${this.data.fontSize ?? "36px"} ${ops.fontX}`;
      ctx.fillStyle = this.data.rank.textColor;
      ctx.fillText(
        this.data.rank.displayText,
        800 -
          ctx.measureText(Util.toAbbrev(parseInt(this.data.level.data)) || "-")
            .width -
          7 -
          ctx.measureText(this.data.level.displayText).width -
          7 -
          ctx.measureText(Util.toAbbrev(parseInt(this.data.rank.data)) || "-")
            .width,
        82
      );

      ctx.font = `bold ${this.data.fontSize ?? "32px"} ${ops.fontX}`;
      ctx.fillStyle = this.data.rank.color;
      ctx.textAlign = "end";
      ctx.fillText(
        Util.toAbbrev(parseInt(this.data.rank.data)),
        790 -
          ctx.measureText(Util.toAbbrev(parseInt(this.data.level.data)) || "-")
            .width -
          7 -
          ctx.measureText(this.data.level.displayText).width,
        82
      );
    }

    // show progress
    ctx.font = `bold ${this.data.fontSize ?? "30px"} ${ops.fontX}`;
    ctx.fillStyle = this.data.requiredXP.color;
    ctx.textAlign = "start";
    ctx.fillText(
      "/ " + Util.toAbbrev(this.data.requiredXP.data),
      800 + ctx.measureText(Util.toAbbrev(this.data.currentXP.data)).width + 15,
      164
    );

    ctx.fillStyle = this.data.currentXP.color;
    ctx.fillText(Util.toAbbrev(this.data.currentXP.data), 800, 164);

    // draw medals
    ctx.fillStyle = "#fff";
    ctx.font = `60px ${ops.fontX}`;
    const medalValueSpacing = 110;

    const bronze = await Canvas.loadImage(this.data.bronze.source);
    ctx.drawImage(bronze, this.data.bronze.x, this.data.bronze.y, 120, 120);
    ctx.fillText(
      this.data.bronze.value, 
      this.data.bronze.x + medalValueSpacing, 
      this.data.bronze.y + 85,
    );

    const silver = await Canvas.loadImage(this.data.silver.source);
    ctx.drawImage(silver, this.data.silver.x, this.data.silver.y, 120, 120);
    ctx.fillText(
      this.data.silver.value, 
      this.data.silver.x + medalValueSpacing, 
      this.data.silver.y + 85,
    );

    const gold = await Canvas.loadImage(this.data.gold.source);
    ctx.drawImage(gold, this.data.gold.x, this.data.gold.y, 100, 100);
    ctx.fillText(
      this.data.gold.value, 
      this.data.gold.x + medalValueSpacing, 
      this.data.gold.y + 75,
    );

    // draw progressbar
    ctx.beginPath();
    if (!!this.data.progressBar.rounded) {
      // bg
      ctx.fillStyle = this.data.progressBar.track.color;
      ctx.arc(
        257 + 18.5,
        147.5 + 18.5 + 36.25,
        18.5,
        1.5 * Math.PI,
        0.5 * Math.PI,
        true
      );
      ctx.fill();
      ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
      ctx.arc(
        257 + 615,
        147.5 + 18.5 + 36.25,
        18.75,
        1.5 * Math.PI,
        0.5 * Math.PI,
        false
      );
      ctx.fill();

      ctx.beginPath();
      // apply color
      if (this.data.progressBar.bar.type === "gradient") {
        // @todo: Fix this
        // @ts-ignore
        let gradientContext = ctx.createRadialGradient(
          this._calculateProgress,
          0,
          500,
          0
        );
        this.data.progressBar.bar.color.forEach((color: string, index: number) => {
          gradientContext.addColorStop(index, color);
        });
        ctx.fillStyle = gradientContext;
      } else {
        ctx.fillStyle = this.data.progressBar.bar.color;
      }

      // progress bar
      ctx.arc(
        257 + 18.5,
        147.5 + 18.5 + 36.25,
        18.5,
        1.5 * Math.PI,
        0.5 * Math.PI,
        true
      );
      ctx.fill();
      ctx.fillRect(257 + 18.5, 147.5 + 36.25, this._calculateProgress, 37.5);
      ctx.arc(
        257 + 18.5 + this._calculateProgress,
        147.5 + 18.5 + 36.25,
        18.75,
        1.5 * Math.PI,
        0.5 * Math.PI,
        false
      );
      ctx.fill();
    } else {
      // progress bar
      ctx.fillStyle = this.data.progressBar.bar.color;
      ctx.fillRect(
        this.data.progressBar.x,
        this.data.progressBar.y,
        this._calculateProgress,
        this.data.progressBar.height
      );

      // outline
      ctx.beginPath();
      ctx.strokeStyle = this.data.progressBar.track.color;
      ctx.lineWidth = 7;
      ctx.strokeRect(
        this.data.progressBar.x,
        this.data.progressBar.y,
        this.data.progressBar.width,
        this.data.progressBar.height
      );
    }

    ctx.save();

    // circle
    ctx.beginPath();
    ctx.arc(125 + 10, 125 + 20, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // draw avatar
    ctx.drawImage(
      avatar,
      35,
      45,
      this.data.avatar.width + 20,
      this.data.avatar.height + 20
    );
    ctx.restore();

    // draw status
    if (!!this.data.status.circle) {
      ctx.beginPath();
      ctx.fillStyle = this.data.status.color;
      ctx.arc(215, 205, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    } else if (!this.data.status.circle && this.data.status.width !== false) {
      ctx.beginPath();
      ctx.arc(135, 145, 100, 0, Math.PI * 2, true);
      ctx.strokeStyle = this.data.status.color;
      ctx.lineWidth = this.data.status.width;
      ctx.stroke();
    }

    return canvas.toBuffer();
  }

  /**
   * Calculates progress
   * @type {number}
   * @private
   * @ignore
   */
  get _calculateProgress() {
    const cx = this.data.currentXP.data;
    const rx = this.data.requiredXP.data;

    if (rx <= 0) return 1;
    if (cx > rx) return this.data.progressBar.width;

    let width = (cx * 615) / rx;
    if (width > this.data.progressBar.width)
      width = this.data.progressBar.width;
    return width;
  }
}

export default Rank;
