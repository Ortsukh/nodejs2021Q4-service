import {MigrationInterface, QueryRunner} from "typeorm";
/* eslint class-methods-use-this: 0 */
export class Migration1642339126533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer, "boardId" uuid)`
      );
      await queryRunner.query(
        `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL)`
      );
      await queryRunner.query(
        `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer, "description" text, "userId" text, "boardId" uuid, "columnId" uuid)`
      );
      await queryRunner.query(
        `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL)`
      );
      await queryRunner.query(
        `ALTER TABLE "column"  FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
      );
         
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `ALTER TABLE "column" DROP `
      );
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "column"`);
    }

}
