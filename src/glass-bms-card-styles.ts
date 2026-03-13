import { css, CSSResult } from 'lit';

export const cardStyles: CSSResult = css`
  :host {
    display: block;
    background: transparent !important;
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    font-family: 'Inter', sans-serif !important;
  }
  ha-card {
    background-color: transparent !important;
    border-radius: 20px;
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.1) !important;
    padding: 16px;
    display: block;
    /* backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); */
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    background: transparent !important; /* Erzwingt Transparenz für das SVG-Feld */
  } 
  svg text {
    font-family: 'Inter', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  .title-text {
    text-anchor: middle;
    fill: rgba(255, 255, 255, 0.5);
    font-size: 36px;
  }
  .cell-box {
    fill: #1a1d21; /* #1a1d21;  Dunkel für Neumorphismus */
    stroke: rgba(0, 0, 0, 0.2);
    stroke-width: 1;
    transition: all 0.5s ease; /* Macht den Wechsel zum Glow-Filter geschmeidig */
  }
  .cell-value { 
    fill: #00d2ff; 
    font-weight: 700; 
    font-size: 10px;
    text-shadow: 0 0 5px rgba(0, 210, 255, 0.3); /* Zusätzlicher Text-Glow */
  }
  .cell-small-label {
    text-anchor: start;
    font-size: 7px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    fill: rgba(255, 255, 255, 0.5);
  }
  .text-label { 
    fill: rgba(255, 255, 255, 0.5); 
    font-size: 8px; 
    font-weight: bold 
  }
  .text-label.warn {
    fill: rgba(255, 165, 0, 0.7);
  }
  .text-label.alarm {
    fill: rgba(255,0,0,0.8); 
  }
  .soc-value-big {
    fill: rgba(255, 255, 255, 0.5);
    font-weight: 700;
  }
  .soc-bar-fill {
    fill: #00d2ff;
    filter: drop-shadow(0 0 3px #00d2ff);
    transition: width 1s ease-in-out; /* Animiert den Balken bei Wertänderung */
  }
  @keyframes blink {
    0% { opacity: 0.2; }
    50% { opacity: 1; filter: drop-shadow(0 0 5px #00d2ff); }
    100% { opacity: 0.2; }
  }
  .charging-dot {
    animation: blink 1.5s infinite ease-in-out;
  }
`;