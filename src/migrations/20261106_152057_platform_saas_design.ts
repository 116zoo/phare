import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_logo_cloud_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_use_case_marquee_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_story_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_trust_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_band_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_logo_cloud_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_use_case_marquee_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_story_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_grid_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_band_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_ctas_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_ctas_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_header_style" AS ENUM('classic', 'saas');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_sub_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_style" AS ENUM('classic', 'saas');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'saas';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'saas';
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"rating" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_logo_cloud_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"description" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_use_case_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_use_case_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lead" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_use_case_marquee_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_testimonials_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_story_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"link_type" "enum_pages_blocks_story_cards_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "pages_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_story_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_trust_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_trust_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_showcase_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_product_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_band_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_band_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_band_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"rating" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_logo_cloud_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"description" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_use_case_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lead" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_use_case_marquee_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"avatar_id" integer,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_testimonials_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"link_type" "enum__pages_v_blocks_story_cards_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_story_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_story_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_trust_grid_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_showcase_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_band_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_band_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "header_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_ctas_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_header_ctas_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "header_locales" (
  	"announcement_text" varchar,
  	"announcement_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns_sub_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_sub_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"sub_title" varchar
  );
  
  CREATE TABLE "footer_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"tagline" varchar,
  	"copyright" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings_locales" ALTER COLUMN "brand_name" SET DEFAULT 'Lubliner ART';
  ALTER TABLE "pages" ADD COLUMN "hero_badge_url" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_background_media_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_badge_label" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_note" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_badge_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_background_media_id" integer;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_badge_label" varchar;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_note" varchar;
  ALTER TABLE "header" ADD COLUMN "style" "enum_header_style" DEFAULT 'classic' NOT NULL;
  ALTER TABLE "header" ADD COLUMN "announcement_enabled" boolean;
  ALTER TABLE "header" ADD COLUMN "announcement_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "style" "enum_footer_style" DEFAULT 'classic' NOT NULL;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_cards_items" ADD CONSTRAINT "pages_blocks_stats_cards_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_cards_items" ADD CONSTRAINT "pages_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_cards" ADD CONSTRAINT "pages_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_marquee_items" ADD CONSTRAINT "pages_blocks_use_case_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_use_case_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_use_case_marquee" ADD CONSTRAINT "pages_blocks_use_case_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards_items" ADD CONSTRAINT "pages_blocks_story_cards_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards_items" ADD CONSTRAINT "pages_blocks_story_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_story_cards" ADD CONSTRAINT "pages_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_grid_items" ADD CONSTRAINT "pages_blocks_trust_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_grid_items" ADD CONSTRAINT "pages_blocks_trust_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_grid" ADD CONSTRAINT "pages_blocks_trust_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase_stats" ADD CONSTRAINT "pages_blocks_product_showcase_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase" ADD CONSTRAINT "pages_blocks_product_showcase_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_showcase" ADD CONSTRAINT "pages_blocks_product_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band_links" ADD CONSTRAINT "pages_blocks_cta_band_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_band" ADD CONSTRAINT "pages_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ADD CONSTRAINT "_pages_v_blocks_stats_cards_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" ADD CONSTRAINT "_pages_v_blocks_stats_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_cards" ADD CONSTRAINT "_pages_v_blocks_stats_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_marquee_items" ADD CONSTRAINT "_pages_v_blocks_use_case_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_use_case_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_use_case_marquee" ADD CONSTRAINT "_pages_v_blocks_use_case_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards_items" ADD CONSTRAINT "_pages_v_blocks_story_cards_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards_items" ADD CONSTRAINT "_pages_v_blocks_story_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_story_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_story_cards" ADD CONSTRAINT "_pages_v_blocks_story_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_grid_items" ADD CONSTRAINT "_pages_v_blocks_trust_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_grid_items" ADD CONSTRAINT "_pages_v_blocks_trust_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_grid" ADD CONSTRAINT "_pages_v_blocks_trust_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase_stats" ADD CONSTRAINT "_pages_v_blocks_product_showcase_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase" ADD CONSTRAINT "_pages_v_blocks_product_showcase_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_showcase" ADD CONSTRAINT "_pages_v_blocks_product_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band_links" ADD CONSTRAINT "_pages_v_blocks_cta_band_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_band" ADD CONSTRAINT "_pages_v_blocks_cta_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ctas" ADD CONSTRAINT "header_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_badges" ADD CONSTRAINT "footer_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_sub_links" ADD CONSTRAINT "footer_columns_sub_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_socials" ADD CONSTRAINT "footer_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_locale_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_logo_cloud_logos_logo_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_locale_idx" ON "pages_blocks_logo_cloud" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_cards_items_order_idx" ON "pages_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_cards_items_parent_id_idx" ON "pages_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_cards_items_locale_idx" ON "pages_blocks_stats_cards_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_stats_cards_items_logo_idx" ON "pages_blocks_stats_cards_items" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_stats_cards_order_idx" ON "pages_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_cards_parent_id_idx" ON "pages_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_cards_path_idx" ON "pages_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_cards_locale_idx" ON "pages_blocks_stats_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_use_case_marquee_items_order_idx" ON "pages_blocks_use_case_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_marquee_items_parent_id_idx" ON "pages_blocks_use_case_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_marquee_items_locale_idx" ON "pages_blocks_use_case_marquee_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_use_case_marquee_order_idx" ON "pages_blocks_use_case_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_use_case_marquee_parent_id_idx" ON "pages_blocks_use_case_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_use_case_marquee_path_idx" ON "pages_blocks_use_case_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_use_case_marquee_locale_idx" ON "pages_blocks_use_case_marquee" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_locale_idx" ON "pages_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_testimonials_items_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_locale_idx" ON "pages_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "pages_blocks_story_cards_items_order_idx" ON "pages_blocks_story_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_cards_items_parent_id_idx" ON "pages_blocks_story_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_cards_items_locale_idx" ON "pages_blocks_story_cards_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_story_cards_items_image_idx" ON "pages_blocks_story_cards_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_story_cards_order_idx" ON "pages_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_story_cards_parent_id_idx" ON "pages_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_story_cards_path_idx" ON "pages_blocks_story_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_story_cards_locale_idx" ON "pages_blocks_story_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_trust_grid_items_order_idx" ON "pages_blocks_trust_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_grid_items_parent_id_idx" ON "pages_blocks_trust_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_grid_items_locale_idx" ON "pages_blocks_trust_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_trust_grid_items_icon_idx" ON "pages_blocks_trust_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_trust_grid_order_idx" ON "pages_blocks_trust_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_grid_parent_id_idx" ON "pages_blocks_trust_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_grid_path_idx" ON "pages_blocks_trust_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_trust_grid_locale_idx" ON "pages_blocks_trust_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_showcase_stats_order_idx" ON "pages_blocks_product_showcase_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_showcase_stats_parent_id_idx" ON "pages_blocks_product_showcase_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_showcase_stats_locale_idx" ON "pages_blocks_product_showcase_stats" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_showcase_order_idx" ON "pages_blocks_product_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_showcase_parent_id_idx" ON "pages_blocks_product_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_showcase_path_idx" ON "pages_blocks_product_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_showcase_locale_idx" ON "pages_blocks_product_showcase" USING btree ("_locale");
  CREATE INDEX "pages_blocks_product_showcase_media_idx" ON "pages_blocks_product_showcase" USING btree ("media_id");
  CREATE INDEX "pages_blocks_cta_band_links_order_idx" ON "pages_blocks_cta_band_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_links_parent_id_idx" ON "pages_blocks_cta_band_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_links_locale_idx" ON "pages_blocks_cta_band_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_band_order_idx" ON "pages_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_band_parent_id_idx" ON "pages_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_band_path_idx" ON "pages_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_band_locale_idx" ON "pages_blocks_cta_band" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_locale_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_logo_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_locale_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_cards_items_order_idx" ON "_pages_v_blocks_stats_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_cards_items_parent_id_idx" ON "_pages_v_blocks_stats_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_cards_items_locale_idx" ON "_pages_v_blocks_stats_cards_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_stats_cards_items_logo_idx" ON "_pages_v_blocks_stats_cards_items" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_stats_cards_order_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_cards_parent_id_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_cards_path_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_cards_locale_idx" ON "_pages_v_blocks_stats_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_items_order_idx" ON "_pages_v_blocks_use_case_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_items_parent_id_idx" ON "_pages_v_blocks_use_case_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_items_locale_idx" ON "_pages_v_blocks_use_case_marquee_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_order_idx" ON "_pages_v_blocks_use_case_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_parent_id_idx" ON "_pages_v_blocks_use_case_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_path_idx" ON "_pages_v_blocks_use_case_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_use_case_marquee_locale_idx" ON "_pages_v_blocks_use_case_marquee" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_locale_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_testimonials_items_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_locale_idx" ON "_pages_v_blocks_testimonials" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_story_cards_items_order_idx" ON "_pages_v_blocks_story_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_cards_items_parent_id_idx" ON "_pages_v_blocks_story_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_cards_items_locale_idx" ON "_pages_v_blocks_story_cards_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_story_cards_items_image_idx" ON "_pages_v_blocks_story_cards_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_story_cards_order_idx" ON "_pages_v_blocks_story_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_story_cards_parent_id_idx" ON "_pages_v_blocks_story_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_story_cards_path_idx" ON "_pages_v_blocks_story_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_story_cards_locale_idx" ON "_pages_v_blocks_story_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_trust_grid_items_order_idx" ON "_pages_v_blocks_trust_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_grid_items_parent_id_idx" ON "_pages_v_blocks_trust_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_grid_items_locale_idx" ON "_pages_v_blocks_trust_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_trust_grid_items_icon_idx" ON "_pages_v_blocks_trust_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_trust_grid_order_idx" ON "_pages_v_blocks_trust_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_grid_parent_id_idx" ON "_pages_v_blocks_trust_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_grid_path_idx" ON "_pages_v_blocks_trust_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trust_grid_locale_idx" ON "_pages_v_blocks_trust_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_showcase_stats_order_idx" ON "_pages_v_blocks_product_showcase_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_showcase_stats_parent_id_idx" ON "_pages_v_blocks_product_showcase_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_stats_locale_idx" ON "_pages_v_blocks_product_showcase_stats" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_showcase_order_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_showcase_parent_id_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_showcase_path_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_showcase_locale_idx" ON "_pages_v_blocks_product_showcase" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_product_showcase_media_idx" ON "_pages_v_blocks_product_showcase" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_cta_band_links_order_idx" ON "_pages_v_blocks_cta_band_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_links_parent_id_idx" ON "_pages_v_blocks_cta_band_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_links_locale_idx" ON "_pages_v_blocks_cta_band_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_band_order_idx" ON "_pages_v_blocks_cta_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_band_parent_id_idx" ON "_pages_v_blocks_cta_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_band_path_idx" ON "_pages_v_blocks_cta_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_band_locale_idx" ON "_pages_v_blocks_cta_band" USING btree ("_locale");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_locale_idx" ON "header_nav_items_children" USING btree ("_locale");
  CREATE INDEX "header_ctas_order_idx" ON "header_ctas" USING btree ("_order");
  CREATE INDEX "header_ctas_parent_id_idx" ON "header_ctas" USING btree ("_parent_id");
  CREATE INDEX "header_ctas_locale_idx" ON "header_ctas" USING btree ("_locale");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_badges_order_idx" ON "footer_badges" USING btree ("_order");
  CREATE INDEX "footer_badges_parent_id_idx" ON "footer_badges" USING btree ("_parent_id");
  CREATE INDEX "footer_badges_locale_idx" ON "footer_badges" USING btree ("_locale");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_locale_idx" ON "footer_columns_links" USING btree ("_locale");
  CREATE INDEX "footer_columns_sub_links_order_idx" ON "footer_columns_sub_links" USING btree ("_order");
  CREATE INDEX "footer_columns_sub_links_parent_id_idx" ON "footer_columns_sub_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_sub_links_locale_idx" ON "footer_columns_sub_links" USING btree ("_locale");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_locale_idx" ON "footer_columns" USING btree ("_locale");
  CREATE INDEX "footer_socials_order_idx" ON "footer_socials" USING btree ("_order");
  CREATE INDEX "footer_socials_parent_id_idx" ON "footer_socials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_background_media_id_media_id_fk" FOREIGN KEY ("hero_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_background_media_id_media_id_fk" FOREIGN KEY ("version_hero_background_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_hero_background_media_idx" ON "pages" USING btree ("hero_background_media_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_background_media_idx" ON "_pages_v" USING btree ("version_hero_background_media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_logo_cloud_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_use_case_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_use_case_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_story_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_showcase_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_band_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case_marquee_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_use_case_marquee" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_story_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_story_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_showcase_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_band_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_children" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns_sub_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_stats_cards_items" CASCADE;
  DROP TABLE "pages_blocks_stats_cards" CASCADE;
  DROP TABLE "pages_blocks_use_case_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_use_case_marquee" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_story_cards_items" CASCADE;
  DROP TABLE "pages_blocks_story_cards" CASCADE;
  DROP TABLE "pages_blocks_trust_grid_items" CASCADE;
  DROP TABLE "pages_blocks_trust_grid" CASCADE;
  DROP TABLE "pages_blocks_product_showcase_stats" CASCADE;
  DROP TABLE "pages_blocks_product_showcase" CASCADE;
  DROP TABLE "pages_blocks_cta_band_links" CASCADE;
  DROP TABLE "pages_blocks_cta_band" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_use_case_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_story_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_story_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_product_showcase_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_product_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_band" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_ctas" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_badges" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns_sub_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_socials" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_background_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_background_media_id_media_id_fk";
  
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'lowImpact'::"public"."enum_pages_hero_type";
  ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'lowImpact'::"public"."enum__pages_v_version_hero_type";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  DROP INDEX "pages_hero_hero_background_media_idx";
  DROP INDEX "_pages_v_version_hero_version_hero_background_media_idx";
  ALTER TABLE "site_settings_locales" ALTER COLUMN "brand_name" SET DEFAULT 'Payload Website';
  ALTER TABLE "pages" DROP COLUMN "hero_badge_url";
  ALTER TABLE "pages" DROP COLUMN "hero_background_media_id";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_badge_label";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_note";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_badge_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_background_media_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_badge_label";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_note";
  ALTER TABLE "header" DROP COLUMN "style";
  ALTER TABLE "header" DROP COLUMN "announcement_enabled";
  ALTER TABLE "header" DROP COLUMN "announcement_url";
  ALTER TABLE "footer" DROP COLUMN "style";
  DROP TYPE "public"."enum_pages_blocks_logo_cloud_link_type";
  DROP TYPE "public"."enum_pages_blocks_use_case_marquee_link_type";
  DROP TYPE "public"."enum_pages_blocks_testimonials_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_story_cards_items_link_type";
  DROP TYPE "public"."enum_pages_blocks_story_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_trust_grid_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_band_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_band_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_logo_cloud_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_use_case_marquee_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_items_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_story_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_trust_grid_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_band_links_link_appearance";
  DROP TYPE "public"."enum_header_nav_items_children_link_type";
  DROP TYPE "public"."enum_header_ctas_link_type";
  DROP TYPE "public"."enum_header_ctas_link_appearance";
  DROP TYPE "public"."enum_header_style";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_columns_sub_links_link_type";
  DROP TYPE "public"."enum_footer_style";`)
}
