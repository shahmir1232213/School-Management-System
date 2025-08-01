// src/types/mongoose-sequence.d.ts
declare module 'mongoose-sequence' {
  import { Mongoose, Schema } from 'mongoose';

  interface AutoIncrementOptions {
    inc_field: string;
    id?: string;
    start_seq?: number;
    reference_fields?: string[];
    disable_hooks?: boolean;
    unique?: boolean;
  }

  export default function (mongoose: Mongoose): (schema: Schema<any>, options: AutoIncrementOptions) => void;
}
