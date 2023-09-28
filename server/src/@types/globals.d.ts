import { Pool } from "pg";

declare global {
  var connection = Pool
}