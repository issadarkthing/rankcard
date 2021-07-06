import Canvacord from "./Canvacord";
import RankInternal from "./Rank";

try {
  setTimeout(() => {
    Canvacord.registerFonts();
  })
} catch {}

export const Rank = RankInternal;
export default {
  Rank,
  write: Canvacord.write,
}
