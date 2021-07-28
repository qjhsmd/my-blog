import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class MyClassify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classify_name: string;

  @Column({ nullable: false })
  pid: number;

  @Column({ name: 'artcle_count', nullable: true, default: 0 })
  artcleCount: number;

  @Column({ name: 'issue_artcle_count', nullable: true, default: 0 })
  issueArtcleCount: number;
}
