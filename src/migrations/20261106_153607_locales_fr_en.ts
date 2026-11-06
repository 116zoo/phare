import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

/**
 * Aligns the locale enums on the configured locales (`fr`, `en`). The earlier migrations
 * created them with `en, de, fr, es`, so the dev schema push kept trying (and failing)
 * to recreate them.
 *
 * PRODUCTION: run manually (`payload migrate`) only after checking that no `de` / `es`
 * rows remain. The guard below aborts the whole migration, changing nothing, if any are
 * found, and lists the tables to clean up first.
 */
const GUARD = sql`
  DO $guard$
  DECLARE
    col record;
    found_count bigint;
    report text := '';
  BEGIN
    FOR col IN
      SELECT c.table_name, c.column_name
      FROM information_schema.columns c
      WHERE c.table_schema = 'public'
        AND (c.udt_name = '_locales' OR c.udt_name LIKE 'enum%published_locale')
    LOOP
      EXECUTE format(
        'SELECT count(*) FROM %I WHERE %I::text IN (''de'', ''es'')',
        col.table_name,
        col.column_name
      ) INTO found_count;
      IF found_count > 0 THEN
        report := report || format('%s.%s: %s; ', col.table_name, col.column_name, found_count);
      END IF;
    END LOOP;
    IF report <> '' THEN
      RAISE EXCEPTION 'locales_fr_en: rows still use de/es, clean them up first -> %', report;
    END IF;
  END
  $guard$;
`

/**
 * Legacy `DEFAULT 'en'::_locales` on some `_locale` columns (from the multilingual
 * migration, absent from the snapshots) block `DROP TYPE`. Payload always writes
 * `_locale` explicitly, so the defaults are dropped.
 */
const DROP_LOCALE_DEFAULTS = sql`
  DO $defaults$
  DECLARE
    col record;
  BEGIN
    FOR col IN
      SELECT c.table_name, c.column_name
      FROM information_schema.columns c
      WHERE c.table_schema = 'public'
        AND c.udt_name = '_locales'
        AND c.column_default IS NOT NULL
    LOOP
      EXECUTE format('ALTER TABLE %I ALTER COLUMN %I DROP DEFAULT', col.table_name, col.column_name);
    END LOOP;
  END
  $defaults$;
`

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(GUARD)
  await db.execute(DROP_LOCALE_DEFAULTS)
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "posts_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_breadcrumbs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "nccriteria_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "accessibility_statements_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_nccriteria_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_accessibility_statements_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_checkbox_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_country_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_email_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_message_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_number_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_select_options_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_select_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_state_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_text_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_textarea_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "search_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_ctas" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "footer_badges" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_columns_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_columns_sub_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "accessibility_statement_non_conform_criteria_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('fr', 'en');
  ALTER TABLE "pages_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "posts_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_posts_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_breadcrumbs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "nccriteria_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "accessibility_statements_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_nccriteria_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_accessibility_statements_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_checkbox_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_country_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_email_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_message_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_number_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_select_options_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_select_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_state_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_text_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_textarea_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "search_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_ctas" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "footer_badges" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_columns_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_columns_sub_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "accessibility_statement_non_conform_criteria_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_published_locale";
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('fr', 'en');
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__pages_v_published_locale" USING "published_locale"::"public"."enum__pages_v_published_locale";
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_published_locale";
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('fr', 'en');
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__posts_v_published_locale" USING "published_locale"::"public"."enum__posts_v_published_locale";
  ALTER TABLE "_accessibility_statements_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__accessibility_statements_v_published_locale";
  CREATE TYPE "public"."enum__accessibility_statements_v_published_locale" AS ENUM('fr', 'en');
  ALTER TABLE "_accessibility_statements_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__accessibility_statements_v_published_locale" USING "published_locale"::"public"."enum__accessibility_statements_v_published_locale";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "posts_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_breadcrumbs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "nccriteria_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "accessibility_statements_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_nccriteria_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_accessibility_statements_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_checkbox_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_country_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_email_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_message_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_number_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_select_options_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_select_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_state_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_text_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_textarea_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "search_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_ctas" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "footer_badges" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_columns_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_columns_sub_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "accessibility_statement_non_conform_criteria_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'de', 'fr', 'es');
  ALTER TABLE "pages_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_accordion_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_accordion" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table_header" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table_rows_cells" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table_rows" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_data_table" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_embed" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to_steps" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to_supply" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to_tool" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_how_to" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_modal" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_tabs_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_tabs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_video" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_logo_cloud" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_stats_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_use_case_marquee_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_use_case_marquee" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_testimonials_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_testimonials" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_story_cards_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_story_cards" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_trust_grid_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_trust_grid" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_product_showcase_stats" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_product_showcase" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_band_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_band" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "posts_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_posts_v_version_aeo_answer_blocks" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_breadcrumbs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "nccriteria_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "accessibility_statements_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_nccriteria_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_accessibility_statements_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_checkbox_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_country_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_email_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_message_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_number_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_select_options_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_select_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_state_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_text_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_textarea_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "search_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_nav_items_children" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_ctas" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "footer_badges" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_columns_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_columns_sub_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "accessibility_statement_non_conform_criteria_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_published_locale";
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'de', 'fr', 'es');
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__pages_v_published_locale" USING "published_locale"::"public"."enum__pages_v_published_locale";
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_published_locale";
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr', 'es');
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__posts_v_published_locale" USING "published_locale"::"public"."enum__posts_v_published_locale";
  ALTER TABLE "_accessibility_statements_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__accessibility_statements_v_published_locale";
  CREATE TYPE "public"."enum__accessibility_statements_v_published_locale" AS ENUM('en', 'de', 'fr', 'es');
  ALTER TABLE "_accessibility_statements_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__accessibility_statements_v_published_locale" USING "published_locale"::"public"."enum__accessibility_statements_v_published_locale";`)
}
