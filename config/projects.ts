// Data lives in projects.json so it can be edited by the CRM (see crm/).
// This module is a thin typed wrapper — import projectConfig as before.
import data from "./projects.json";

export const projectConfig = data;

export type ProjectConfig = typeof projectConfig;
