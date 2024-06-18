import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function generateAvatar() {
  const av = createAvatar(lorelei, {
    seed : Date.now()
  }).toDataUriSync();
  return av;
}