-- Enable the pgvector extension for similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Note: In PostgreSQL, extensions must be created in each database where you want to use them.
-- Since this script runs during initialization, it will run on the POSTGRES_DB (pte_ielts_db).
