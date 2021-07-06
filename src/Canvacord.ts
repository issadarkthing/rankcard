import Canvas from "canvas";
import fs from "fs";
import assets from "./Assets";
import Util from "./Util";

export interface ReplyOptions {
  /** Avatar of the person who replied */
  avatar1?: string | Buffer;
  /** Avatar of the other person */
  avatar2?: string | Buffer;
  /** Username of the person who replied */
  user1?: string;
  /** Username of the other person */
  user2?: string;
  /** Hex color of the person who replied */
  hex1?: string;
  /** Hex color of the other person */
  hex2?: string;
  /** The message */
  mainText?: string;
  /** The reply message */
  replyText?: string;
}

export interface YouTubeCommentInterface {
  username: string;
  content: string;
  avatar: string;
  dark: boolean;
}

export type CardValues =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

type Track = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  stroke: boolean;
  lineWidth: number;
};

type Bar = {
  width: number;
  color: string;
};

class Canvacord {
  static instance: Canvacord;

  constructor() {
    if (!Canvacord.instance) {
      Canvacord.instance = this;
    }

    return Canvacord.instance;
  }

  /**
   * Creates Progress bar
   * @param {object} track Progressbar track options
   * @param {number} [track.x] The x-axis
   * @param {number} [track.y] The y-axis
   * @param {number} [track.width] Progressbar track width
   * @param {number} [track.height] Progressbar track height
   * @param {string} [track.color] Progressbar track color
   * @param {boolean} [track.stroke] Use stroke for track
   * @param {number} [track.lineWidth] This param will be used if `track.stroke` is set to `true`
   * @param {object} bar Progressbar options
   * @param {number} [bar.width] Progressbar width
   * @param {string} [bar.color] Progressbar color
   * @returns {Buffer}
   */
  static createProgressBar(
    track: Track = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      color: "",
      stroke: false,
      lineWidth: 0,
    },
    bar: Bar = { width: 0, color: "" }
  ): Buffer {
    if (!track) throw new Error("Invalid track args!");
    if (!bar) throw new Error("Invalid progressbar args!");

    const canvas = Canvas.createCanvas(track.width, track.height);
    const ctx = canvas.getContext("2d");

    if (bar.width > track.width) bar.width = track.width;
    if (bar.width < 0) bar.width = 0;

    if (track.stroke) {
      Util.rect(
        ctx,
        track.x,
        track.y,
        track.height,
        bar.width,
        bar.color,
        false
      );
      Util.rect(
        ctx,
        track.x,
        track.y,
        track.height,
        track.width,
        track.color,
        track.stroke,
        track.lineWidth
      );
    } else {
      Util.rect(
        ctx,
        track.x,
        track.y,
        track.height,
        track.width,
        track.color,
        track.stroke,
        track.lineWidth
      );
      Util.rect(
        ctx,
        track.x,
        track.y,
        track.height,
        bar.width,
        bar.color,
        false
      );
    }

    return canvas.toBuffer();
  }

  /**
   * HTML5 color to image
   * @param {string} color HTML5 color
   * @param {boolean} displayHex If it should display hex
   * @param {number} height Image height
   * @param {number} width Image width
   * @returns {Buffer}
   */
  static color(
    color: string = "#FFFFFF",
    displayHex: boolean = false,
    height: number = 1024,
    width: number = 1024
  ): Buffer {
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    Util.rect(ctx, 0, 0, height, width, color);

    if (!!displayHex) {
      const ic = Util.invertColor(color);
      ctx.font = "bold 72px Manrope";
      ctx.fillStyle = ic;
      ctx.fillText(color.toUpperCase(), canvas.width / 3, canvas.height / 2);
    }

    return canvas.toBuffer();
  }

  /**
   * Creates circular image
   * @param {string|Buffer} image Image source
   * @returns {Promise<Buffer>}
   */
  static async circle(image: string | Buffer): Promise<Buffer> {
    if (!image) throw new Error("Image was not provided!");
    const img = await Canvas.loadImage(image);
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    Util.circle(ctx, canvas.width, canvas.height);
    return canvas.toBuffer();
  }

  /**
   * Creates a rectangle
   * @param {number} x x-axis
   * @param {number} y y-axis
   * @param {number} width width
   * @param {number} height height
   * @param {string} color color
   * @param {boolean} stroke If it should stroke
   * @param {number} lineWidth line width
   * @returns {Buffer}
   */
  static rectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    stroke: boolean,
    lineWidth: number
  ): Buffer {
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    Util.rect(
      ctx,
      x,
      y,
      canvas.height,
      canvas.width,
      color,
      !!stroke,
      lineWidth
    );
    Util.round(ctx, x, y, canvas.width, canvas.height);
    return canvas.toBuffer();
  }

  /**
   * Resize an image
   * @param {string|Buffer} image Image source
   * @param {number} width width
   * @param {number} height height
   * @returns {Promise<Buffer>}
   */
  static async resize(
    image: string | Buffer,
    width: number,
    height: number
  ): Promise<Buffer> {
    if (!image) throw new Error("Image was not provided!");
    const img = await Canvas.loadImage(image);
    const w = width && !isNaN(width) ? width : img.width;
    const h = height && !isNaN(height) ? width : img.height;
    const canvas = Canvas.createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toBuffer();
  }

  /**
   * Loads font
   * @param {any[]} fontArray Font array
   * @returns {Promise<void>}
   */
  static async registerFonts(fontArray: any[] = []): Promise<void> {
    if (fontArray.length === 0) {
      await Canvacord.__wait();
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

      Canvas.registerFont(assets("FONT").WHITNEY_MEDIUM, {
        family: "Whitney",
        weight: "regular",
        style: "normal",
      });

      Canvas.registerFont(assets("FONT").WHITNEY_BOOK, {
        family: "Whitney",
        weight: "bold",
        style: "normal",
      });

      Canvas.registerFont(assets("FONT").ROBOTO_LIGHT, {
        family: "Roboto",
        weight: "light",
        style: "normal",
      });

      Canvas.registerFont(assets("FONT").ROBOTO_REGULAR, {
        family: "Roboto",
        weight: "regular",
        style: "normal",
      });
    } else {
      fontArray.forEach((font) => {
        Canvas.registerFont(font.path, font.face);
      });
    }

    return;
  }

  /**
   * Updates image color
   * @param {string|Buffer} image Image source
   * @param {string} color HTML5 color
   * @returns {Promise<Buffer>}
   */
  static async colorfy(
    image: string | Buffer,
    color: string | CanvasGradient | CanvasPattern
  ): Promise<Buffer> {
    if (!image) throw new Error("Image was not provided!");
    const img = await Canvas.loadImage(image);
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (color) {
      ctx.globalCompositeOperation = "color";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    return canvas.toBuffer();
  }

  /**
   * Creates Gradient
   * @param {string} colorFrom Starting color
   * @param {string} colorTo Ending color
   * @param {number} width Image width
   * @param {number} height Image height
   * @returns {Buffer}
   */
  static gradient(
    colorFrom: string,
    colorTo: string,
    width: number,
    height: number
  ): Buffer {
    if (!colorFrom) throw new Error("ColorFrom was not provided!");
    if (!colorTo) throw new Error("ColorTo was not provided!");

    const canvas = Canvas.createCanvas(width || 400, height || 200);
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, colorFrom);
    gradient.addColorStop(1, colorTo);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas.toBuffer();
  }

  /**
   * Writes the data as file
   * @param {Buffer} data data to write
   * @param {string} name file name
   * @returns {void}
   */
  static write(data: string | NodeJS.ArrayBufferView, name: number | fs.PathLike): void {
    return fs.writeFileSync(name, data);
  }

  /**
   * Returns default icon of a discord server
   * @param {string} name Guild name
   * @param {number} size Icon size. Valid: `16`, `32`, `64`, `128`, `256`, `512`, `1024`, `2048` & `4096`
   * @returns {Promise<Buffer>}
   */
  static async guildIcon(name: string, size: number = 1024): Promise<Buffer> {
    const str = Util.getAcronym(name);
    if (!str) throw new Error("Couldn't parse acronym!");
    if (typeof size !== "number" || size < 0 || size > 4096 || size % 16 !== 0)
      throw new Error("Invalid icon size!");

    const canvas = Canvas.createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#7289DA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold ${size / 4}px Whitney`;
    await Util.renderEmoji(ctx, str, canvas.width / 4, canvas.height / 1.7);

    return canvas.toBuffer();
  }

  /**
   * Canvacord method used to `wait`.
   * @param {number} dur Number of milliseconds to wait
   * @returns {Promise<void>}
   */
  static __wait(dur?: number): Promise<void> {
    return new Promise<void>((res) => {
      setTimeout(() => res(), dur || 250);
    });
  }

  /**
   * Canvacord convolution matrix
   * @typedef {object} ConvolutionMatrix
   * @property {number[]} EDGES Edges Matrix
   * @property {number[]} BLUR Blur Matrix
   * @property {number[]} SHARPEN Sharpen Matrix
   * @property {number[]} BURN Burn Matrix
   */

  /**
   * Matrix data for **Canvacord.convolute()**
   * @type {ConvolutionMatrix}
   */
  static get CONVOLUTION_MATRIX() {
    return {
      EDGES: [0, -1, 0, -1, 4, -1, 0, -1, 0],
      BLUR: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
      SHARPEN: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      BURN: [
        1 / 11,
        1 / 11,
        1 / 11,
        1 / 11,
        1 / 11,
        1 / 11,
        1 / 11,
        1 / 11,
        1 / 11,
      ],
    };
  }

  /**
   * Canvacord utils
   * @type {Util}
   */
  static get Util() {
    return Util;
  }
}

export default Canvacord;
