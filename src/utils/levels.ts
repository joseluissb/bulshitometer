export const maxbullshitUnits = 10000;

export type LevelData = {
  thresholdBullshitUnits: number;
  message: string;
  color: string;
};

export type LevelName = "normal" | "caution" | "warning" | "critical";

export const levels: Record<LevelName, LevelData> = {
  normal: {
    thresholdBullshitUnits: 0,
    message: "Bullshit level Normal",
    color: "lightblue",
  },
  caution: {
    thresholdBullshitUnits: maxbullshitUnits * 0.5,
    message: "Caution: High bullshit level",
    color: "orange",
  },
  warning: {
    thresholdBullshitUnits: maxbullshitUnits * 0.75,
    message: "Warning: Very High bullshit level",
    color: "red",
  },
  critical: {
    thresholdBullshitUnits: maxbullshitUnits * 0.9,
    message: "CRITICAL: Overheating! Bullshit over 9000!",
    color: "darkred",
  },
};

export function unitsToLevel(bullshitUnits: number): LevelName {
  if (bullshitUnits >= levels.critical.thresholdBullshitUnits) {
    return "critical";
  }
  if (bullshitUnits >= levels.warning.thresholdBullshitUnits) {
    return "warning";
  }
  if (bullshitUnits >= levels.caution.thresholdBullshitUnits) {
    return "caution";
  }
  return "normal";
}
