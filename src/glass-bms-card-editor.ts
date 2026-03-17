import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';

@customElement('glass-bms-card-editor')
export class GlassBmsCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: any;

  public setConfig(config: any): void {
    this._config = config;
  }

  private _schema() {
    return [
      { name: "title", label: "Titel der Karte", selector: { text: {} } },
      {
        name: "language",
        label: "Sprache (Language)",
        selector: {
          select: {
            options: [
              { value: "", label: "Auto (System)" },
              { value: "de", label: "Deutsch" },
              { value: "en", label: "English" }
            ],
            mode: "dropdown"
          }
        }
      },
      {
        name: "entities",
        label: "Zellspannungen",
        selector: { entity: { multiple: true, domain: "sensor"} }
      },
      {
        type: "grid",
        name: "",
        title: "Haupt-Sensoren",
        schema: [
          { name: "soc", label: "SoC", selector: { entity: {} } },
          { name: "voltage", label: "Gesamtspannung", selector: { entity: {} } },
          { name: "remaining", label: "Verbl. Leistung", selector: { entity: {} } },
          { name: "celldiff", label: "Zellendifferenz", selector: { entity: {} } }
        ],
      },
      {
        type: "grid",
        title: "Info-Sensoren",
        name: "",
        schema: [
          { name: "celldiff", label: "Zellendifferenz", selector: { entity: { domain: "sensor" } } },
          { name: "cycles", label: "Ladezyklen", selector: { entity: { domain: "sensor" } } },
          { name: "case_temp", label: "Case-Temperatur", selector: { entity: { domain: "sensor" } } },
          { name: "status", label: "Status", selector: { entity: {} } },
          { name: "failure", label: "Fehlermeldung-Sensor", selector: { entity: { domain: "sensor" } } }
        ],
      },
      {
        type: "grid",
        title: "Anzeige-Optionen",
        name: "",
        schema: [
          { name: "soc_bar", label: "Balken anzeigen", selector: { boolean: {} } },
          { name: "soc_dots", label: "Punkte anzeigen", selector: { boolean: {} } }
        ],
      },
            {
        type: "expandable",
        title: "Alarm-Einstellung (Zell-Differenz)",
        schema: [
          { name: "diff_alarm_active", label: "Alarme aktivieren", selector: { boolean: {} } },
          { name: "diff_warn", label: "Warnschwelle (Standard 0.05)", selector: { number: { step: 0.001, mode: "box" } } },
          { name: "diff_alarm", label: "Alarmschwelle (Standard 0.10)", selector: { number: { step: 0.001, mode: "box" } } }
        ],
      },
    ];
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;
    const config = ev.detail.value;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(schema: any) => schema.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}