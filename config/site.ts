// Data lives in site.json so it can be edited by the CRM (see crm/).
// This module is a thin typed wrapper — import siteConfig as before.
import data from "./site.json";

export const siteConfig = data;

export type SiteConfig = typeof siteConfig;
