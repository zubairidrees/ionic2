import {Table, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "ionic-orm";
import {TypedJSON, JsonObject, JsonMember} from '../lib/typed-json';

@JsonObject
@Table()
export class Bayaan {

    @JsonMember({ type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @JsonMember({ type: String })
    @Column({nullable:true})
    title: string;

    @JsonMember({ type: String })
    @Column({nullable:true})
    url: string;

    @JsonMember({ type: String })
    @Column({nullable:true})
    duration: string;

    @JsonMember({ type: Number })
    @Column({nullable:true})
    order: number;

    @Column({nullable:true})
    active: boolean;

}