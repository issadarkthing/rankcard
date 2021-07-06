import Canvacord from "./Canvacord";
import Rank from "./Rank";

try {
  setTimeout(() => {
    Canvacord.registerFonts();
  })
} catch {}

export default {
  Rank,
  write: Canvacord.write,
}
