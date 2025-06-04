import React from "react";
import styled, { keyframes } from "styled-components";

const QuickLinkLoader: React.FC = () => {
  return (
    <LoaderWrapper>
      <SkeletonBackground />
      <Content>
        <Spinner>
          {Array.from({ length: 10 }).map((_, i) => (
            <Bar
              key={i}
              style={{
                ['--delay' as any]: `${(i + 1) * 0.1}`,
                ['--rotation' as any]: `${(i + 1) * 36}`,
                ['--translation' as any]: `150`,
              }}
            />
          ))}
        </Spinner>
        <Text>Loading QuickLink...</Text>
      </Content>
    </LoaderWrapper>
  );
};

export default QuickLinkLoader;

// Spinner animation
const pulseAnimation = keyframes`
  0%, 20%, 60%, 100% {
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    opacity: 0.5;
  }

  50% {
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
    opacity: 1;
  }
`;

const LoaderWrapper = styled.div`
  position: relative;
  height: 100vh;
  background: transparent;
  overflow: hidden;
`;

const SkeletonBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  animation: none;
  z-index: 0;
  opacity: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`;

const Bar = styled.div`
  position: absolute;
  width: 6px;
  height: 18px;
  background: linear-gradient(to bottom, #38bdf8, #1e3a8a); /* Sky-blue to navy */
  transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
  animation: ${pulseAnimation} 1.2s calc(var(--delay) * 1s) infinite ease-in-out;
  transform-origin: bottom center;
  border-radius: 3px;
  box-shadow: 0 0 6px rgba(30, 58, 138, 0.4); /* Deep blue glow */
`;

const Text = styled.p`
  font-family: 'Segoe UI', sans-serif;
  color: #1e3a8a; /* Deep Blue */
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
`;
