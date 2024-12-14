import type React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomSheet from "./components/BottomSheet";
import Thermometer from "./components/Thermometer";
import { startTracking, subscribeToBullshitUnits } from "./services/detector";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f0f0;
  font-family: Arial, sans-serif;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    padding: 60px;
  }
`;

const InputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    margin-top: 30px;
  }

  @media (min-width: 1024px) {
    margin-top: 40px;
  }
`;

const Slider = styled.input`
  margin: 10px 0;
  width: 100%;

  @media (min-width: 768px) {
    width: 400px;
  }

  @media (min-width: 1024px) {
    width: 500px;
  }
`;

const App: React.FC = () => {
  const [bullshitUnits, setBullshitUnits] = useState(100);

  // Subscribe to updates
  useEffect(() => {
    startTracking();
    subscribeToBullshitUnits((bullshitUnits: number) => {
      setBullshitUnits(bullshitUnits);
    });
  }, []);

  return (
    <AppContainer>
      <h1>Bulshitometer</h1>
      <Thermometer bullshitUnits={bullshitUnits} />
      <BottomSheet onClose={() => {}}>
        <InputContainer>
          <label htmlFor="bullshit-slider">Set bulshit units manually: {bullshitUnits}</label>
          <Slider
            id="bullshit-slider"
            type="range"
            min="0"
            max="10000"
            value={bullshitUnits}
            onChange={(e) => setBullshitUnits(Number(e.target.value))}
          />
        </InputContainer>
      </BottomSheet>
    </AppContainer>
  );
};

export default App;
