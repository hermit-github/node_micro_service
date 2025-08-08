import { Static, Type } from "@sinclair/typebox";

export const CartRequestSchema = Type.Object({
    productId:Type.String(),
    customerId:Type.String(),
    quantity:Type.Integer()
})

export const CartEditRequestSchema = Type.Object({
    id:Type.String(),
    quantity:Type.Integer()
})

export type CartRequestInput = Static<typeof CartRequestSchema>;
export type CartEditRequestInput = Static<typeof CartEditRequestSchema>;