/**
 * TypeScript interfaces for the Horizontal Bidirectional Gauge card.
 *
 * Defines the full configuration schema, HA entity types, and the
 * HomeAssistant object shape used internally by the card.
 */

/**
 * Full configuration interface for the custom card.
 * All fields are optional except `entity` which is required at runtime.
 */
export interface GaugeConfig {
  /** Entity ID of the sensor (required). */
  entity?: string;

  // --- Range ---
  /** Minimum gauge value. Defaults to -max. */
  min?: number;
  /** Maximum gauge value. Defaults to 100. */
  max?: number;

  // --- Colors ---
  /** Color for the negative (left) fill. Accepts CSS color or var() variables. */
  negative_color?: string;
  /** Color for the positive (right) fill. */
  positive_color?: string;
  /** Color of the zero divider line. */
  zero_divider_color?: string;
  /** Background color of the bar track. */
  background_color?: string;

  // --- Labels ---
  /** Card title. Set to "" to hide. Defaults to entity friendly name. */
  title?: string;
  /** Label on the left side of the bar (e.g. "Export"). */
  negative_label?: string;
  /** Label on the right side of the bar (e.g. "Import"). */
  positive_label?: string;
  /** Unit override. Set to "" to hide. Defaults to entity unit. */
  unit?: string;
  /** Decimal places for the displayed value. Defaults to entity precision. */
  precision?: number;
  // --- Appearance ---
  /** Bar height in pixels. */
  bar_height?: number;
  /** Show/hide the zero divider line. */
  show_zero_divider?: boolean;
  /** Show/hide the numeric value display. */
  show_value?: boolean;
  /** Show/hide entity icon next to the value. */
  show_icon?: boolean;
  /** Icon override (e.g. "mdi:transmission-tower"). Defaults to entity icon. */
  icon?: string;
  /** Flip direction mapping (left=positive, right=negative). */
  inverted?: boolean;
  /** Smooth fill animation on value change. */
  animation?: boolean;
  /** Show unit of measurement alongside the min/max scale labels. */
  show_scale_units?: boolean;

  // --- Tap action ---
  /** Action triggered on tap/click: more-info, toggle, navigate, none. Defaults to more-info. */
  tap_action?: string;
  /** Navigation path when tap_action is "navigate". e.g. "/energy". */
  navigate_path?: string;

  // --- Legacy fields (ignored but kept for backward compat) ---
  /** @deprecated Use `title` instead. */
  name_override?: string;
  /** @deprecated Removed — use negative_color / positive_color. */
  gradient?: string;
  /** @deprecated Removed — use per-direction color config. */
  thresholds?: Array<{ value: number; color: string }>;
}

/**
 * Resolved configuration — all fields have concrete values after defaults are applied.
 */
export interface ResolvedGaugeConfig {
  entity: string;
  min: number;
  max: number;
  negative_color: string;
  positive_color: string;
  zero_divider_color: string;
  background_color: string;
  /** Card title. Set to "" to hide; undefined falls back to entity friendly name. */
  title: string | undefined;
  negative_label: string;
  positive_label: string;
  /** Unit override. Set to "" to hide; undefined falls back to entity unit. */
  unit: string | undefined;
  precision: number;
  bar_height: number;
  show_zero_divider: boolean;
  show_value: boolean;
  show_icon: boolean;
  icon: string;
  inverted: boolean;
  animation: boolean;
  show_scale_units: boolean;
  /** Tap action: more-info, toggle, navigate, none. */
  tap_action: string;
  /** Navigation path when tap_action is "navigate". */
  navigate_path: string;
}

/**
 * Representation of an HA entity state used internally by the card.
 * Matches the shape HomeAssistant provides in hass.states[entity_id].
 */
export interface HassEntity {
  state: string;
  entity_id: string;
  last_changed: string;
  last_updated: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    icon?: string;
    device_class?: string;
    [key: string]: unknown;
  };
}

/**
 * Minimal representation of the HomeAssistant object passed via hass property.
 * Only the subset needed by the card is typed here.
 */
export interface HomeAssistant {
  /** Map of entity_id → entity state object. */
  states: Record<string, HassEntity>;
  /** Current theme settings. */
  themes: {
    darkMode: boolean;
    theme: string | null;
  };
  /** Active UI language code. */
  language: string;
  /** Call an HA service (domain.service). */
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<void>;
}
