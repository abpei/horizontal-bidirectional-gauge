/**
 * HorizontalBidirectionalGauge — a custom Lovelace card for Home Assistant.
 *
 * Renders a horizontal bar gauge with a zero divider in the center (or
 * proportional position for asymmetric ranges). Values fill left (negative)
 * or right (positive) from zero, each with configurable colors.
 */
import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { GaugeConfig, ResolvedGaugeConfig, HassEntity, HomeAssistant } from "./types.js";
declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string }>;
  }
}

/* ── Default values ─────────────────────────────────────────────────── */

/** Default maximum gauge value when not specified in config. */
const DEFAULT_MAX = 100;

/** Default bar height in pixels. */
const DEFAULT_BAR_HEIGHT = 12;

/** CSS fallback colors matching HA theme variables. */
const CSS_DEFAULTS: Record<string, string> = {
  negative_color: "var(--error-color)",
  positive_color: "var(--success-color)",
  zero_divider_color: "var(--secondary-text-color)",
  background_color: "var(--secondary-background-color)",
};

/* ── Card class ─────────────────────────────────────────────────────── */

@customElement("horizontal-bidirectional-gauge")
export class HorizontalBidirectionalGauge extends LitElement {
  /* ── HA Lovelace hooks ─────────────────────────────────────────── */

  /**
   * Returns the ha-form schema for the visual card editor.
   * Defines all configurable fields grouped into expandable sections:
   * Entity, Range, Colors, Labels, Appearance, and Behavior.
   * Also provides computeLabel and assertConfig callbacks for the editor.
   */
  static getConfigForm() {
    const schema = [
      /* Entity — always visible, required */
      { name: "entity", required: true, selector: { entity: {} } },

      /* Range — numeric min/max bounds */
      {
        type: "expandable" as const,
        name: "range",
        label: "Range",
        flatten: true,
        schema: [
          { name: "min", selector: { number: { min: -100000, max: 100000, step: 1 } } },
          { name: "max", default: DEFAULT_MAX, selector: { number: { min: -100000, max: 100000, step: 1 } } },
        ],
      },

      /* Colors — fill and track colors using HA's ui_color picker */
      {
        type: "expandable" as const,
        name: "colors",
        label: "Colors",
        flatten: true,
        schema: [
          { name: "negative_color", selector: { ui_color: {} } },
          { name: "positive_color", selector: { ui_color: {} } },
          { name: "zero_divider_color", selector: { ui_color: {} } },
          { name: "background_color", selector: { ui_color: {} } },
        ],
      },

      /* Labels — text overrides for title, direction labels, unit, precision */
      {
        type: "expandable" as const,
        name: "labels",
        label: "Labels",
        flatten: true,
        schema: [
          { name: "title", selector: { text: {} } },
          { name: "negative_label", selector: { text: {} } },
          { name: "positive_label", selector: { text: {} } },
          { name: "unit", selector: { text: {} } },
          { name: "precision", default: 1, selector: { number: { min: 0, max: 5, step: 1 } } },
        ],
      },

      /* Appearance — visual style: bar height, toggles, icon */
      {
        type: "expandable" as const,
        name: "appearance",
        label: "Appearance",
        flatten: true,
        schema: [
          {
            name: "bar_height",
            default: DEFAULT_BAR_HEIGHT,
            selector: { number: { min: 4, max: 50, step: 1, unit_of_measurement: "px" } },
          },
          { name: "show_zero_divider", default: true, selector: { boolean: {} } },
          { name: "show_value", default: true, selector: { boolean: {} } },
          { name: "show_icon", default: false, selector: { boolean: {} } },
          { name: "icon", selector: { icon: {} } },
          { name: "show_scale_units", default: false, selector: { boolean: {} } },
        ],
      },

      /* Behavior — direction, animation, and tap action */
      {
        type: "expandable" as const,
        name: "behavior",
        label: "Behavior",
        flatten: true,
        schema: [
          { name: "inverted", default: false, selector: { boolean: {} } },
          { name: "animation", default: true, selector: { boolean: {} } },
          {
            name: "tap_action",
            default: "more-info",
            selector: {
              select: {
                options: [
                  { value: "more-info", label: "More-info" },
                  { value: "toggle", label: "Toggle" },
                  { value: "navigate", label: "Navigate" },
                  { value: "none", label: "None" },
                ],
              },
            },
          },
          {
            name: "navigate_path",
            selector: { text: {} },
          },
        ],
      },
    ];

    /**
     * Maps each schema field name to a human-readable label for the editor UI.
     * Falls back to the raw field name if no mapping exists.
     */
    const computeLabel = (
      s: { name: string },
      _localize?: (key: string, ...args: unknown[]) => string,
    ): string => {
      const labels: Record<string, string> = {
        entity: "Entity",
        min: "Minimum value",
        max: "Maximum value",
        negative_color: "Negative (export) color",
        positive_color: "Positive (import) color",
        zero_divider_color: "Zero divider color",
        background_color: "Background color",
        title: "Card title",
        negative_label: "Negative label",
        positive_label: "Positive label",
        unit: "Unit override",
        precision: "Decimal precision",
        bar_height: "Bar height",
        show_zero_divider: "Show zero divider",
        show_value: "Show value",
        show_icon: "Show icon",
        icon: "Icon",
        show_scale_units: "Show scale units",
        inverted: "Invert direction",
        animation: "Flow animation",
      };
      return labels[s.name] || _localize?.(`ui.panel.lovelace.editor.card.generic.${s.name}`) || s.name;
    };

    /**
     * Validates the config object for the visual editor.
     * Throws when entity is missing/empty, min >= max, or numeric fields are out of bounds.
     */
    const assertConfig = (config: Record<string, unknown>): void => {
      // Entity is required and must be a non-empty string
      if (!config.entity || typeof config.entity !== "string" || config.entity.trim() === "") {
        throw new Error("Entity is required");
      }

      // min must be less than max when both are present
      if (config.min != null && config.max != null) {
        if (Number(config.min) >= Number(config.max)) {
          throw new Error("Minimum must be less than maximum");
        }
      }

      // Precision must be an integer between 0 and 5
      if (config.precision != null) {
        const p = Number(config.precision);
        if (!Number.isInteger(p) || p < 0 || p > 5) {
          throw new Error("Precision must be between 0 and 5");
        }
      }

      // Bar height must be between 4 and 50 pixels
      if (config.bar_height != null) {
        const h = Number(config.bar_height);
        if (!Number.isInteger(h) || h < 4 || h > 50) {
          throw new Error("Bar height must be between 4 and 50 pixels");
        }
      }
    };

    return { schema, computeLabel, assertConfig };
  }

