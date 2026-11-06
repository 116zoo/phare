import * as migration_20260918_151143_initial from './20260918_151143_initial';
import * as migration_20261006_162727_multilingual_aeo_accessibility from './20261006_162727_multilingual_aeo_accessibility';
import * as migration_20261006_163512_localize_link_labels from './20261006_163512_localize_link_labels';
import * as migration_20261020_180247_accessibility_statements_and_localized_search from './20261020_180247_accessibility_statements_and_localized_search';
import * as migration_20261021_135206_site_settings_customizer from './20261021_135206_site_settings_customizer';
import * as migration_20261021_143222_mcp_api_keys from './20261021_143222_mcp_api_keys';
import * as migration_20261106_152057_platform_saas_design from './20261106_152057_platform_saas_design';
import * as migration_20261106_153607_locales_fr_en from './20261106_153607_locales_fr_en';

export const migrations = [
  {
    up: migration_20260918_151143_initial.up,
    down: migration_20260918_151143_initial.down,
    name: '20260918_151143_initial',
  },
  {
    up: migration_20261006_162727_multilingual_aeo_accessibility.up,
    down: migration_20261006_162727_multilingual_aeo_accessibility.down,
    name: '20261006_162727_multilingual_aeo_accessibility',
  },
  {
    up: migration_20261006_163512_localize_link_labels.up,
    down: migration_20261006_163512_localize_link_labels.down,
    name: '20261006_163512_localize_link_labels',
  },
  {
    up: migration_20261020_180247_accessibility_statements_and_localized_search.up,
    down: migration_20261020_180247_accessibility_statements_and_localized_search.down,
    name: '20261020_180247_accessibility_statements_and_localized_search',
  },
  {
    up: migration_20261021_135206_site_settings_customizer.up,
    down: migration_20261021_135206_site_settings_customizer.down,
    name: '20261021_135206_site_settings_customizer',
  },
  {
    up: migration_20261021_143222_mcp_api_keys.up,
    down: migration_20261021_143222_mcp_api_keys.down,
    name: '20261021_143222_mcp_api_keys',
  },
  {
    up: migration_20261106_152057_platform_saas_design.up,
    down: migration_20261106_152057_platform_saas_design.down,
    name: '20261106_152057_platform_saas_design',
  },
  {
    up: migration_20261106_153607_locales_fr_en.up,
    down: migration_20261106_153607_locales_fr_en.down,
    name: '20261106_153607_locales_fr_en'
  },
];
