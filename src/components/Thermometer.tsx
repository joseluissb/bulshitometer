import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { levels, maxbullshitUnits, unitsToLevel } from "../utils/levels";

type ThermometerProps = {
  bullshitUnits: number;
};

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const ThermometerBody = styled.div<{ color: string }>`
  width: 50px;
  height: 300px;
  background: ${({ color }) => color};
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    width: 70px;
    height: 400px;
  }

  @media (min-width: 1024px) {
    width: 100px;
    height: 500px;
  }
`;

const Mercury = styled(motion.div)<{ level: number }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ level }) => level}%;
  background: red;
  transition: height 0.5s ease-out;
`;

const WarningText = styled.div<{ units: number }>`
  font-size: 20px;
  color: ${({ units }) =>
    units >= levels.critical.thresholdBullshitUnits
      ? "red"
      : units >= levels.warning.thresholdBullshitUnits
        ? "orange"
        : "green"};
  font-weight: bold;
  margin-top: 10px;
  text-align: center;

  ${({ units }) => units >= maxbullshitUnits && css`animation: ${pulse} 0.5s infinite;`}

  @media (min-width: 768px) {
    font-size: 24px;
  }

  @media (min-width: 1024px) {
    font-size: 28px;
  }
`;

const Alarm = styled.div<{ show: string }>`
  display: ${({ show }) => (show === "true" ? "block" : "none")};
  color: red;
  font-size: 24px;
  margin-top: 20px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 28px;
  }

  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

const Thermometer: React.FC<ThermometerProps> = ({ bullshitUnits }) => {
  const [, setBullshitUnits] = useState(0);
  const [warning, setWarning] = useState("");
  const isAlarmOn = bullshitUnits >= levels.critical.thresholdBullshitUnits;

  useEffect(() => {
    setBullshitUnits(Math.min((bullshitUnits / 100) * 100, maxbullshitUnits));
    const newLevel = unitsToLevel(bullshitUnits);
    setWarning(levels[newLevel].message);
  }, [bullshitUnits]);

  return (
    <Container>
      <ThermometerBody
        color={
          bullshitUnits >= levels.caution.thresholdBullshitUnits
            ? bullshitUnits >= maxbullshitUnits
              ? "darkred"
              : "orange"
            : "lightblue"
        }
      >
        <Mercury
          level={bullshitUnits}
          initial={{ height: 0 }}
          animate={{ height: `${Math.ceil((bullshitUnits / maxbullshitUnits) * 100)}%` }}
          transition={{ duration: 1 }}
        />
      </ThermometerBody>
      <WarningText units={bullshitUnits}>{warning}</WarningText>
      const is
      <Alarm show={isAlarmOn.toString()}>🚨 BULLSHIT ALARM ACTIVATED! 🚨</Alarm>
    </Container>
  );
};

export default Thermometer;