  /**
   * Provides a default config stub shown when user adds the card.
   * Minimal configuration: entity placeholder and default max of 100.
   */
  static getStubConfig(): GaugeConfig {
    return {
      entity: "",
      max: DEFAULT_MAX,
    };
  }

  /** Card size hint for Lovelace layout engine — 2 units tall. */
  getCardSize(): number {
    return 2;
  }

  /* ── LitElement properties ──────────────────────────────────────── */

  /** Internal storage for hass — setter triggers re-render. */
  private _hass!: HomeAssistant;

  /** Home Assistant object injected by Lovelace on every update.
   *  Custom setter ensures LitElement re-renders even when HA
   *  mutates the same object reference in place. */
  set hass(value: HomeAssistant) {
    this._hass = value;
    this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  /** Resolved config after setConfig() applies defaults. Null until configured. */
  @state() private _config: ResolvedGaugeConfig | null = null;

  /* ── CSS ────────────────────────────────────────────────────────── */

  static styles = css`
    :host {
      display: block;
    }

    .card {
      padding: 4px 0 0px 0;
    }

    /* Title row — name left, icon + value right */
    .title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px 4px 16px;
      min-height: 28px;
    }
    .title-row__name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0;
    }
    .title-row__value {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap;
      margin-left: 8px;
    }
    .title-row__icon {
      --mdc-icon-size: 18px;
      color: var(--primary-text-color);
    }

    /* Bar track — contains fills, divider, and labels */
    .bar-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
    }
    .bar-track {
      position: relative;
      flex: 1;
      border-radius: 6px;
      overflow: hidden;
    }

    /* Fill bars — absolutely positioned within the track, growing from zero */
    .bar-track__fill {
      position: absolute;
      top: 0;
      height: 100%;
      overflow: hidden;
    }
    .bar-track__fill--negative {
      border-radius: 6px 0 0 6px;
    }
    .bar-track__fill--positive {
      border-radius: 0 6px 6px 0;
    }

    /* Zero divider — thin vertical line at the zero position */
    .bar-track__zero-divider {
      position: absolute;
      top: 0;
      height: 100%;
      width: 2px;
      transform: translateX(-1px);
      z-index: 2;
    }

    /* Animation transition for smooth fill changes */
    .animated {
      transition: left 0.3s ease, width 0.3s ease;
    }

    /* Flow arrows — lightweight directional arrow characters */
    .flow-arrows {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      pointer-events: none;
      overflow: hidden;
      border-radius: inherit;
      white-space: nowrap;
      letter-spacing: 0.15em;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
    }
    .flow-arrows--left {
      left: 0;
      width: 100%;
    }
    .flow-arrows--right {
      right: 0;
      width: 100%;
      justify-content: flex-end;
    }
    .flow-arrows--animated {
      animation: arrow-pulse 2s ease-in-out infinite;
    }
    @keyframes arrow-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }

    /* Unavailable state — dim the bar and fills */
    .unavailable .bar-track__negative-fill,
    .unavailable .bar-track__positive-fill,
    .unavailable .bar-track__zero-divider {
      opacity: 0.25;
    }

    /* Direction labels — positioned outside the bar track */
    .bar-label {
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      min-width: 40px;
    }
    .bar-label--negative {
      text-align: right;
    }
    .bar-label--positive {
      text-align: left;
    }

    /* Scale labels row — min, zero, max beneath the bar */
    .scale-row {
      position: relative;
      padding: 2px 16px 4px 16px;
      font-size: 12px;
      color: var(--secondary-text-color);
      height: 20px;
    }
    .scale-row__label {
      position: absolute;
      font-size: 11px;
    }
    .scale-row__label--min {
      left: 16px;
    }
    .scale-row__label--max {
      right: 16px;
    }
    .scale-row__zero {
      position: absolute;
      font-weight: 500;
      font-size: 11px;
      transform: translateX(-50%);
    }
  `;

  /* ── Render ─────────────────────────────────────────────────────── */

  /**
   * Main render entry point. Computes all derived values and delegates
   * to helper methods for each visual section (title, bar, scale).
   */
  render() {
    if (!this._config) return nothing;

    const cfg = this._config;
    const entity = this.hass?.states?.[cfg.entity];
    const isUnavailable =
      !entity || entity.state === "unavailable" || entity.state === "unknown";
    // Raw value for display — never clamped, shows actual sensor reading
    const rawValue = isUnavailable ? 0 : this._parseValue(entity.state);
    // Clamped value for bar fill calculations — capped to min/max range
    const value = this._clampValue(rawValue);

    const zeroPosition = this._computeZeroPosition();
    const negativeFill = this._computeNegativeFill(value, zeroPosition);
    const positiveFill = this._computePositiveFill(value, zeroPosition);
    // Display the raw sensor value, not the clamped bar value
    const displayValue = isUnavailable ? "\u2014" : this._formatValue(rawValue);
    const unit = cfg.unit ?? entity?.attributes?.unit_of_measurement ?? "";
    const unitDisplay = unit ? ` ${unit}` : "";

    return html`
      <ha-card class="card ${isUnavailable ? "unavailable" : ""}"
        @click=${this._handleAction}>
        ${this._renderTitleRow(displayValue, unitDisplay, entity, cfg)}
        ${this._renderBarTrack(
          zeroPosition,
          negativeFill,
          positiveFill,
          cfg,
        )}
        ${this._renderScaleRow(cfg, zeroPosition, unit)}
      </ha-card>
    `;
  }

  /* ── Render helpers ─────────────────────────────────────────────── */

  /**
   * Title row: entity name on the left, icon + formatted value on the right.
   * Hidden entirely when title is set to empty string.
   */
  private _renderTitleRow(
    displayValue: string,
    unitDisplay: string,
    entity: HassEntity | undefined,
    cfg: ResolvedGaugeConfig,
  ) {
    // Empty title string means user wants the title row hidden
    if (cfg.title === "") return nothing;

    // Resolve display name: config title > entity friendly_name > entity_id
    // An explicit empty title string hides the title row entirely.
    const name =
      cfg.title ?? entity?.attributes?.friendly_name ?? cfg.entity;
    // Resolve icon: config icon > entity icon > empty (no icon shown)
    const iconStr = cfg.icon || entity?.attributes?.icon || "";

    return html`
      <div class="title-row">
        <span class="title-row__name">${name}</span>
        <span class="title-row__value">
          ${cfg.show_icon && iconStr
            ? html`<ha-icon
                class="title-row__icon"
                .icon=${iconStr}
              ></ha-icon>`
            : nothing}
          ${cfg.show_value
            ? html`<span>${displayValue}${unitDisplay}</span>`
            : nothing}
        </span>
      </div>
    `;
  }

  /**
   * Bar track: negative fill, zero divider, positive fill, and direction labels.
   * Labels are rendered outside the bar on left/right when configured.
   */
  private _renderBarTrack(
    zeroPosition: number,
    negativeFill: number,
    positiveFill: number,
    cfg: ResolvedGaugeConfig,
  ) {
    // Toggle animation class based on config
    const animClass = cfg.animation ? "animated" : "";

    return html`
      <div class="bar-wrapper">
        ${cfg.negative_label
          ? html`<span class="bar-label bar-label--negative"
              >${cfg.negative_label}</span
            >`
          : nothing}
        <div
          class="bar-track"
          style="height: ${cfg.bar_height}px; background: ${cfg.background_color};"
        >
          ${negativeFill > 0
            ? html`<div
                class="bar-track__fill bar-track__fill--negative ${animClass}"
                style="left: ${zeroPosition - negativeFill}%; width: ${negativeFill}%; background: ${cfg.negative_color};"
              >
                <div class="flow-arrows flow-arrows--left ${cfg.animation ? "flow-arrows--animated" : ""}">
                  ${"\u25C0 ".repeat(40)}
                </div>
              </div>`
            : nothing}
          ${positiveFill > 0
            ? html`<div
                class="bar-track__fill bar-track__fill--positive ${animClass}"
                style="left: ${zeroPosition}%; width: ${positiveFill}%; background: ${cfg.positive_color};"
              >
                <div class="flow-arrows flow-arrows--right ${cfg.animation ? "flow-arrows--animated" : ""}">
                  ${" \u25B6".repeat(40)}
                </div>
              </div>`
            : nothing}
          ${cfg.show_zero_divider
            ? html`<div
                class="bar-track__zero-divider"
                style="left: ${zeroPosition}%; background: ${cfg.zero_divider_color};"
              ></div>`
            : nothing}
        </div>
        ${cfg.positive_label
          ? html`<span class="bar-label bar-label--positive"
              >${cfg.positive_label}</span
            >`
          : nothing}
      </div>
    `;
  }

  /**
   * Scale labels row: min value on left, zero at actual zeroPosition, max on right.
   * Provides visual reference for the gauge range.
   */
  private _renderScaleRow(cfg: ResolvedGaugeConfig, zeroPosition: number, unit: string) {
    const unitLabel = cfg.show_scale_units && unit ? ` ${unit}` : "";
    return html`
      <div class="scale-row">
        <span class="scale-row__label scale-row__label--min"
          >${this._formatScaleLabel(cfg.min, cfg.precision)}${unitLabel}</span
        >
        <span class="scale-row__zero" style="left: ${zeroPosition}%;">0${unitLabel}</span>
        <span class="scale-row__label scale-row__label--max"
          >${this._formatScaleLabel(cfg.max, cfg.precision)}${unitLabel}</span
        >
      </div>
    `;
  }

  /* ── Computed values ────────────────────────────────────────────── */

  /**
   * Zero position as a percentage from the left edge.
   * For symmetric ranges (min = -max) this is 50%.
   * For asymmetric ranges it shifts proportionally.
   * Formula: (0 - min) / (max - min) * 100
   */
  private _computeZeroPosition(): number {
    const cfg = this._config!;
    return ((0 - cfg.min) / (cfg.max - cfg.min)) * 100;
  }

  /**
   * Negative fill width as a percentage of the total bar.
   * Grows from zeroPosition toward the left edge.
   * When inverted, the sign is flipped so negative values fill right instead.
   */
  private _computeNegativeFill(value: number, zeroPosition: number): number {
    // When inverted, negate the value so directions swap
    const effectiveValue = this._config!.inverted ? -value : value;
    // Only fill when value is negative (below zero)
    if (effectiveValue >= 0) return 0;
    const cfg = this._config!;
    const absMin = Math.abs(cfg.min);
    // Avoid division by zero when min is 0
    if (absMin === 0) return 0;
    // Scale: how much of the left half (0..zeroPosition%) is filled
    return (Math.abs(effectiveValue) / absMin) * zeroPosition;
  }

  /**
   * Positive fill width as a percentage of the total bar.
   * Grows from zeroPosition toward the right edge.
   * When inverted, the sign is flipped so positive values fill left instead.
   */
  private _computePositiveFill(value: number, zeroPosition: number): number {
    // When inverted, negate the value so directions swap
    const effectiveValue = this._config!.inverted ? -value : value;
    // Only fill when value is positive (above zero)
    if (effectiveValue <= 0) return 0;
    const cfg = this._config!;
    // Available space on the right half of the bar
    const rightSpace = 100 - zeroPosition;
    // Avoid division by zero when max is 0
    if (cfg.max === 0) return 0;
    // Scale: how much of the right half (zeroPosition..100%) is filled
    return (effectiveValue / cfg.max) * rightSpace;
  }

  /* ── Value helpers ──────────────────────────────────────────────── */

  /**
   * Clamp a numeric value to [min, max].
   * Prevents fill from exceeding bar boundaries.
   */
  private _clampValue(value: number): number {
    const cfg = this._config!;
    return Math.max(cfg.min, Math.min(cfg.max, value));
  }

  /**
   * Parse entity state string to a number.
   * Returns 0 for non-numeric or missing states.
   */
  private _parseValue(state: string): number {
    const num = parseFloat(state);
    return Number.isFinite(num) ? num : 0;
  }

  /**
   * Format the displayed value with the configured precision.
   * Uses toFixed() for consistent decimal places.
   */
  private _formatValue(value: number): string {
    const cfg = this._config!;
    return value.toFixed(cfg.precision);
  }

  /**
   * Build a CSS linear-gradient for the bar background.
   * Negative fill grows leftward from zeroPosition, positive rightward.
   * This avoids absolute positioning issues with overflow:hidden.
   */
  private _buildBarBackground(
    zeroPosition: number,
    negativeFill: number,
    positiveFill: number,
    cfg: ResolvedGaugeConfig,
  ): string {
    const bg = cfg.background_color;
    const neg = cfg.negative_color;
    const pos = cfg.positive_color;

    // Negative fill: from (zeroPosition - negativeFill)% to zeroPosition%
    const negStart = Math.max(0, zeroPosition - negativeFill);
    // Positive fill: from zeroPosition% to (zeroPosition + positiveFill)%
    const posEnd = Math.min(100, zeroPosition + positiveFill);

    // Build gradient stops
    const stops: string[] = [];

    if (negativeFill > 0) {
      stops.push(`${bg} ${negStart}%`);
      stops.push(`${neg} ${negStart}%`);
      stops.push(`${neg} ${zeroPosition}%`);
    }

    if (positiveFill > 0) {
      stops.push(`${bg} ${zeroPosition}%`);
      stops.push(`${pos} ${zeroPosition}%`);
      stops.push(`${pos} ${posEnd}%`);
    }

    if (stops.length === 0) {
      return bg;
    }

    stops.push(`${bg} ${negativeFill > 0 ? zeroPosition : posEnd}%`);

    return `linear-gradient(to right, ${stops.join(", ")})`;
  }

  /**
   * Format scale labels (min / max) for the row beneath the bar.
   * Uses integer format for whole numbers, otherwise matches configured precision.
   */
  private _formatScaleLabel(value: number, precision: number): string {
    if (Number.isInteger(value)) return value.toString();
    return value.toFixed(precision);
  }

  /* ── Tap action handler ────────────────────────────────────────── */

  /**
   * Handles tap/click events on the ha-card element.
   * Implements action handling inline to avoid importing from
   * ha/handle-action which requires ES module resolution.
   * Supports: more-info, toggle, navigate, none.
   */
  private _handleAction(ev: Event) {
    if (!this._config || !this.hass) return;
    const config = this._config;
    const action = config.tap_action ?? "more-info";

    if (action === "none") return;

    // Dispatch the event to get the action detail
    const detail = (ev as any).detail;
    const actionType = detail?.action ?? "tap";

    if (action === "more-info") {
      // Fire the standard HA more-info event
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: config.entity },
        })
      );
    } else if (action === "toggle" && config.entity) {
      // Toggle the entity
      const domain = config.entity.split(".")[0];
      this.hass.callService(domain, "toggle", { entity_id: config.entity });
    } else if (action === "navigate" && config.navigate_path) {
      // Navigate to path
      history.pushState(null, "", config.navigate_path);
      this.dispatchEvent(new Event("location-changed", { bubbles: true }));
    }
  }

  /* ── Config setter (Lovelace contract) ──────────────────────────── */

  /**
   * Called by Lovelace when the card config changes.
   * Validates required fields and resolves all defaults into _config.
   * Throws if entity is missing (required by Lovelace contract).
   */
  setConfig(config: GaugeConfig): void {
    if (!config.entity) {
      throw new Error("Entity is required");
    }

    // Resolve range defaults: max defaults to 100, min defaults to -max
    const max = config.max ?? DEFAULT_MAX;
    const min = config.min ?? -max;

    // Validate range to avoid division by zero and nonsensical gauges
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      throw new Error("min and max must be finite numbers");
    }
    if (min >= max) {
      throw new Error("min must be less than max");
    }

    // Precision auto-scales: 0 decimals for large ranges, 1 for smaller
    const precision = config.precision ?? (max >= 1000 ? 0 : 1);
    const barHeight = config.bar_height ?? DEFAULT_BAR_HEIGHT;

    // Build resolved config with all defaults applied.
    // "type" is required by HA's handleAction to route tap actions correctly.
    this._config = {
      entity: config.entity,
      min,
      max,
      negative_color: config.negative_color ?? CSS_DEFAULTS.negative_color,
      positive_color: config.positive_color ?? CSS_DEFAULTS.positive_color,
      zero_divider_color:
        config.zero_divider_color ?? CSS_DEFAULTS.zero_divider_color,
      background_color:
        config.background_color ?? CSS_DEFAULTS.background_color,
      title: config.title,
      negative_label: config.negative_label ?? "",
      positive_label: config.positive_label ?? "",
      unit: config.unit,
      precision,
      bar_height: barHeight,
      show_zero_divider: config.show_zero_divider ?? true,
      show_value: config.show_value ?? true,
      show_icon: config.show_icon ?? false,
      icon: config.icon ?? "",
      inverted: config.inverted ?? false,
      animation: config.animation ?? true,
      show_scale_units: config.show_scale_units ?? false,
      tap_action: config.tap_action ?? "more-info",
      navigate_path: config.navigate_path ?? "",
    };
  }

  /* ── Hass setter (Lovelace contract) ────────────────────────────── */
  /**
   * Manual hass getter/setter ensures LitElement re-renders when Home
   * Assistant mutates the same object reference in place.
   */
}

/* ── Custom element registration ────────────────────────────────────── */

/**
 * Register this card in the Home Assistant card picker so it appears
 * in the UI when users add a new Lovelace card.
 */
window.customCards = window.customCards || [];
window.customCards.push({
  type: "horizontal-bidirectional-gauge",
  name: "Horizontal Bidirectional Gauge",
  description: "Bidirectional bar gauge with zero divider for energy flow visualization",
});

declare global {
  interface HTMLElementTagNameMap {
    "horizontal-bidirectional-gauge": HorizontalBidirectionalGauge;
  }
}
