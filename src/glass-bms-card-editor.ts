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
        name: "entities",
        label: "Zellspannungen (Liste)",
        selector: { entity: { multiple: true, domain: "sensor"} }
      },
      { name: "soc", label: "SoC", selector: { entity: {} } },
      { name: "status", label: "Status", selector: { entity: {} } },
      { name: "voltage", label: "Gesamtspannung", selector: { entity: {} } },
      { name: "remaining", label: "Verbl. Leistung", selector: { entity: {} } },
      { name: "celldiff", label: "Zellendifferenz", selector: { entity: {} } },
      { name: "cycles", label: "Zyklen", selector: { entity: {} } },
      { name: "temperature", label: "Temperatur", selector: { entity: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "soc_bar", label: "Balken anzeigen", selector: { boolean: {} } },
          { name: "soc_dots", label: "Punkte anzeigen", selector: { boolean: {} } },
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