DROP TABLE IF EXISTS app_user CASCADE;
DROP TABLE IF EXISTS app_session CASCADE;
DROP TABLE IF EXISTS task CASCADE;

create extension if not exists "uuid-ossp";

CREATE TABLE app_user (
  user_uuid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(32) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(250) NOT NULL
);

CREATE TABLE app_session (
  session_uuid UUID NOT NULL PRIMARY KEY,
  session_start TIMESTAMP NOT NULL,
  session_end TIMESTAMP,
  session_age integer GENERATED ALWAYS AS (extract(EPOCH FROM (session_end - session_start))) STORED,
  session_note VARCHAR(2048),
  user_uuid UUID NOT NULL,
  task_uuid UUID
);

CREATE TABLE task (
  task_uuid UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_name VARCHAR(2048) NOT NULL,
  task_status BOOLEAN NOT NULL DEFAULT false,
  user_uuid UUID NOT NULL
);

ALTER TABLE app_session
  ADD CONSTRAINT app_session_user_uuid_app_user_user_uuid
  FOREIGN KEY (user_uuid)
  REFERENCES app_user(user_uuid)
  ON DELETE RESTRICT
  ON UPDATE CASCADE
;

ALTER TABLE app_session
  ADD CONSTRAINT app_session_task_uuid_task_task_uuid
  FOREIGN KEY (task_uuid)
  REFERENCES task(task_uuid)
	ON DELETE SET NULL
	ON UPDATE CASCADE
;

ALTER TABLE task
	ADD CONSTRAINT task_user_uuid_app_user_user_uuid
	FOREIGN KEY (user_uuid)
	REFERENCES app_user(user_uuid)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
;