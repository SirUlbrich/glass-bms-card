import { LitElement, html, svg, TemplateResult, PropertyValues, CSSResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { cardStyles } from './glass-bms-card-styles';
import './glass-bms-card-editor';

interface GlassBmsCardConfig extends LovelaceCardConfig {
  title?: string;
  entities: string[];
  soc?: string;
  status?: string;
  voltage?: string;
  remaining?: string;
  celldiff?: string;
  cycles?: string;
  case_temp?: string;
  on_off?: string;
  balancer?: string;
  failure?: string;
  soc_bar?: boolean;
  soc_dots?: boolean;
  soc_warn?: number;
  soc_warn_active?: boolean;
  diff_warn?: number;
  diff_alarm?: number;
  diff_alarm_active?: boolean;
}

@customElement('glass-bms-card')
export class GlassBmsCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: GlassBmsCardConfig;

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-bms-card-editor');
  }

  public static getStubConfig(): Partial<GlassBmsCardConfig> {
    return {
      title: "BMS Status",
      entities: [],
      soc: "sensor.soc",
      soc_bar: true,
      soc_dots: true
    };
  }

  public setConfig(config: GlassBmsCardConfig): void {
    if (!config.entities || config.entities.length === 0) {
      throw new Error("Bitte definiere mindestens einen Sensor - sensor.xxx!");
    }
    this.config = { ...config };
    this.requestUpdate();
  }

  public getCardSize(): number {
    return 1;
  }

  private _renderTitleRow(x: number, y: number): TemplateResult | typeof svg {
    const cardTitle = this.config.title;
    return svg`
      ${this.config.title ? svg`
        <text x="${x}" y="${y}" class="title-text">${cardTitle}</text>
      ` : ""}
    `;
  }

  private _showMoreInfo(ev: Event, entityId: string | undefined): void {
    if (!entityId || !this.hass) return;

    ev.stopPropagation();

    const event = new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _renderCell(x: number, y: number, index: number, entityId: string | undefined, filterId: string, isRightSide: boolean): TemplateResult | typeof svg {
    // Falls für diesen Slot keine Entität konfiguriert ist, rendern wir nichts
    if (!entityId || !this.hass.states[entityId]) return svg``;

    const stateObj = this.hass.states[entityId];
    const val = parseFloat(stateObj.state).toFixed(3);
    const unit = stateObj.attributes.unit_of_measurement;
    
    const labelX = isRightSide ? 74 : 6;
    const valueX = isRightSide ? 6 : 74;
    const labelAnchor = isRightSide ? "end" : "start";
    const valueAnchor = isRightSide ? "start" : "end";

    return svg`
      <g transform="translate(${x}, ${y})" @click=${(e: Event) => this._showMoreInfo(e, entityId)} style="cursor: pointer;">
        <rect width="80" height="20" rx="10" class="cell-box" style="filter: url(#${filterId});" />
        <text x="${labelX}" y="13.5" class="text-label" text-anchor="${labelAnchor}">Zelle ${index + 1}</text>
        <text x="${valueX}" y="13.5" class="cell-value" text-anchor="${valueAnchor}">${val}<tspan dx="1" dy="-3" font-size="6">${unit}</tspan></text>
      </g>  
    `;
  }

  private _renderCellBig(x: number, y: number, entityId: string, label: string, decimals: number = 0): TemplateResult | typeof svg {
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return svg``;

    // Daten extrahieren
    const rawValue = stateObj.state;
    const uom = stateObj.attributes.unit_of_measurement || "";
    const numValue = parseFloat(rawValue);
    const isNumber = !isNaN(numValue);
    const displayValue = isNumber ? numValue.toFixed(decimals) : rawValue;

    let statusClass = "";
    
    if (entityId === this.config.celldiff && this.config.diff_alarm_active) {
      const diff_warn = this.config.diff_warn || 0.05;
      const diff_alarm = this.config.diff_alarm || 0.1;

      if (numValue >diff_alarm) {
        statusClass = "alarm";
      } else if (numValue > diff_warn) {
        statusClass = "warn";
      }
    }

    return svg`
      <g transform="translate(${x}, ${y})" @click=${(e: Event) => this._showMoreInfo(e, entityId)} style="cursor: pointer;">
        <text x="0" y="0" text-anchor="middle">
          <tspan class="text-label ${statusClass}" style="font-size: 16px;">${displayValue}</tspan>
          <tspan class="text-label ${statusClass}" style="font-size: 10px; dx: 3;">${isNumber ? uom : ""}</tspan>
        </text>
        
        <text x="0" y="15" text-anchor="middle" style="fill: rgba(255,255,255,0.5); font-size: 7px; text-transform: uppercase; letter-spacing: 0.5px;">
          ${label}
        </text>
      </g>
    `;
  }

  private _renderCellSmall(x: number, y: number, entityId: string, label: string, decimals: number = 0, show_uom: boolean = false): TemplateResult | typeof svg {
    const stateObj = this.hass.states[entityId];
    
    // Daten extrahieren
    const rawValue = stateObj ? stateObj.state : "N/A";
    const uom = stateObj ? stateObj.attributes.unit_of_measurement : "";
    const numValue = parseFloat(rawValue);
    const isNumber = !isNaN(numValue);

    // Formatierung (toFixed nur bei echten Zahlen)
    const displayValue = isNumber ? numValue.toFixed(decimals) : rawValue;

    return svg`
      <g transform="translate(${x}, ${y})" @click=${(e: Event) => this._showMoreInfo(e, entityId)} style="cursor: pointer;">
        <text x="0" y="0" text-anchor="start">
          <tspan class="cell-small-label">${label}:</tspan>
          <tspan dy="1" class="text-label" style="font-size: 12px;">
            ${displayValue}
          </tspan>
          ${show_uom && isNumber ? svg`
            <tspan dy="-2" class="text-label" style="font-size: 8px;">${uom}</tspan>
          ` : ""}
        </text>
      </g>
    `;
  }

  private _renderSocDisplay(x: number, y: number, socNumeric: number, systemStatus: string): TemplateResult | typeof svg {
    const socValue = socNumeric.toFixed(0);
    const { soc_bar, soc_dots } = this.config;
    const isCharging = systemStatus === "Laden";
    const thresholds: number[] = [100, 80, 60, 40, 20];

    const barWidth = 120;
    const barHeight = 4;
    const barX = -barWidth / 2;
    const barY = 15;
    const fillWidth = (Math.min(100, Math.max(0, socNumeric)) / 100) * barWidth;

    return svg`
      <g id="soc-display" transform="translate(${x}, ${y})">
        ${this.config.soc ? svg`
          <text x="0" y="0" text-anchor="middle" class="soc-value-big" style="font-size: 36px;">
            ${socValue}%
          </text>

          ${soc_bar ? svg`
            <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="${barHeight/2}" fill="rgba(255,255,255,0.1)" />
            <rect class="soc-bar-fill" x="${barX}" y="${barY}" width="${fillWidth}" height="${barHeight}" rx="${barHeight/2}" />
          ` : ""}

          ${soc_dots ? svg`
            ${thresholds.map((threshold, i) => {
              const isActive = (socNumeric >= threshold);
              const isNext = isCharging && !isActive && (i === thresholds.length - 1 || socNumeric >= thresholds[i + 1]);
              const dotY = 40 + (i * 18); 
              return svg`
                <circle 
                  cx="0" cy="${dotY}" r="3" 
                  fill="${isActive || isNext ? '#00d2ff' : 'rgba(255,255,255,0.1)'}"
                  class="${isNext ? 'charging-dot' : ''}"
                  style="${isActive ? 'filter: drop-shadow(0 0 3px #00d2ff);' : ''} transition: all 0.5s ease;"
                />`;
            })}` : ""}
        ` : ""}

        ${systemStatus ? svg`
          <text x="0" y="140" text-anchor="middle" class="text-label" style="font-size: 10px;">
            ${systemStatus}
          </text>
        ` : ""}
      </g>
    `;
  }
  
  private _renderMeasurements(x: number, y: number, activeMeasures: any[]): TemplateResult | typeof svg {
    if (activeMeasures.length === 0) return svg``;
    
    const spacing = 70;
    const total = activeMeasures.length;
    
    return svg`
      <g id="measurements-cells" transform="translate(${x}, ${y})">
        ${activeMeasures.map((m, i) => {
          const xPos = (i - (total - 1) / 2) * spacing;
          return this._renderCellBig(
            xPos, 0, m.id!, m.label, m.dec
          );
        })}
      </g>
    `;
  }

  private _renderInfoStates(x: number, y: number, infoStates: any[]): TemplateResult | typeof svg {
    if (infoStates.length === 0) return svg``;
    
    const rowHeight = 15;

    return svg`
      <g id="InfoStates" transform="translate(${x}, ${y})">
        ${infoStates.map((m, i) => {
          const yPos = -10 - (i * rowHeight);
          return this._renderCellSmall(
            0, yPos, m.id!, m.label, m.dec, m.show_uom
          );
        })}
      </g>
    `;
  }
  private _renderFailureState(x: number, y: number, failureEntity: string): TemplateResult | typeof svg {
    return svg`
      ${failureEntity ? svg`
        <text x="0" y="140" text-anchor="middle" class="text-label" style="font-size: 10px;">
          ${failureEntity}
        </text>
      ` : ""}
    `;
  }


  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;
    return changedProps.has('hass');
  }
 
  protected render(): TemplateResult {
    if (!this.hass || !this.config) return html``;

    const svgWidth = 400;
    const svgHeight = 350;
    const margin = 15;
    const boxWidth = 80;
    const columStart = 80; 
    const rightColumnX = svgWidth - margin - boxWidth;
    const rightColumnXSmall = rightColumnX - (svgWidth / 2);

    const { entities } = this.config;
    const count = entities.length;

    // --- Dynamisches Grid für die Big Cells vorbereiten ---
    const activeMeasures = [
      { id: this.config.voltage, label: "Spannung", dec: 1 },
      { id: this.config.remaining, label: "Restenergie", dec: 1 },
      { id: this.config.celldiff, label: "Zelldifferenz", dec: 3 }
    ].filter(m => m.id && this.hass.states[m.id]);
    
    const infoStates = [
      { id: this.config.cycles, label: "Zyklen", dec: 0, show_uom: false },
      { id: this.config.case_temp, label: "Temp.", dec: 1, show_uom: true }
    ].filter(m => m.id && this.hass.states[m.id]);

    const socEntity = this.config.soc ? this.hass.states[this.config.soc] : null;
    const failureEntity = this.config.failure ? this.hass.states[this.config.failure] : null;
    const statusEntity = this.config.status ? this.hass.states[this.config.status] : null;
    const statusMap: Record<string, string> = {
      "Charge": "Laden",
      "Discharge": "Entladen",
      "Standby Mode": "Standby"
    };

    // Dynamische Aufteilung: Wenn 8 Zellen da sind, kommen alle links oder 4/4. 
    // Bei 15 Zellen: 8 links, 7 rechts.
    const splitIndex = count <= 8 ? count : Math.ceil(count / 2);
    const leftCells = entities.slice(0, splitIndex);
    const rightCells = entities.slice(splitIndex);
    
    
    const socNumeric = socEntity ? parseFloat(socEntity.state) : 0;
    const rawStatus = statusEntity ? statusEntity.state : "";
    const systemStatus = statusMap[rawStatus] || rawStatus;
    const failureSensor = failureEntity ? failureEntity.state : "";


    return html`
      <ha-card>
        <svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="bevel-filter" x="-20%" y="-20%" width="140%" height="140%">
               <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#000" />
               <feDropShadow dx="-1" dy="-1" stdDeviation="1" flood-color="#fff" flood-opacity="0.2" />
            </filter>
          </defs>

          <g id="top-row" transform="translate(${svgWidth / 2}, 30)">
            ${this._renderTitleRow(0, 0)}
            ${this._renderInfoStates(rightColumnXSmall + 20, 30, infoStates)}
          </g>
          <g id="left-column" transform="translate(${margin}, ${columStart})">
            ${leftCells.map((ent, i) => this._renderCell(0, i * 32, i, ent, 'bevel-filter', false))}
          </g>

          ${this._renderSocDisplay(svgWidth / 2, columStart + 20, socNumeric, systemStatus)}

          ${this._renderMeasurements(svgWidth / 2, columStart + 180, activeMeasures)}
          
          ${this._renderFailureState(svgWidth / 2, columStart + 260, failureSensor)}


          <g id="right-column" transform="translate(${rightColumnX}, ${columStart})">
            ${rightCells.map((ent, i) => this._renderCell(0, i * 32, i + splitIndex, ent, 'bevel-filter', true))}
          </g>

        </svg>
      </ha-card>
    `;
  }

  static get styles(): CSSResult {
    return cardStyles;
  }
}

// Custom Card UI Discovery
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "glass-bms-card",
  name: "Glass BMS Card",
  version: "1.0.0",
  preview: true,
  description: "Eine Glass-Morphism Karte für BMS Daten",
});